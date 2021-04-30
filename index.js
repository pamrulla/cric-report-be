const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');

const app = express();
mongoose.connect("", {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8080, () => {
    console.log("now listening for requests on port 8080")
});
