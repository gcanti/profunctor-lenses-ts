import { Profunctor2 } from 'fp-ts/lib/Profunctor'
import { Choice2 } from 'fp-ts/lib/Choice'
import { Either, left as eitherLeft, right as eitherRight } from 'fp-ts/lib/Either'

export const URI = 'profunctor-lenses-ts/Tagged'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    'profunctor-lenses-ts/Tagged': Tagged<L, A>
  }
}

export class Tagged<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Tagged<L, B> {
    return new Tagged(f(this.value))
  }
}

const map = <L, A, B>(fa: Tagged<L, A>, f: (c: A) => B): Tagged<L, B> => {
  return fa.map(f)
}

const promap = <A, B, C, D>(fbc: Tagged<B, C>, f: (a: A) => B, g: (c: C) => D): Tagged<A, D> => {
  return new Tagged(g(fbc.value))
}

const left = <A, B, C>(pab: Tagged<A, B>): Tagged<Either<A, C>, Either<B, C>> => {
  return new Tagged(eitherLeft(pab.value))
}

const right = <A, B, C>(pbc: Tagged<B, C>): Tagged<Either<A, B>, Either<A, C>> => {
  return new Tagged(eitherRight(pbc.value))
}

export const tagged: Profunctor2<URI> & Choice2<URI> = {
  URI,
  map,
  promap,
  left,
  right
}
