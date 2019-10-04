import * as express from 'express';
import UserBookletRepository from "../repository/userBooklet";

export default class UserBookletController {
    public path = '/user-booklet';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.read);
        this.router.get(`${this.path}/:id`, this.readOne);
    }

    async read(req, res, next) {
        try {
            const repository = new UserBookletRepository();
            const response = await repository.read();
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async readOne(req, res, next) {
        try {
            const repository = new UserBookletRepository();
            const response = await repository.readOne(req.params.id);
            res.status(200).json(response[0]);
        } catch (e) {
            next(e);
        }
    }

}
