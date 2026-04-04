import { DataSource } from "typeorm";
import { User } from "./models/user.model.js";
import { Pet } from "./models/pet.model.js";
import { Doctor } from "./models/doctor.model.js";
import { Species } from "./models/species.model.js";
import { Appointment } from "./models/appointment.model.js";

interface Options {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
}

export class PostgresDatabase {
    public datasource: DataSource;

    constructor(options: Options){
        this.datasource = new DataSource({
            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            synchronize: false,
            entities: [User, Pet, Doctor, Species, Appointment],
            ssl: {
                rejectUnauthorized: false,
            }
        })
    }

    async connect() {
        try{
            await this.datasource.initialize();
            console.log("Database connected!");
        } catch(error) {
            console.error(error);
        }
    }

} 