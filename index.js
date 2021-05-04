const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
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
