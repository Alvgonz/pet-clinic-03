import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number
    @Column("varchar", { length: 30, nullable: false })
    speciality: string
}