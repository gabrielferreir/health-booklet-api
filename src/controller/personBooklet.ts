import * as express from 'express';
import PersonBookletRepository from "../repository/personBooklet";
import BookletRepository from "../repository/booklet";
import PersonRepository from "../repository/person";
import auth from '../middleware/auth'

export default class PersonBookletController {
    public path = '/person-booklet';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(`${this.path}-list`, auth, this.read);
        this.router.get(`${this.path}/percentage`, auth, this.percentageBooks);
        this.router.get(`${this.path}/next-vaccines`, auth, this.nextVaccines);
        this.router.get(`${this.path}/:idPersonBooklet`, auth, this.readOne);
        this.router.post(`${this.path}`, auth, this.create);
        this.router.delete(`${this.path}/:id`, auth, this.delete);
        this.router.put(`${this.path}/vaccine/:idVaccine`, auth, this.isOkay);
    }

    async read(req, res, next) {
        try {
            const repository = new PersonBookletRepository();
            const response = await repository.read(req.idUser);
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

    async isOkay(req, res, next) {
        try {
            const params = {
                idVaccine: req.params.idVaccine,
                value: req.body.value,
            };

            const personBookletRepository = new PersonBookletRepository();
            const personBooklet = await personBookletRepository.isOkay(params.idVaccine, params.value);

            res.status(200).jsonp(personBooklet);

        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;

            const personBookletRepository = new PersonBookletRepository();
            await personBookletRepository.delete(id);

            res.status(200).jsonp({message: 'Removido com sucesso'});

        } catch (e) {
            next(e);
        }
    }

    async percentageBooks(req, res, next) {
        try {
            const repository = new PersonBookletRepository();
            const response = await repository.percentageBooks(req.idUser);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async nextVaccines(req, res, next) {
        try {
            const repository = new PersonBookletRepository();
            const response = await repository.nextVaccines(req.idUser);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

}
