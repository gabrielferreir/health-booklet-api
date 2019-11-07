import {getManager} from "typeorm";
import {User} from "../entity/User";
import {Person} from "../entity/Person";

export default class UserRepository {

    async create(user: User): Promise<User> {
        const resultUser = await getManager().getRepository(User).save(user);
        const person = new Person(null, resultUser, 'Eu', resultUser.birthday, resultUser.isMale);
        await getManager().getRepository(Person).save(person);
        return resultUser
    }

    async read(): Promise<Array<User>> {
        return await getManager().getRepository(User).find(
            {
                relations: ['persons']
            }
        );
    }

    async readOne(id: any): Promise<User> {
        console.log(id);

        const user = await getManager().getRepository(User).findOne({
            where: {
                id: id
            },
            relations: ['persons']
        });

        return user;
    }

    async updade(user: User) {
        return await getManager().getRepository(User).save(user);
    }

    async delete(id: any) {
        return await getManager().getRepository(User).delete(id);
    }

    async signIn(email, pass): Promise<User> {
        return await getManager().getRepository(User).findOne({
            where: {email: email, pass: pass}
        });
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
