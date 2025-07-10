#!/usr/bin/env node

import path from 'node:path'
import { readFileSync, rmSync } from 'node:fs'
import { z } from 'zod'
import { execSync } from './helper'
import config from './program.config.json'

const tmpFile = path.join(import.meta.dirname, `${crypto.randomUUID()}.json`)

const wingetExportSchema = z.object({
  Sources: z.array(
    z.object({
      Packages: z.array(
        z.object({
          PackageIdentifier: z.string(),
        }),
      ),
    }),
  ),
})

execSync(`winget export -o ${tmpFile}`)

const wingetExports = wingetExportSchema.parse(
  JSON.parse(readFileSync(tmpFile).toString()),
)

rmSync(tmpFile)

const packageIds = new Set(
  wingetExports.Sources.flatMap((x) => x.Packages).map(
    (x) => x.PackageIdentifier,
  ),
)

for (const configEntry of config) {
  packageIds.delete(configEntry.WingetId)
}

console.log(
  JSON.stringify(
    [...packageIds.values()].map((x) => ({
      Name: '',
      WingetId: x,
      installDefault: false,
    })),
    undefined,
    2,
  ),
)
