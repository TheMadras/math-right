const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/mathright', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const users = require("./users.js");
app.use("/api/users", users.routes);

const projects = require("./projects.js");
app.use("/api/projects", projects.routes);

app.listen(3000, () => console.log('Server listening on port 3000!'));