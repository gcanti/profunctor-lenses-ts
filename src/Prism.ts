import { Choice, Choice2, Choice3, Choice4 } from 'fp-ts/lib/Choice'
import { Either, fromOption, right } from 'fp-ts/lib/Either'
import { identity } from 'fp-ts/lib/function'
import { HKT2, URIS2, URIS3, URIS4 } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import { Market, market } from './Market'
import { Optic, Optic2, Optic3, Optic4 } from './Optic'
import { Review } from './Review'
import { Tagged } from './Tagged'

export interface Prism<S, T, A, B> {
  <F extends URIS4>(F: Choice4<F>): Optic4<F, S, T, A, B>
  <F extends URIS3>(F: Choice3<F>): Optic3<F, S, T, A, B>
  <F extends URIS2>(F: Choice2<F>): Optic2<F, S, T, A, B>
  <F>(F: Choice<F>): Optic<F, S, T, A, B>
}

export interface Prism$<S, A> extends Prism<S, S, A, A> {}

/**
 * Create a `Prism` from a constructor and a matcher function that
 * produces an `Either`
 */
export const prism = <S, T, A, B>(set: (b: B) => T, getEither: (s: S) => Either<T, A>): Prism<S, T, A, B> => {
  return <F>(F: Choice<F>) => (pab: HKT2<F, A, B>): HKT2<F, S, T> =>
    F.promap(F.right<T, A, T>(F.map(pab, set)), getEither, e => e.fold(identity, identity))
}

/**
 * Create a `Prism` from a constructor and a matcher function that
 * produces an `Option`
 */
export const prism$ = <S, A>(set: (a: A) => S, get: (s: S) => Option<A>): Prism$<S, A> => {
  return prism(set, s => fromOption(s)(get(s)))
}

export const review = <S, T, A, B>(review: Review<S, T, A, B>) => (b: B): T => {
  return review(new Tagged(b)).value
}

export const withPrism = <S, T, A, B>(prism: Prism<S, T, A, B>) => <R>(
  f: (set: (b: B) => T) => (getEither: (s: S) => Either<T, A>) => R
): R => {
  const { set, getEither } = prism(market)(new Market<A, B, A, B>(identity, right))
  return f(set)(getEither)
}

export const matching = <S, T, A, B>(prism: Prism<S, T, A, B>): ((s: S) => Either<T, A>) => {
  return withPrism(prism)(_ => f => f)
}
