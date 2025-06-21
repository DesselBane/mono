import path from 'node:path'
import { createEslintConfig } from './dist/eslint.config.tpl.js'

export default createEslintConfig({
  packageDir: import.meta.dirname,
  workspaceDir: path.join(import.meta.dirname, '..', '..'),
})
