import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User, type User as UserType } from "./user.model.js"
import { Pet, type Pet as PetType } from "./pet.model.js"

enum AppointmentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELED = "canceled",
}

@Entity()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("enum", { enum:AppointmentStatus, default: AppointmentStatus.PENDING, nullable: false})
    status: AppointmentStatus

    @Column("timestamp", { nullable: false })
    date: Date

    @Column("varchar", { nullable: false })
    reason: string

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @ManyToOne(() => User, (user) => user.appointment)
    @JoinColumn({ name: "doctor_user_id"})
    user: UserType

    @ManyToOne(() => Pet, (pet) => pet.appointment)
    @JoinColumn({ name: 'pet_id'})
    pet: PetType

}