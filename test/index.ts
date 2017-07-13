import * as assert from 'assert'
import { lens, view } from '../src'

describe('view', () => {
  it('should return A', () => {
    type S = { foo: string }
    const fooLens = lens((s: S) => s.foo, (s: S) => (b: string) => ({ ...s, foo: b }))
    assert.strictEqual(view(fooLens.asGetter())({ foo: 'bar' }), 'bar')
  })
})
