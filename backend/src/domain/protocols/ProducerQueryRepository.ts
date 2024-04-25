import { Producer } from '@/domain/entities'

export interface ProducerQueryRepository {
  getAll: () => Promise<Producer[]>
  getOne: (id: number) => Promise<Producer>
}
