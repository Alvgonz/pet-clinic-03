export class DoctorCreateDto {
    constructor(
        public readonly speciality: string,
        public readonly user_id: string,
    ) {}

    static execute(object: {[key: string]: any}): [string, undefined] | [undefined, DoctorCreateDto] {
        const { speciality, user_id} = object;

        if(!speciality) return ["Speciality is required", undefined];
        if(!user_id) return ["User id is required", undefined];

        return [undefined, new DoctorCreateDto(
            speciality,
            user_id,
        )]
    }
}