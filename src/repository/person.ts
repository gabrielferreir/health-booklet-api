import {getManager} from "typeorm";
import {Person} from "../entity/Person";
import {User} from "../entity/User";

export default class PersonRepository {

    async create(person: Person): Promise<Person> {
        return await getManager().getRepository(Person).save(person);
    }

    async read(user): Promise<Array<Person>> {
        return await getManager().getRepository(Person).find(
            {
                where: {
                    user: user
                }
            }
        );
    }

    async readOne(id: any): Promise<Person> {
        return await getManager().getRepository(Person).findOne({
            where: {
                id: id
            }
        });
    }

    async updade(person: Person) {
        return await getManager().getRepository(Person).update(
            {id: person.id}, person);
    }

    async delete(id: any) {
        return await getManager().getRepository(Person).delete(id);
    }
}
