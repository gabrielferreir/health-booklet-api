import * as express from 'express';
import {User} from "../entity/User";
import UserRepository from "../repository/user";
import * as crypto from "crypto";

export default class UserController {
    public path = '/user';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.create);
        this.router.get(this.path, this.read);
        this.router.get(`${this.path}/:id`, this.readOne);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    async create(req, res, next) {
        try {
            const params = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pass: crypto.createHash('md5').update(req.body.pass).digest('hex'),
                birthday: req.body.birthday,
                isMale: req.body.isMale,
                isGravid: req.body.isGravid,
                publicAgent: req.body.publicAgent
            };
            const userRepository = new UserRepository();

            await userRepository.availableEmail(params.email);

            const user = new User(null, params.firstName, params.lastName, params.email, params.pass, params.birthday, params.isMale, params.isGravid, params.publicAgent);
            await userRepository.create(user);

            return res.status(201).jsonp(user);
        } catch (e) {
            next(e);
        }
    }

    async read(req, res, next) {
        try {
            const repository = new UserRepository();
            const response = await repository.read();
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async readOne(req, res, next) {
        try {
            const repository = new UserRepository();
            const response = await repository.readOne(req.params.id);
            res.status(200).json(response[0]);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {

        try {
            const params = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pass: req.body.pass,
                birthday: req.body.birthday,
                isMale: req.body.isMale,
                isGravid: req.body.isGravid,
                publicAgent: req.body.publicAgent
            };

            const userRepository = new UserRepository();

            await userRepository.availableEmail(params.email);

            const user = new User(null, params.firstName, params.lastName, params.email, params.pass, params.birthday, params.isMale, params.isGravid, params.publicAgent);

            const response = await userRepository.updade(user);

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

            const repository = new UserRepository();
            const response = await repository.delete(params.id);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

}
