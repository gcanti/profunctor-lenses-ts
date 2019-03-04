import { Either, left as eitherLeft, right as eitherRight } from 'fp-ts/lib/Either'
import { Profunctor4 } from 'fp-ts/lib/Profunctor'
import { Choice4 } from 'fp-ts/lib/Choice'

export const URI = 'profunctor-lenses-ts/Market'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT4<X, U, L, A> {
    'profunctor-lenses-ts/Market': Market<X, U, L, A>
  }
}

/**
 * The `Market` profunctor characterizes a `Prism`.
 */
export class Market<X, U, L, A> {
  constructor(readonly set: (u: U) => A, readonly getEither: (l: L) => Either<A, X>) {}
  map<B>(f: (a: A) => B): Market<X, U, L, B> {
    return new Market(u => f(this.set(u)), l => this.getEither(l).mapLeft(f))
  }
}

const map = <X, U, L, A, B>(fa: Market<X, U, L, A>, f: (a: A) => B): Market<X, U, L, B> => {
  return fa.map(f)
}

const promap = <X, U, A, B, C, D>(fbc: Market<X, U, B, C>, f: (a: A) => B, g: (c: C) => D): Market<X, U, A, D> => {
  return new Market(u => g(fbc.set(u)), a => fbc.getEither(f(a)).mapLeft(g))
}

const left = <X, U, A, B, C>(pab: Market<X, U, A, B>): Market<X, U, Either<A, C>, Either<B, C>> => {
  return new Market(
    u => eitherLeft(pab.set(u)),
    ac => ac.fold(a => pab.getEither(a).mapLeft(b => eitherLeft(b)), c => eitherLeft(eitherRight(c)))
  )
}

const right = <X, U, A, B, C>(pbc: Market<X, U, B, C>): Market<X, U, Either<A, B>, Either<A, C>> => {
  return new Market<X, U, Either<A, B>, Either<A, C>>(
    u => eitherRight(pbc.set(u)),
    ac => ac.fold(a => eitherLeft(eitherLeft(a)), b => pbc.getEither(b).mapLeft(c => eitherRight(c)))
  )
}

export const market: Profunctor4<URI> & Choice4<URI> = {
  URI,
  map,
  promap,
  left,
  right
}
