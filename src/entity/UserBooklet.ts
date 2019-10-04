import {Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Booklet} from "./Booklet";
import {Vaccine} from "./Vaccine";
import {UserVaccine} from "./UserVaccine";

@Entity()
export class UserBooklet {

    constructor(id, idUser, idBooklet) {
        this.id = id;
        this.idUser = idUser;
        this.idBooklet = idBooklet;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Booklet, booklet => booklet.id)
    idBooklet: Booklet;

    @ManyToOne(type => User, user => user.id)
    idUser: User;

    @ManyToMany(vaccine => UserVaccine)
    @JoinTable()
    vaccines: UserVaccine[];

}
