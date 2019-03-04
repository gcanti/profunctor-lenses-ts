import { Reader } from 'fp-ts/lib/Reader'

export interface Setter<S, T, A, B> {
  (pab: Reader<A, B>): Reader<S, T>
}

export const over = <S, T, A, B>(setter: Setter<S, T, A, B>): ((f: (a: A) => B) => ((s: S) => T)) => {
  return f => setter(new Reader(f)).run
}

export const set = <S, T, A, B>(setter: Setter<S, T, A, B>): ((b: B) => (s: S) => T) => {
  const modify = over(setter)
  return b => modify(() => b)
}
