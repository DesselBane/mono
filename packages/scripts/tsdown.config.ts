/* eslint-disable import-x/no-anonymous-default-export */
import { defineConfig } from 'tsdown'

export default [
  defineConfig({
    entry: ['./src/renovate-add-changeset.ts'],
    platform: 'node',
    dts: false,
  }),
  defineConfig({
    entry: ['./src/reformat-changelogs-cli.ts'],
    platform: 'node',
    dts: false,
  }),
]
