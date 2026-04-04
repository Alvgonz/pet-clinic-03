import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}