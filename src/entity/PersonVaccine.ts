import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Vaccine} from "./Vaccine";

@Entity()
export class PersonVaccine {

    constructor(id, vaccine, minDate, maxDate, isOkay) {
        this.id = id;
        this.vaccine = vaccine;
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.isOkay = isOkay;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Vaccine, vaccine => vaccine.id)
    vaccine: Vaccine;

    @Column()
    minDate: Date;

    @Column()
    maxDate: Date;

    @Column()
    isOkay: boolean;

}
