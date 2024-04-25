import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { ProducerEntity } from "./Producer.entities";

@Entity({ name: "farms" })
export class FarmEntitiy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAreaHectares: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  cultivableAreaHectares: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  vegetationAreaHectares: number;

  @Column("text", { array: true })
  plantedCrops: string[];

  @ManyToOne(() => ProducerEntity, (producer) => producer.farms)
  producer: ProducerEntity;
}
