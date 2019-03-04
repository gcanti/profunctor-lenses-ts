import * as assert from 'assert'
import { iso$ } from '../src/Iso'
import { view } from '../src/Lens'
import { review } from '../src/Prism'

const double = iso$<number, number>(n => n / 2, n => n * 2)

describe('Iso', () => {
  it('should be able to use Lens/view', () => {
    assert.strictEqual(view(double)(2), 1)
  })

  it('should be able to use Prism/review', () => {
    assert.deepEqual(review(double)(2), 1)
  })
})
