import { Tagged } from './Tagged'

export interface Review<S, T, A, B> {
  (pab: Tagged<A, B>): Tagged<S, T>
}
