import { identity } from 'fp-ts/lib/function'
import { Forget } from './Forget'

export interface Getter<S, T, A, B> {
  <R>(pab: Forget<R, A, B>): Forget<R, S, T>
}

/**
 * View the focus of a `Getter`
 */
export const view = <S, T, A, B>(getter: Getter<S, T, A, B>): ((s: S) => A) => {
  return getter(new Forget(identity)).run
}
