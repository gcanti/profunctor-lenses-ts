import { Forget } from './Forget'

export interface Fold<R, S, T, A, B> {
  (pab: Forget<R, A, B>): Forget<R, S, T>
}

export interface Fold$<R, S, A> extends Fold<R, S, S, A, A> {}
