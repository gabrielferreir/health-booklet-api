import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Vaccine {

    constructor(id, name, dose, description, daysMin, daysMax) {
        this.id = id;
        this.name = name;
        this.dose = dose;
        this.description = description;
        this.daysMin = daysMin;
        this.daysMax = daysMax;
    }

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    dose: string;

    @Column()
    description: string;

    @Column({nullable: true})
    daysMin: number;

    @Column({nullable: true})
    daysMax: number;

}
