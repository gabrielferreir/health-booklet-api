import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Campaign {

    constructor(id, name, description, initialDate, finalDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    initialDate: Date;

    @Column()
    finalDate: Date;

}
