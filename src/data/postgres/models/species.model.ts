import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Species extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column("varchar", { length: 30, nullable: false })
    name: string
}