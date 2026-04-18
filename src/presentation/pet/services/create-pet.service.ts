import { Pet } from "../../../data/postgres/models/pet.model.js";
import { CustomError, type CreatePetDto } from "../../../domain/index.js";

export class CreatePetService {
    async execute(petData: CreatePetDto) {
        const pet = new Pet();

        pet.name = petData.name;
        pet.weight = petData.weight;
        pet.breed = petData.breed;

        try{
            await pet.save()
            return pet
        } catch(err) {
            return err
        }

    }
}