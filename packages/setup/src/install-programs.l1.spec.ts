import { Separator } from '@inquirer/prompts'
import {
  buildChoicesForPlatform,
  buildLinuxInstallPlan,
  isInstallableOnPlatform,
} from './install-programs'
import type { ConfigItem } from './install-programs'

function makeItem(overrides: Partial<ConfigItem> = {}): ConfigItem {
  return {
    Name: 'Test',
    WingetId: 'Test.Test',
    installDefault: false,
    group: 'Core',
    ...overrides,
  }
}

describe(isInstallableOnPlatform, () => {
  it('should be installable on win32 when a WingetId is present', () => {
    const item = makeItem({ WingetId: 'Foo.Bar' })

    expect(isInstallableOnPlatform(item, 'win32')).toBe(true)
  })

  it('should not be installable on win32 without a WingetId', () => {
    const item = makeItem({ WingetId: undefined })

    expect(isInstallableOnPlatform(item, 'win32')).toBe(false)
  })

  it('should be installable on linux when an AptId is present', () => {
    const item = makeItem({ WingetId: undefined, AptId: 'foo' })

    expect(isInstallableOnPlatform(item, 'linux')).toBe(true)
  })

  it('should be installable on linux when only a linuxInstall script is present', () => {
    const item = makeItem({ WingetId: undefined, linuxInstall: 'curl foo' })

    expect(isInstallableOnPlatform(item, 'linux')).toBe(true)
  })

  it('should not be installable on linux without AptId or linuxInstall', () => {
    const item = makeItem({ WingetId: 'Foo.Bar' })

    expect(isInstallableOnPlatform(item, 'linux')).toBe(false)
  })
})

describe(buildChoicesForPlatform, () => {
  it('should disable entries without an install method for the platform', () => {
    const items = [makeItem({ Name: 'WinOnly', WingetId: 'Foo.Bar' })]

    const choices = buildChoicesForPlatform(items, 'linux')
    const choice = choices.find(
      (x): x is Exclude<(typeof choices)[number], Separator> =>
        !(x instanceof Separator) && x.name === 'WinOnly',
    )

    expect(choice?.disabled).toBeTruthy()
  })

  it('should leave installable entries enabled', () => {
    const items = [
      makeItem({ Name: 'Both', WingetId: 'Foo.Bar', AptId: 'foo' }),
    ]

    const choices = buildChoicesForPlatform(items, 'linux')
    const choice = choices.find(
      (x): x is Exclude<(typeof choices)[number], Separator> =>
        !(x instanceof Separator) && x.name === 'Both',
    )

    expect(choice?.disabled).toBe(false)
  })

  it('should check entries that are installable and default on', () => {
    const items = [
      makeItem({
        Name: 'Default',
        WingetId: 'Foo.Bar',
        AptId: 'foo',
        installDefault: true,
      }),
    ]

    const choices = buildChoicesForPlatform(items, 'linux')
    const choice = choices.find(
      (x): x is Exclude<(typeof choices)[number], Separator> =>
        !(x instanceof Separator) && x.name === 'Default',
    )

    expect(choice?.checked).toBe(true)
  })

  it('should not check a default entry that is not installable on the platform', () => {
    const items = [
      makeItem({
        Name: 'Default',
        WingetId: 'Foo.Bar',
        installDefault: true,
      }),
    ]

    const choices = buildChoicesForPlatform(items, 'linux')
    const choice = choices.find(
      (x): x is Exclude<(typeof choices)[number], Separator> =>
        !(x instanceof Separator) && x.name === 'Default',
    )

    expect(choice?.checked).toBe(false)
  })
})

describe(buildLinuxInstallPlan, () => {
  it('should collect deduplicated aptPrereqs', () => {
    const items = [
      makeItem({ AptId: 'a', aptPrereq: 'prereq' }),
      makeItem({ AptId: 'b', aptPrereq: 'prereq' }),
    ]

    const plan = buildLinuxInstallPlan(items)

    expect(plan.aptPrereqs).toStrictEqual(['prereq'])
  })

  it('should collect all AptIds', () => {
    const items = [makeItem({ AptId: 'a' }), makeItem({ AptId: 'b' })]

    const plan = buildLinuxInstallPlan(items)

    expect(plan.aptIds).toStrictEqual(['a', 'b'])
  })

  it('should only use linuxInstall as a fallback when no AptId is present', () => {
    const items = [
      makeItem({ AptId: 'a', linuxInstall: 'curl a' }),
      makeItem({ AptId: undefined, linuxInstall: 'curl b' }),
    ]

    const plan = buildLinuxInstallPlan(items)

    expect(plan.linuxInstalls).toStrictEqual(['curl b'])
  })
})
