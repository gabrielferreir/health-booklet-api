import {getManager} from "typeorm";
import {Campaign} from "../entity/Campaign";

export default class CampaignRepository {

    async create(user: Campaign): Promise<Campaign> {
        return await getManager().getRepository(Campaign).save(user);
    }

    async read(): Promise<Array<Campaign>> {
        return await getManager().getRepository(Campaign).find();
    }

    async readOne(id: any): Promise<Array<Campaign>> {
        return await getManager().getRepository(Campaign).findByIds(id);
    }

    async updade(user: Campaign) {
        return await getManager().getRepository(Campaign).save(user);
    }

    async delete(id: any) {
        return await getManager().getRepository(Campaign).delete(id);
    }
}
