import {getManager} from "typeorm";
import {Booklet} from "../entity/Booklet";

export default class BookletRepository {

    async read(): Promise<Array<Booklet>> {
        return await getManager().getRepository(Booklet).find({relations: ['vaccines']});
    }

    async readOne(id: any): Promise<Booklet> {
        return await getManager().getRepository(Booklet).findOne({
            where: {
                id: id
            },
            relations: ['vaccines']
        });
    }
}
