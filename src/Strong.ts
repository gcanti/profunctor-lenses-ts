import { HKT2 } from 'fp-ts/lib/HKT'
import { Profunctor } from 'fp-ts/lib/Profunctor'

export interface Strong<P> extends Profunctor<P> {
  first<A, B, C>(pab: HKT2<P, A, B>): HKT2<P, [A, C], [B, C]>
  second<A, B, C>(pab: HKT2<P, B, C>): HKT2<P, [A, B], [A, C]>
}
