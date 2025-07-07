import path from 'node:path'
import { createEslintConfig } from '@repo/configs/eslint'

export default createEslintConfig({
  workspaceDir: path.join(import.meta.dirname, '..', '..'),
  packageDir: import.meta.dirname,
  additionalConfigs: [
    {
      rules: {
        'unicorn/prefer-single-call': 'off',
      },
    },
  ],
})
