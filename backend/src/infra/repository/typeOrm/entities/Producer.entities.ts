import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { FarmEntitiy } from "./Farm.entities";

@Entity({ name: "producers"})
export class ProducerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: "bigint"})
  document: number;

  @Column()
  name: string;

  @OneToMany(() => FarmEntitiy, (farm) => farm.producer, { cascade: true })
  @JoinColumn()
  farms: FarmEntitiy[];
}
