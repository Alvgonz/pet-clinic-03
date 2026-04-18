import { Pet } from "../../../data/postgres/models/pet.model.js";
import { CustomError } from "../../../domain/index.js";

export class FindPetsService {
    async execute() {
        try{
            const pets = await Pet.find();

            return pets;
        } catch(err) {
            throw CustomError.internalServer("Error fetching pets");
        }
    }
}