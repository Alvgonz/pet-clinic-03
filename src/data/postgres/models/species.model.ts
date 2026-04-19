import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet, type Pet as PetType } from "./pet.model.js";

@Entity()
export class Species extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { length: 30, nullable: false , unique: true})
    name: string

    @OneToOne(() => Pet, (pet) => pet.species)
    pets: PetType
}