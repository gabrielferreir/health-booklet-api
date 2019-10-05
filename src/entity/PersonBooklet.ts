import {Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Booklet} from "./Booklet";
import {PersonVaccine} from "./PersonVaccine";
import {Person} from "./Person";

@Entity()
export class PersonBooklet {

    constructor(id, person, booklet, vaccines) {
        this.id = id;
        this.person = person;
        this.booklet = booklet;
        this.vaccines = vaccines;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Booklet, booklet => booklet.id)
    booklet: Booklet;

    @ManyToOne(type => Person, person => person.id)
    person: Person;

    @ManyToMany(vaccine => PersonVaccine)
    @JoinTable()
    vaccines: PersonVaccine[];

}
