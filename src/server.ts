import App from './app';
import UserController from './controller/user';
import VaccineController from "./controller/vaccine";
import CampaignController from "./controller/campaign";
import BookletController from "./controller/booklet";

const app = new App(
    [
        new UserController(),
        new VaccineController(),
        new CampaignController(),
        new BookletController(),
    ],
    5000,
);

app.initializeFinalMiddlewares();

app.listen();