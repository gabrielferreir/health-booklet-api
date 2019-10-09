import {getConnection, getManager} from "typeorm";
import {PersonBooklet} from "../entity/PersonBooklet";
import {Person} from "../entity/Person";
import {Booklet} from "../entity/Booklet";
import {PersonVaccine} from "../entity/PersonVaccine";
import PersonVaccineRepository from "./personVaccine";
import * as moment from 'moment';
import {User} from "../entity/User";

export default class PersonBookletRepository {

    async read(idUser: number) {

        const res = getConnection()
            .createQueryBuilder()
            .select("PB.id AS id, P.name AS namePerson, B.name AS nameBooklet")
            .from(PersonBooklet, "PB")
            .leftJoin(Person, 'P', 'PB.personId = P.id')
            .leftJoin(Booklet, 'B', 'PB.bookletId = B.id')
            .leftJoin(User, 'U', 'P.userId = U.id')
            .where('U.id = :idUser', {idUser})
            .execute();

        console.log(res);
        return res;
        // .where("user.id = :id", { id: 1 })

        // return await getManager().getRepository(PersonBooklet).find({
        //     where: {
        //         person: person,
        //     },
        //     relations: ['booklet', 'person']
        // });
    }

    async readOne(id: number): Promise<PersonBooklet> {
        let personBooklet = await getManager().getRepository(PersonBooklet).findOne({
            where: {
                id: id,
            },
            relations: ['vaccines', 'vaccines.vaccine', 'booklet', 'person']
        });

        personBooklet.vaccines = personBooklet.vaccines.sort((a, b) => {
            if (a.minDate > b.minDate) return 1;
            if (a.minDate < b.minDate) return -1;
            return 0;
        });

        return personBooklet;
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
        const date = moment().utc(false);
        date.add(days, 'days');
        return date.format('YYYY-MM-DD');
    }
}

