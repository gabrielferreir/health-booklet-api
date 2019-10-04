import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne} from "typeorm";
import {User} from "./User";
import {Vaccine} from "./Vaccine";

@Entity()
export class UserVaccine {

    constructor(id, vaccine, date, isOkay) {
        this.id = id;
        this.vaccine = vaccine;
        this.date = date;
        this.isOkay = isOkay;

    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Vaccine, vaccine => vaccine.id)
    vaccine: Vaccine;

    @Column()
    date: Date;

    @Column()
    isOkay: boolean;

}
