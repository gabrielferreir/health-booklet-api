import * as jwt from 'jsonwebtoken';
import ENV from '../config';

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).send({message: 'Autenticação é requerida'});

    jwt.verify(token, ENV.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(400).send({message: 'Token invalido'});

        req.idUser = decoded.id;
        next();
    });
};

export default verifyJWT;