const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(
  "mongodb://localhost:27017/sells_db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connection success!");
    } else {
      console.log("connection fail!" + JSON.stringify(err, undefined, 2));
    }
  }
);
