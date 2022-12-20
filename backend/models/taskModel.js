//defining the schema in our resource

//initialize the db
const mongoose = require("mongoose");

//create a schema of a task like type required with objects or plain string and use timestamp after the {} similar to useeffect dependency
const taskSchema = mongoose.Schema(
  {
    //To authenticate the user and referencing the UserSchema for the information about user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
