import * as express from 'express';
import {Person} from "../entity/Person";
import {User} from "../entity/User";
import PersonRepository from "../repository/person";
import Auth from '../middleware/auth'

export default class PersonController {
    public path = '/person';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, Auth, this.create);
        this.router.get(this.path, Auth, this.read);
        this.router.get(`${this.path}/:id`, Auth, this.readOne);
        this.router.put(`${this.path}/:id`, Auth, this.update);
        this.router.delete(`${this.path}/:id`, Auth, this.delete);
    }

    async create(req, res, next) {
        try {
            const params = {
                name: req.body.name,
                birthday: req.body.birthday,
                isMale: req.body.isMale,
                idUser: req.idUser
            };

            const personRepository = new PersonRepository();
            const user = User.byId(params.idUser);

            const person = new Person(null, user, params.name, params.birthday, params.isMale);
            await personRepository.create(person);
            return res.status(201).jsonp(person);
        } catch (e) {
            next(e);
        }
    }

    async read(req, res, next) {
        try {
            const repository = new PersonRepository();
            const user = User.byId(req.idUser);
            const response = await repository.read(user);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async readOne(req, res, next) {
        try {
            const repository = new PersonRepository();
            const response = await repository.readOne(req.params.id);
            res.status(200).json(response[0]);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {

        try {
            const params = {
                id: req.params.id,
                name: req.body.name,
                birthday: req.body.birthday,
                isMale: req.body.isMale,
                idUser: req.idUser
            };

            const personRepository = new PersonRepository();

            const user = User.byId(req.idUser);
            const person = new Person(params.id, user, params.name, params.birthday, params.isMale);

            const response = await personRepository.updade(person);

            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const params = {
                id: req.params.id
            };

            const repository = new PersonRepository();
            const response = await repository.delete(params.id);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

}
