import {getManager} from "typeorm";
import {Vaccine} from "../entity/Vaccine";

export default class VaccineRepository {

    async create(user: Vaccine): Promise<Vaccine> {
        return await getManager().getRepository(Vaccine).save(user);
    }

    async read(): Promise<Array<Vaccine>> {
        return await getManager().getRepository(Vaccine).find();
    }

    async readOne(id: any): Promise<Array<Vaccine>> {
        return await getManager().getRepository(Vaccine).findByIds(id);
    }

    async updade(user: Vaccine) {
        return await getManager().getRepository(Vaccine).save(user);
    }

    async delete(id: any) {
        return await getManager().getRepository(Vaccine).delete(id);
    }
}
