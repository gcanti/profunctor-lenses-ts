import { HKT2, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Profunctor, Profunctor2, Profunctor3 } from 'fp-ts/lib/Profunctor'
import { Optic, Optic2, Optic3 } from './Optic'

export interface Iso<S, T, A, B> {
  <F extends URIS3>(F: Profunctor3<F>): Optic3<F, S, T, A, B>
  <F extends URIS2>(F: Profunctor2<F>): Optic2<F, S, T, A, B>
  <F>(F: Profunctor<F>): Optic<F, S, T, A, B>
}

export interface Iso$<S, A> extends Iso<S, S, A, A> {}

/**
 * Create an `Iso` from a pair of morphisms
 */
export const iso = <S, T, A, B>(get: (s: S) => A, set: (b: B) => T): Iso<S, T, A, B> => {
  return <F>(F: Profunctor<F>) => (pab: HKT2<F, A, B>) => F.promap(pab, get, set)
}

export const iso$: <S, A>(get: (s: S) => A, set: (a: A) => S) => Iso$<S, A> = iso
