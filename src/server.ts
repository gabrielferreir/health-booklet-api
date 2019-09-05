import App from './app';
import UserController from './controller/user';

const app = new App(
    [
        new UserController()
    ],
    5000,
);

app.initializeFinalMiddlewares();

app.listen();