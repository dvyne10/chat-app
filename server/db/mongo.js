const mongoose = require("mongoose");
const config = require("../config.json");

mongoose.connect(config.mongoConfig.connectionUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});
