import { safeTry, safeTryAsync } from '@desselbane/ts-helpers'
import { confirm } from '@inquirer/prompts'
import { cleanExit, execSync, execSyncCapture } from './helper'

const distroName = 'Ubuntu'

/**
The desired contents of `/etc/wsl.conf` inside the provisioned distro.
*/
export function buildWslConfContent() {
  return '[boot]\nsystemd=true\n'
}

/**
Encodes {@link content} for use inside a single-quoted `printf` argument: real newlines become
the `\n` escape sequence, since a literal newline would split the shell command line mid-quote.
*/
export function toPrintfLiteral(content: string) {
  return content.replaceAll('\n', String.raw`\n`)
}

/**
Whether `wsl -l -q` output ({@link listOutput}) already contains an installed distro.
*/
export function hasDistro(listOutput: string) {
  return listOutput
    .split('\n')
    .map((line) => line.replaceAll(/[^\u{20}-\u{7E}]/gu, '').trim())
    .some((line) => line.length > 0)
}

const voltaPnpmExport = 'export VOLTA_FEATURE_PNPM=1'

/**
Whether the volta pnpm feature flag export is missing from `~/.profile`
({@link existingContent} is `undefined` when the file doesn't exist yet).
*/
export function profileNeedsVoltaPnpmExport(
  existingContent: string | undefined,
) {
  return !(existingContent?.includes(voltaPnpmExport) ?? false)
}

/**
Whether `/etc/wsl.conf` needs to be (re)written: `undefined` means it doesn't exist yet,
otherwise it is compared against the desired content.
*/
export function shouldWriteWslConf(existingContent: string | undefined) {
  return existingContent?.trim() !== buildWslConfContent().trim()
}

export async function provisionWsl() {
  if (process.platform !== 'win32') {
    return
  }

  const shouldPrompt = await safeTryAsync(
    confirm({
      message: 'Do you want to provision WSL?',
      default: false,
    }),
  )
  cleanExit(shouldPrompt)
  if (!shouldPrompt.data) {
    return
  }

  const [listError, listOutput] = safeTry(() => execSyncCapture('wsl -l -q'))

  if (listError != undefined || !hasDistro(listOutput)) {
    console.log(`Installing ${distroName}`)
    execSync(`wsl --install -d ${distroName}`)
  }

  console.log('Checking /etc/wsl.conf')
  const [readError, existingWslConf] = safeTry(() =>
    execSyncCapture(`wsl -d ${distroName} -- cat /etc/wsl.conf`),
  )

  if (
    shouldWriteWslConf(readError == undefined ? existingWslConf : undefined)
  ) {
    console.log('Writing /etc/wsl.conf')
    execSync(
      `wsl -d ${distroName} -- sh -c "printf '${toPrintfLiteral(buildWslConfContent())}' | sudo tee /etc/wsl.conf"`,
    )
  }

  console.log('Checking VOLTA_FEATURE_PNPM in ~/.profile')
  const [profileError, existingProfile] = safeTry(() =>
    execSyncCapture(`wsl -d ${distroName} -- bash -lc "cat ~/.profile"`),
  )

  if (
    profileNeedsVoltaPnpmExport(
      profileError == undefined ? existingProfile : undefined,
    )
  ) {
    console.log('Adding VOLTA_FEATURE_PNPM to ~/.profile')
    execSync(
      `wsl -d ${distroName} -- bash -lc "echo '${voltaPnpmExport}' >> ~/.profile"`,
    )
  }

  console.log('Installing Volta, Node and pnpm inside WSL')
  execSync(
    `wsl -d ${distroName} -- bash -lc "curl https://get.volta.sh | bash && VOLTA_FEATURE_PNPM=1 ~/.volta/bin/volta install node pnpm"`,
  )

  console.log('To run setup inside WSL, execute:')
  console.log(`  wsl -d ${distroName} -- bash -lc "pnpm dlx @desselbane/setup"`)
}
