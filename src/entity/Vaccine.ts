import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Vaccine {

    constructor(id, name, description, days) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.days = days;
    }

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    days: number;

}
