import { Species } from "../../../data/postgres/models/species.model.js";
import { CustomError } from "../../../domain/index.js";

export class FindSpeciesService {
    async execute() {
        try {
            const species = await Species.find()
            return species
        } catch(err) {
            throw CustomError.internalServer("Error fetching species")
        }
        
    }
}