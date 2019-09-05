import * as express from 'express';
import {Vaccine} from "../entity/Vaccine";
import VaccineRepository from "../repository/vaccine";

export default class VaccineController {
    public path = '/vaccine';
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
                name: req.body.name
            };
            const vaccineRepository = new VaccineRepository();
            const user = new Vaccine(null, params.name);
            await vaccineRepository.create(user);
            return res.status(201).jsonp(user);
        } catch (e) {
            next(e);
        }
    }

    async read(req, res, next) {
        try {
            const repository = new VaccineRepository();
            const response = await repository.read();
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async readOne(req, res, next) {
        try {
            const repository = new VaccineRepository();
            const response = await repository.readOne(req.params.id);
            res.status(200).json(response[0]);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {

        try {
            const params = {
                name: req.body.name
            };

            const vaccineRepository = new VaccineRepository();

            const user = new Vaccine(null, params.name);

            const response = await vaccineRepository.updade(user);

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

            const repository = new VaccineRepository();
            const response = await repository.delete(params.id);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

}
