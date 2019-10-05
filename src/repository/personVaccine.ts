import {getManager} from "typeorm";
import {PersonVaccine} from "../entity/PersonVaccine";

export default class PersonVaccineRepository {

    async create(personVaccine: PersonVaccine) {
        return await getManager().getRepository(PersonVaccine).save(personVaccine);
    }
}
