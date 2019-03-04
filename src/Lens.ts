import { tuple } from 'fp-ts/lib/function'
import { HKT2, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { forget } from './Forget'
import * as G from './Getter'
import { Optic, Optic2, Optic3 } from './Optic'
import { Strong, Strong2, Strong3 } from 'fp-ts/lib/Strong'
import * as S from './Setter'
import { reader } from 'fp-ts/lib/Reader'

export interface Lens<S, T, A, B> {
  <F extends URIS3>(F: Strong3<F>): Optic3<F, S, T, A, B>
  <F extends URIS2>(F: Strong2<F>): Optic2<F, S, T, A, B>
  <F>(F: Strong<F>): Optic<F, S, T, A, B>
}

export interface Lens$<S, A> extends Lens<S, S, A, A> {}

export const lens$ = <S, T, A, B>(to: (s: S) => [A, (b: B) => T]): Lens<S, T, A, B> => {
  return <F>(F: Strong<F>) => (pab: HKT2<F, A, B>) => F.promap(F.first<A, B, (b: B) => T>(pab), to, ([b, f]) => f(b))
}

/**
 * Create a `Lens` from a getter/setter pair
 */
export const lens = <S, T, A, B>(get: (s: S) => A, set: (s: S) => (b: B) => T): Lens<S, T, A, B> => {
  return lens$((s: S) => tuple(get(s), (b: B) => set(s)(b)))
}

export const asGetter = <S, T, A, B>(lens: Lens<S, T, A, B>): G.Getter<S, T, A, B> => {
  return lens(forget)
}

export const view = <S, T, A, B>(lens: Lens<S, T, A, B>): ((s: S) => A) => {
  return G.view(asGetter(lens))
}

export const asSetter = <S, T, A, B>(lens: Lens<S, T, A, B>): S.Setter<S, T, A, B> => {
  return lens(reader)
}

export const over = <S, T, A, B>(lens: Lens<S, T, A, B>): ((f: (a: A) => B) => ((s: S) => T)) => {
  return S.over(asSetter(lens))
}

export const set = <S, T, A, B>(lens: Lens<S, T, A, B>): ((b: B) => (s: S) => T) => {
  return S.set(asSetter(lens))
}
