import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"
import {User} from "./User";
import {PersonBooklet} from "./PersonBooklet";

@Entity()
export class Person {

    constructor(id, user, name, birthday, isMale) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.birthday = birthday;
        this.isMale = isMale;
    }

    static byId(id: number) {
        return new Person(id, null, null, null, null);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @Column()
    name: string;

    @Column()
    birthday: Date;

    @Column()
    isMale: boolean;

    @OneToMany(type => PersonBooklet, personBooklet => personBooklet.person, {onDelete: 'CASCADE'})
    personBooklet: PersonBooklet[];

}
