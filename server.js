// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express" );
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// CORS issues
const cors = require('cors')
app.use(cors())
app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });

// logging the requests
const morgan = require("morgan");
app.use(morgan("dev"));

// DB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/summit_broomball", { autoIndex: false});
const db = mongoose.connection

// handle mongo errors
db.on("error", console.error.bind(console,"Connection error"));
db.once("open", () => console.log("connected to the DB collection 'summit_broomball'") )


// db.games.insert({date: 2018-07-20});

// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    }

// Routes
// =============================================================
const routes = require("./routes")
app.use(routes);

app.listen(PORT, function() {
    console.log("Server.js listening on: http://localhost:" + PORT);
});