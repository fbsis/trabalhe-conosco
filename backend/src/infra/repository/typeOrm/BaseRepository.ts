import {
  ObjectLiteral,
  Repository,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  entity: Repository<T>;

  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

}
