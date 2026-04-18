import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { User as Usertype } from "./user.model.js";
import { User } from '../models/user.model.js'


@Entity()
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column("varchar", { length: 30, nullable: false })
    speciality: string

    @OneToOne(() => User, (user) => user.doctor)
    @JoinColumn({ name: "user_id"})
    user: Usertype
}