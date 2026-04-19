import { Pet } from "../../../data/postgres/models/pet.model.js";
import type { User } from "../../../data/postgres/models/user.model.js";
import { type CreatePetDto } from "../../../domain/index.js";
import { FindOneSpeciesService } from "../../species/services/find-one-species.service.js";

export class CreatePetService {
    constructor(
        private readonly findOneSpeciesService: FindOneSpeciesService
    ){}
    async execute(petData: CreatePetDto, petUser: User) {
        const pet = new Pet();

        const species = await this.findOneSpeciesService.execute(petData.species_id);

        pet.name = petData.name;
        pet.weight = petData.weight;
        pet.breed = petData.breed;
        pet.species = species;
        pet.user = petUser
        

        try{
            await pet.save()
            return pet
        } catch(err) {
            return err
        }

    }
}