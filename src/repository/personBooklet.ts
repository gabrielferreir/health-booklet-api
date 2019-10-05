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
        const personVaccineRepository = new PersonVaccineRepository();

        const personVaccine = await Promise.all(booklet.vaccines.map(async item => {
            const minDate = this.addData(item.daysMin);
            const maxDate = this.addData(item.daysMax);
            const personVaccine = new PersonVaccine(null, item, minDate, maxDate, false);
            return await personVaccineRepository.create(personVaccine);
        }));

        const personBooklet = new PersonBooklet(null, person, booklet, personVaccine);

        return await getManager().getRepository(PersonBooklet).save(personBooklet);
    }

    private addData(days) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        now.setDate(now.getDate() + days);
        return now;
    }
}

