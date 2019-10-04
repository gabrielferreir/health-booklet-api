import {getManager} from "typeorm";
import {UserBooklet} from "../entity/UserBooklet";

export default class UserBookletRepository {

    async read(): Promise<Array<UserBooklet>> {
        return await getManager().getRepository(UserBooklet).find({relations: ['vaccines']});
    }

    async readOne(id: any): Promise<Array<UserBooklet>> {
        return await getManager().getRepository(UserBooklet).findByIds(id, {relations: ['vaccines']});
    }
}
