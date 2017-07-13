import { Profunctor } from 'fp-ts/lib/Profunctor'
import { Strong } from './Strong'

export const URI = 'Forget'

export type URI = typeof URI

/** Profunctor that forgets the `A` value and returns (and accumulates) a
 * value of type `R`
 */
export class Forget<R, L, A> {
  readonly _A: A
  readonly _L: L
  readonly _R: R
  readonly _URI: URI
  constructor(public readonly value: (l: L) => R) {}
}

export function map<R, B, C, D>(g: (c: C) => D, fbc: Forget<R, B, C>): Forget<R, B, D> {
  return fbc as any
}

export function promap<R, A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fbc: Forget<R, B, C>): Forget<R, A, D> {
  return new Forget(a => fbc.value(f(a)))
}

export function first<R, A, B, C>(pab: Forget<R, A, B>): Forget<R, [A, C], [B, C]> {
  return new Forget(([a]) => pab.value(a))
}

export function second<R, A, B, C>(pab: Forget<R, B, C>): Forget<R, [A, B], [A, C]> {
  return new Forget(([_, a]) => pab.value(a))
}

export const forget: Profunctor<URI> & Strong<URI> = {
  URI,
  map,
  promap,
  first,
  second
}
