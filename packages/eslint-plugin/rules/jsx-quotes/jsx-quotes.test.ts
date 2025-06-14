/**
 * @fileoverview Tests for jsx-quotes rule.
 * @author Mathias Schreck <https://github.com/lo1tuma>
 */

import type { MessageIds, RuleOptions } from './types'
import { run } from '#test'
import rule from './jsx-quotes'

run<RuleOptions, MessageIds>({
  name: 'jsx-quotes',
  rule,
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  valid: [
    '<foo bar="baz" />',
    '<foo bar=\'"\' />',
    {
      code: '<foo bar="\'" />',
      options: ['prefer-single'],
    },
    {
      code: '<foo bar=\'baz\' />',
      options: ['prefer-single'],
    },
    '<foo bar="baz">"</foo>',
    {
      code: '<foo bar=\'baz\'>\'</foo>',
      options: ['prefer-single'],
    },
    '<foo bar={\'baz\'} />',
    {
      code: '<foo bar={"baz"} />',
      options: ['prefer-single'],
    },
    '<foo bar={baz} />',
    '<foo bar />',
    {
      code: '<foo bar=\'&quot;\' />',
      options: ['prefer-single'],
    },
    '<foo bar="&quot;" />',
    {
      code: '<foo bar=\'&#39;\' />',
      options: ['prefer-single'],
    },
    '<foo bar="&#39;" />',
  ],
  invalid: [
    {
      code: '<foo bar=\'baz\' />',
      output: '<foo bar="baz" />',
      errors: [
        { messageId: 'unexpected', data: { description: 'singlequote' }, line: 1, column: 10, type: 'Literal' },
      ],
    },
    {
      code: '<foo bar="baz" />',
      output: '<foo bar=\'baz\' />',
      options: ['prefer-single'],
      errors: [
        { messageId: 'unexpected', data: { description: 'doublequote' }, line: 1, column: 10, type: 'Literal' },
      ],
    },
    {
      code: '<foo bar="&quot;" />',
      output: '<foo bar=\'&quot;\' />',
      options: ['prefer-single'],
      errors: [
        { messageId: 'unexpected', data: { description: 'doublequote' }, line: 1, column: 10, type: 'Literal' },
      ],
    },
    {
      code: '<foo bar=\'&#39;\' />',
      output: '<foo bar="&#39;" />',
      errors: [
        { messageId: 'unexpected', data: { description: 'singlequote' }, line: 1, column: 10, type: 'Literal' },
      ],
    },
  ],
})
