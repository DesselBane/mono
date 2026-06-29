import path from 'node:path'
import { createEslintConfig } from '@desselbane/configs/eslint'

export default createEslintConfig({
  packageDir: import.meta.dirname,
  workspaceDir: path.join(import.meta.dirname, '..', '..'),
})
