import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet, type Pet as PetType } from "./pet.model.js";
import { Appointment, type Appointment as AppointmentType } from "./appointment.model.js";
import { Doctor, type Doctor as DoctorType } from "./doctor.model.js";

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
    DOCTOR = "doctor",
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", {
        length: 70,
        nullable: false
    })
    name: string

    @Column("varchar", {
        length: 255,
        nullable: false
    })
    password: string

    @Column("varchar", {
        length: 50,
        nullable: false,
        unique: true
    })
    email: string

    @Column("varchar", {
        length: 20,
        nullable: false
    })
    phone_number: string

    @Column("enum", {
        enum: UserRole,
        default: UserRole.USER,
        nullable: false
    })
    role: UserRole

    @Column("boolean", {
        default: true,
        nullable: false
    })
    status: boolean

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        nullable: false
    })
    created_at: Date

    @OneToMany(() => Pet, (pet) => pet.user )
    @JoinColumn({ name: "owner" })
    pets: PetType
    
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointment: AppointmentType[]

    @OneToOne(() => Doctor, (doctor) => doctor.user)
    doctor: DoctorType

}