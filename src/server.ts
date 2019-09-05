import App from './app';
import UserController from './controller/user';
import VaccineController from "./controller/vaccine";

const app = new App(
    [
        new UserController(),
        new VaccineController(),
    ],
    5000,
);

app.initializeFinalMiddlewares();

app.listen();