import App from './app';
import UserController from './controller/user';
import VaccineController from "./controller/vaccine";
import CampaignController from "./controller/campaign";
import BookletController from "./controller/booklet";
import PersonController from "./controller/person";
import PersonBookletController from "./controller/personBooklet";

const app = new App(
    [
        new UserController(),
        new VaccineController(),
        new CampaignController(),
        new BookletController(),
        new PersonController(),
        new PersonBookletController()
    ],
    5000,
);

app.initializeFinalMiddlewares();

app.listen();