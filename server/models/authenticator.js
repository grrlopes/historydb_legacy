const mongoose = require("mongoose");

const { Schema } = mongoose;

const authSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "I am new here", required: true },
    commands: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
