const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("Provide your password as an argument");
	process.exit(1);
}

const pass = process.argv[2];

const url = `mongodb+srv://ryansanisit19:${pass}@fso-notes.s097f27.mongodb.net/Person?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
	getAll();
} else if (process.argv.length === 5) {
	add();
} else {
	console.log("Provide the correct arguments");
	console.log(
		"If you are adding a person, be sure to include the name and number"
	);
	process.exit(1);
}

function getAll() {
	// code to get all
	console.log("phonebook");
	Person.find({}).then((result) => {
		result.forEach((person) => console.log(person.name, person.number));
		mongoose.connection.close();
	});
}

function add() {
	// code to add a person
	const name = process.argv[3];
	const number = process.argv[4];

	const person = new Person({
		name,
		number,
	});

	person.save().then((result) => {
		console.log(
			`added ${result.name} number ${result.number} to phonebook`
		);

		mongoose.connection.close();
	});
}
