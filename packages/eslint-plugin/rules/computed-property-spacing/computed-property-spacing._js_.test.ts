import type { MessageIds, RuleOptions } from './types'
import { run } from '#test'
import rule from './computed-property-spacing'

run<RuleOptions, MessageIds>({
  lang: 'js',
  name: 'computed-property-spacing',
  rule,
  valid: [
    // EcmaVersion 6
    {
      code: 'var foo = {x: 1}',
      parserOptions: { ecmaVersion: 6 },
    },
    // EcmaVersion 5
    {
      code: 'var foo = {x: 1}',
      parserOptions: { ecmaVersion: 5, sourceType: 'script' },
    },
    // EcmaVersion 3
    {
      code: 'var foo = {x: 1}',
      parserOptions: { ecmaVersion: 3, sourceType: 'script' },
    },
  ],
})
