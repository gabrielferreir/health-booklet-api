import {Entity, Column, PrimaryColumn, ManyToMany, JoinTable} from "typeorm";
import {Vaccine} from "./Vaccine";

@Entity()
export class Booklet {

    constructor(id, name, description, vaccines) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.vaccines = vaccines;
    }

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(vaccine => Vaccine)
    @JoinTable()
    vaccines: Vaccine[];

}
