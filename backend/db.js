const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rite2379:1234567890@mern.jhljjdu.mongodb.net/todos"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
