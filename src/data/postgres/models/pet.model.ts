import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User, type User as UserType } from "./user.model.js";
import { Appointment as AppointmentType } from "./appointment.model.js";
import { Species, type Species as SpeciesType } from "./species.model.js";

@Entity()
export class Pet extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column("varchar", { length: 30, nullable: false })
    name: string

    @Column("float", { nullable: false })
    weight: number

    @Column("varchar", { length: 30, nullable: false, default: "unknown" })
    breed: string

    @Column("boolean", { default: true, nullable: false })
    status: boolean

    @ManyToOne(() => User, user => user.pets)
    user: UserType

    @OneToMany(() => AppointmentType, (appointment) => appointment.pet)
    appointment: AppointmentType

    @OneToOne(() => Species, (species) => species.pets)
    @JoinColumn({ name: 'species_id'})
    species: SpeciesType
}