require("dotenv").config();

const Person = require("./models/Person");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static("dist"));

app.use(cors());

app.use(express.json());
// app.use(morgan("tiny"));
// morgan(":method :url :status :res[content-length] - :response-time ms");

morgan.token("body", (req) => {
    return JSON.stringify(req.body);
});

// let persons = [
// 	{
// 		id: 1,
// 		name: "Arto Hellas",
// 		number: "040-123456",
// 	},
// 	{
// 		id: 2,
// 		name: "Ada Lovelace",
// 		number: "39-44-5323523",
// 	},
// 	{
// 		id: 3,
// 		name: "Dan Abramov",
// 		number: "12-43-234345",
// 	},
// 	{
// 		id: 4,
// 		name: "Mary Poppendieck",
// 		number: "39-23-6423122",
// 	},
// ];

// function generateId() {
//     const randomId = Math.round(Math.random() * 9999999999);
//     return randomId;
// }

// Routes
app.get("/api/persons", (req, res) => {
    Person.find({}).then((people) => {
        res.json(people);
    });
});

app.get("/info", (req, res) => {
    const timeRequestSent = new Date().toString();

    Person.find({}).then((people) => {
        res.send(
            `
				<p>Phonebook has info for ${people.length} people</p>
				<p>${timeRequestSent}</p>
		   `
        );
    });
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find((person) => person.id.toString() === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404);
        res.json({
            error: "The person you are looking for was not found in the phonebook",
        });
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter((person) => person.id.toString() !== id);

    res.status(204).end();
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);

app.post("/api/persons/", (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: `${!body.name ? "name" : "number"} was missing`,
        });
    }

    const person = new Person({ ...body });

    person.save().then((savedPerson) => {
        res.json(savedPerson);
    });
});

const PORT = process.env.PORT;

app.listen(PORT);
console.log(`\n\n\nServer started in port ${PORT}`);
