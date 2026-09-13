import {
  buildWslConfContent,
  hasDistro,
  profileNeedsVoltaPnpmExport,
  shouldWriteWslConf,
  toPrintfLiteral,
} from './provision-wsl'

describe(profileNeedsVoltaPnpmExport, () => {
  it('should append when no ~/.profile exists yet', () => {
    // Arrange
    const existingContent = undefined

    // Act
    const result = profileNeedsVoltaPnpmExport(existingContent)

    // Assert
    expect(result).toBe(true)
  })

  it('should append when the export is missing', () => {
    // Arrange
    const existingContent = 'export PATH="$HOME/.volta/bin:$PATH"\n'

    // Act
    const result = profileNeedsVoltaPnpmExport(existingContent)

    // Assert
    expect(result).toBe(true)
  })

  it('should not append when the export is already present', () => {
    // Arrange
    const existingContent = 'export VOLTA_FEATURE_PNPM=1\n'

    // Act
    const result = profileNeedsVoltaPnpmExport(existingContent)

    // Assert
    expect(result).toBe(false)
  })
})

describe(hasDistro, () => {
  it('should be false for empty output', () => {
    expect(hasDistro('')).toBe(false)
  })

  it('should be false for whitespace-only output', () => {
    expect(hasDistro('\r\n\r\n')).toBe(false)
  })

  it('should be true when a distro name is present', () => {
    expect(hasDistro('Ubuntu\r\n')).toBe(true)
  })
})

describe(toPrintfLiteral, () => {
  it('should replace real newlines with the printf escape sequence', () => {
    expect(toPrintfLiteral('[boot]\nsystemd=true\n')).toBe(
      String.raw`[boot]\nsystemd=true\n`,
    )
  })

  it('should keep the wsl.conf content free of literal newlines', () => {
    expect(toPrintfLiteral(buildWslConfContent())).not.toContain('\n')
  })
})

describe(shouldWriteWslConf, () => {
  it('should write when no wsl.conf exists yet', () => {
    expect(shouldWriteWslConf(undefined)).toBe(true)
  })

  it('should write when the existing content differs', () => {
    expect(shouldWriteWslConf('[boot]\nsystemd=false\n')).toBe(true)
  })

  it('should not write when the existing content already matches', () => {
    expect(shouldWriteWslConf(buildWslConfContent())).toBe(false)
  })
})
