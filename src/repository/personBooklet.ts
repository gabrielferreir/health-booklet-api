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
        return getConnection()
            .createQueryBuilder()
            .select("PB.id AS id, P.name AS namePerson, B.name AS nameBooklet")
            .from(PersonBooklet, "PB")
            .leftJoin(Person, 'P', 'PB.personId = P.id')
            .leftJoin(Booklet, 'B', 'PB.bookletId = B.id')
            .leftJoin(User, 'U', 'P.userId = U.id')
            .where('U.id = :idUser', {idUser})
            .execute();
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
            const minDate = this.addData(person.birthday, item.daysMin);
            const maxDate = this.addData(person.birthday, item.daysMax);
            const personVaccine = new PersonVaccine(null, item, minDate, maxDate, false);
            return await personVaccineRepository.create(personVaccine);
        }));

        const personBooklet = new PersonBooklet(null, person, booklet, personVaccine);

        return await getManager().getRepository(PersonBooklet).save(personBooklet);
    }

    async isOkay(idVaccine: number, isOkay: boolean) {
        return await getConnection()
            .createQueryBuilder()
            .update(PersonVaccine)
            .set({isOkay: isOkay})
            .where("id = :idVaccine", {idVaccine})
            .execute();
    }

    private addData(birth, days) {
        const date = moment(birth).utc(false);
        date.add(days, 'days');
        return date.format('YYYY-MM-DD');
    }

    async delete(idBooklet) {
        return await getManager().getRepository(PersonBooklet).delete({id: idBooklet});
    }

    async percentageBooks(idUser: number) {
        return getManager().query('SELECT pb.id, ' +
            'pb.personId, ' +
            'p2.name, ' +
            'b.name, ' +
            '(SELECT COUNT(*) ' +
            'FROM person_booklet_vaccines_person_vaccine pbvpv ' +
            'LEFT JOIN person_vaccine pv on pbvpv.personVaccineId = pv.id ' +
            'WHERE pbvpv.personBookletId = pb.id) as total, ' +
            '(SELECT COUNT(*) ' +
            'FROM person_booklet_vaccines_person_vaccine pbvpv ' +
            'LEFT JOIN person_vaccine pv on pbvpv.personVaccineId = pv.id ' +
            'WHERE pbvpv.personBookletId = pb.id ' +
            'AND pv.isOkay IS TRUE) as taken ' +
            'FROM person_booklet pb ' +
            'INNER JOIN person p2 on pb.personId = p2.id ' +
            'INNER JOIN booklet b on pb.bookletId = b.id ' +
            `WHERE personId IN (SELECT p.id FROM person p WHERE userId = ${idUser}) ` +
            'GROUP BY pb.bookletId;')
    }

    async nextVaccines(idUser: number) {
        return getManager().query('SELECT pv.id, pv.minDate, pv.maxDate, p2.name AS person, v.name as vaccine ' +
            'FROM person_booklet_vaccines_person_vaccine pbvpv ' +
            'LEFT JOIN person_vaccine pv on pbvpv.personVaccineId = pv.id ' +
            'LEFT JOIN person_booklet pb on pbvpv.personBookletId = pb.id ' +
            'LEFT JOIN person p2 on pb.personId = p2.id ' +
            'LEFT JOIN vaccine v ON v.id = pv.vaccineId ' +
            `WHERE pb.personId IN (SELECT p.id FROM person p WHERE userId = ${idUser}) ` +
            'AND pv.minDate > CURRENT_TIMESTAMP ' +
            'AND pv.isOkay IS FALSE ' +
            'ORDER BY pv.minDate ASC ' +
            'LIMIT 5;')
    }
}

