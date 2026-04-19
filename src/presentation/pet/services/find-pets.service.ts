import { Pet } from "../../../data/postgres/models/pet.model.js";
import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError } from "../../../domain/index.js";

export class FindPetsService {
    async execute(userId: string) {
        try{
            const user = await User.findOne({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    pets: {
                        id: true,
                        name: true,
                        breed: true,
                        species: {
                            name: true,
                        }
                    }
                },
                where: {
                    id: userId
                },
                relations: ["pets", "pets.species"],
            })

            if (!user) {
                throw CustomError.notFound("User not found");
            }

            return user
        } catch(err) {
            console.log(err)
            throw CustomError.internalServer("Error fetching pets");
        }
    }
}