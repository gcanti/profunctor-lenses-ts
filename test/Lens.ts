import * as assert from 'assert'
import { lens, view, Lens$ } from '../src/Lens'

describe('Lens', () => {
  it('view', () => {
    type S = { foo: string }
    const string: Lens$<S, string> = lens(s => s.foo, s => b => ({ ...s, foo: b }))
    assert.strictEqual(view(string)({ foo: 'bar' }), 'bar')
  })
})
