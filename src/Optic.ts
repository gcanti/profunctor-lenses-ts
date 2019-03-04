import { HKT2, Type2, Type3, URIS2, URIS3, Type4, URIS4 } from 'fp-ts/lib/HKT'

export interface Optic<F, S, T, A, B> {
  (pab: HKT2<F, A, B>): HKT2<F, S, T>
}

export interface Optic2<F extends URIS2, S, T, A, B> {
  (pab: Type2<F, A, B>): Type2<F, S, T>
}

export interface Optic3<F extends URIS3, S, T, A, B> {
  <U>(pab: Type3<F, U, A, B>): Type3<F, U, S, T>
}

export interface Optic4<F extends URIS4, S, T, A, B> {
  <X, U>(pab: Type4<F, X, U, A, B>): Type4<F, X, U, S, T>
}
