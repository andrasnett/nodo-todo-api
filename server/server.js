const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');

// const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({ todos });
    }, err => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send('invalid');
    }

    Todo.findById(id).then(todo => {
        if (!todo) {
            return res.status(404).send('not found');
        }

        return res.send({todo});
    }).catch(err => res.status(400).send());
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

module.exports = { app };


