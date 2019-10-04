import * as express from 'express';
import {Campaign} from "../entity/Campaign";
import CampaignRepository from "../repository/campaign";

export default class CampaignController {
    public path = '/campaign';
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
                name: req.body.name,
                description: req.body.description,
                initialDate: req.body.initialDate,
                finalDate: req.body.finalDate
            };
            const campaignRepository = new CampaignRepository();
            const campaign = new Campaign(null, params.name, params.description, params.initialDate, params.finalDate);
            await campaignRepository.create(campaign);
            return res.status(201).jsonp(campaign);
        } catch (e) {
            next(e);
        }
    }

    async read(req, res, next) {
        try {
            const repository = new CampaignRepository();
            const response = await repository.read();
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

    async readOne(req, res, next) {
        try {
            const repository = new CampaignRepository();
            const response = await repository.readOne(req.params.id);
            res.status(200).json(response[0]);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {

        try {
            const params = {
                name: req.body.name,
                description: req.body.description,
                initialDate: req.body.initialDate,
                finalDate: req.body.finalDate
            };

            const campaignRepository = new CampaignRepository();

            const campaign = new Campaign(null, params.name, params.description, params.initialDate, params.finalDate);

            const response = await campaignRepository.updade(campaign);

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

            const repository = new CampaignRepository();
            const response = await repository.delete(params.id);
            res.status(200).jsonp(response);
        } catch (e) {
            next(e);
        }
    }

}
