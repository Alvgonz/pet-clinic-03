export class CreatePetDto {
    constructor(
        public readonly name: string,
        public readonly weight: number,
        public readonly breed: string,
        public readonly species_id: string,
    ) {}
    static execute(object: { [key: string]: any }): [string, undefined] | [undefined, CreatePetDto] {
        const { name, weight, breed, species_id} = object

        if(!name) return ["Name is required", undefined]
        if(!weight) return ["Weight is required", undefined]
        if(weight <= 0) return ["Weight must be equal or greater than 0", undefined]
        if(!breed) return ["Breed is required", undefined]
        if(!species_id) return ["Species id is required", undefined]

        return [undefined, new CreatePetDto(
            name.trim().toLowerCase(),
            weight,
            breed.trim().toLowerCase(),
            species_id
        )]
    }
}