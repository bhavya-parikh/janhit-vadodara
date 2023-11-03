const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://bhavyaparikh0:${process.env.DB_Pass}@cluster0.hhshlfk.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
