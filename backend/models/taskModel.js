//defining the schema in our resource

//initialize the db
const mongoose = require("mongoose");

//create a schema of a task like type required with objects or plain string and use timestamp after the {} similar to useeffect dependency
const taskSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "please add text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
