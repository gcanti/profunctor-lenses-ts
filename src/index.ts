import { HKT2 } from 'fp-ts/lib/HKT'
import { Profunctor } from 'fp-ts/lib/Profunctor'
import { Strong } from './Strong'
import * as forget from './Forget'

/** A general-purpose Data.Lens */
export interface Optic<P, S, T, A, B> {
  (pab: HKT2<P, A, B>): HKT2<P, S, T>
}

/** A generalized isomorphism */
export interface Iso<S, T, A, B> {
  <P>(P: Profunctor<P>): Optic<P, S, T, A, B>
}

/** A lens */
export class Lens<S, T, A, B> {
  constructor(private readonly value: <P>(P: Strong<P>) => Optic<P, S, T, A, B>) {}
  run(P: Strong<forget.URI>): Getter<S, T, A, B>
  run<P>(P: Strong<P>): Optic<P, S, T, A, B>
  run<P>(P: Strong<P>): Optic<P, S, T, A, B> {
    return this.value(P)
  }
  asGetter(): Getter<S, T, A, B> {
    return this.run(forget)
  }
}

/** A Fold */
export type Fold<R, S, T, A, B> = (pab: forget.Forget<R, A, B>) => forget.Forget<R, S, T>

/** A getter */
export type Getter<S, T, A, B> = Fold<A, S, T, A, B>

export function lens_<S, T, A, B>(to: (s: S) => [A, (b: B) => T]): Lens<S, T, A, B> {
  return new Lens<S, T, A, B>(P => pab => P.promap(to, t => t[1](t[0]), P.first(pab)))
}

/** Create a `Lens` from a getter/setter pair */
export function lens<S, T, A, B>(get: (s: S) => A, set: (s: S) => (b: B) => T): Lens<S, T, A, B> {
  return lens_(s => [get(s), b => set(s)(b)])
}

/** View the focus of a `Getter` */
export function view<S, T, A, B>(getter: Getter<S, T, A, B>): (s: S) => A {
  return s => getter(new forget.Forget<A, A, B>(a => a)).value(s)
}
