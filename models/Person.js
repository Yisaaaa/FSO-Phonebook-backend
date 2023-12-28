const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
    .connect(url)
    .then((result) => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.log("Failed connecting to MongoDB:", err.message));

const numberValidator = (number) => {
    const [firstSplit, secondSplit] = number.split("-");
    if (isNaN(firstSplit) || isNaN(secondSplit)) {
        return false;
    }
    const firstSplitLength = firstSplit.length;
    const secondSplitLength = secondSplit.length;

    const isValid = firstSplitLength === 2 || firstSplitLength === 3;

    return number.includes("-") && isValid;
};

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: (value) => {
                return numberValidator(value);
            },
            message: (props) => `${props.value} is not a valid number`,
        },
        required: true,
    },
});

personSchema.set("toJSON", {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    },
});

module.exports = mongoose.model("Person", personSchema);
