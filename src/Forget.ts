import { Profunctor3 } from 'fp-ts/lib/Profunctor'
import { Strong3 } from 'fp-ts/lib/Strong'

export const URI = 'profunctor-lenses-ts/Forget'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT3<U, L, A> {
    'profunctor-lenses-ts/Forget': Forget<U, L, A>
  }
}

/**
 * Profunctor that forgets the `A` value and returns (and accumulates) a
 * value of type `U`
 */
export class Forget<U, L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _U!: U
  readonly _URI!: URI
  constructor(readonly run: (l: L) => U) {}
  map<B>(_: (a: A) => B): Forget<U, L, B> {
    return this as any
  }
}

const map = <U, L, A, B>(fa: Forget<U, L, A>, f: (a: A) => B): Forget<U, L, B> => {
  return fa.map(f)
}

const promap = <U, A, B, C, D>(fbc: Forget<U, B, C>, f: (a: A) => B, g: (c: C) => D): Forget<U, A, D> => {
  return new Forget(a => fbc.run(f(a)))
}

const first = <U, A, B, C>(pab: Forget<U, A, B>): Forget<U, [A, C], [B, C]> => {
  return new Forget(([a]) => pab.run(a))
}

const second = <U, A, B, C>(pbc: Forget<U, B, C>): Forget<U, [A, B], [A, C]> => {
  return new Forget(([_, a]) => pbc.run(a))
}

export const forget: Profunctor3<URI> & Strong3<URI> = {
  URI,
  map,
  promap,
  first,
  second
}
