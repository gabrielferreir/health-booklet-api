import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, JoinTable, OneToMany} from "typeorm";
import {Person} from "./Person";

@Entity()
export class User {

    constructor(id, firstName, lastName, email, pass, birthday, isMale) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pass = pass;
        this.birthday = birthday;
        this.isMale = isMale;
    }

    static byId(id) {
        return new User(id, null, null, null, null, null, null);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    pass: string;

    @Column()
    birthday: Date;

    @Column()
    isMale: boolean;

    @OneToMany(type => Person, person => person.user)
    persons: Person[];

}
