import * as express from 'express';
import PersonBookletRepository from "../repository/personBooklet";
import BookletRepository from "../repository/booklet";
import PersonRepository from "../repository/person";
import {Person} from "../entity/Person";

export default class PersonBookletController {
    public path = '/person-booklet';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(`${this.path}-list/:idPerson`, this.read);
        this.router.get(`${this.path}/:idPersonBooklet`, this.readOne);
        this.router.post(`${this.path}`, this.create);
    }

    async read(req, res, next) {
        try {
            const id = req.params.idPerson;
            const repository = new PersonBookletRepository();
            const person = Person.byId(id);
            const response = await repository.read(person);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async readOne(req, res, next) {
        try {
            const id = req.params.idPersonBooklet;
            const repository = new PersonBookletRepository();
            const response = await repository.readOne(id);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const params = {
                idPerson: req.body.idPerson,
                idBooklet: req.body.idBooklet
            };

            const bookletRepository = new BookletRepository();
            const booklet = await bookletRepository.readOne(params.idBooklet);

            const personRepository = new PersonRepository();
            const person = await personRepository.readOne(params.idPerson);

            const personBookletRepository = new PersonBookletRepository();
            const personBooklet = await personBookletRepository.create(person, booklet);

            res.status(200).jsonp(personBooklet);

        } catch (e) {
            next(e);
        }
    }

}