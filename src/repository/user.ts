import {getManager} from "typeorm";
import {User} from "../entity/User";

export default class UserRepository {

    async create(user: User): Promise<User> {
        return await getManager().getRepository(User).save(user);
    }

    async read(): Promise<Array<User>> {
        return await getManager().getRepository(User).find();
    }

    async readOne(id: any): Promise<Array<User>> {
        return await getManager().getRepository(User).findByIds(id);
    }

    async updade(user: User) {
        return await getManager().getRepository(User).save(user);
    }

    async delete(id: any) {
        return await getManager().getRepository(User).delete(id);
    }

    async availableEmail(email: string) {
        const user = await getManager().getRepository(User).findOne({
            where: [{email: email}]
        });

        if (!!user)
            throw {message: 'E-mail não disponivel', statusCode: 400};

        return true;
    }
}
