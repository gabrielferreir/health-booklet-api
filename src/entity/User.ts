import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, JoinTable} from "typeorm";

@Entity()
export class User {

    constructor(id, firstName, lastName, email, pass, birthday, isMale, isGravid, publicAgent) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pass = pass;
        this.birthday = birthday;
        this.isMale = isMale;
        this.isGravid = isGravid;
        this.publicAgent = publicAgent;
    }

    static byId(id) {
        return new User(id, null, null, null, null, null, null, null, null);
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

    @Column()
    isGravid: boolean;

    @Column()
    publicAgent: boolean;

}
