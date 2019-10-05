import {getManager} from "typeorm";
import {PersonBooklet} from "../entity/PersonBooklet";
import {Person} from "../entity/Person";
import {Booklet} from "../entity/Booklet";
import {PersonVaccine} from "../entity/PersonVaccine";
import PersonVaccineRepository from "./personVaccine";

export default class PersonBookletRepository {

    async read(person: Person): Promise<Array<PersonBooklet>> {
        return await getManager().getRepository(PersonBooklet).find({
            where: {
                person: person
            },
            relations: ['booklet']
        });
    }

    async readOne(id: number): Promise<PersonBooklet> {
        return await getManager().getRepository(PersonBooklet).findOne({
            where: {
                id: id
            },
            relations: ['vaccines', 'booklet']
        });
    }

    async create(person: Person, booklet: Booklet) {

        console.log('person', person);
        console.log('booklet', booklet);

        const personVaccineRepository = new PersonVaccineRepository();

        const personVaccine = await Promise.all(booklet.vaccines.map(async item => {
            const personVaccine = new PersonVaccine(null, item, 1, 30, false)
            return await personVaccineRepository.create(personVaccine);
        }));


        const personBooklet = new PersonBooklet(null, person, booklet, personVaccine);

        // console.log('personBooklet', personVaccine);

        return await getManager().getRepository(PersonBooklet).save(personBooklet);
    }
}
