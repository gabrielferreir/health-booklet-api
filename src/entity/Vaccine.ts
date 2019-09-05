import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Vaccine {

    constructor(id, name, description, period) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.period = period;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    period: string;

}
