import { Species } from "../../../data/postgres/models/species.model.js";
import { CustomError } from "../../../domain/index.js";

export class FindOneSpeciesService {
    async execute(specieId: string) {
        const species = await Species.findOne({
            where: {
                id: specieId
            }
        })

        if(!species) {
            throw CustomError.badRequest("Species not found");
        }

        return species
    }

  
}