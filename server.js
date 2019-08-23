const express = require('express');
const graphqlHTTP = require('express-graphql');
const {importSchema} = require('graphql-import');
const {buildSchema} = require('graphql');

const schema = buildSchema(importSchema('schema.graphql'));

const root = {
    name: () => 'Servidor rodando!'
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
