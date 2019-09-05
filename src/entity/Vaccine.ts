import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Vaccine {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
