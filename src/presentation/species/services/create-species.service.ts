import { Species } from "../../../data/postgres/models/species.model.js";
import type { CreateSpeciesDto } from "../../../domain/dtos/species/create-specie.dto.js";
import { CustomError } from "../../../domain/index.js";

export class CreateSpeciesService {
    async execute(speciesData: CreateSpeciesDto) {
        const species = new Species();

        species.name = speciesData.name

        try{
            await species.save();
            return species
        } catch(err: any) {
            if(err.code === '23505') {
                throw CustomError.conflict("Species already in exist")
            }

            if(err.code === '22P02') {
                throw CustomError.unprocessableEntity("Invalid data type")
            }

            throw CustomError.internalServer("Error trying to create species")
        }
    }
}