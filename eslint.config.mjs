import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import next from 'next/eslint-plugin-next'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.recommended,
  pluginReactHooks.configs.recommended,
  next.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
]