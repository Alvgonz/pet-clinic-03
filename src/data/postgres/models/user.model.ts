import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
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
        nullable: false
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

}