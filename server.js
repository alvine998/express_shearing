const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
    origin: "http://localhost:8081"
  };

  app.use(cors(corsOptions));

  app.use(express.urlencoded({ extended: true }));


// parse requests of content-type - application/json
app.use(bodyParser.json())


// define a simple route
app.get('/', (req, res) => {
    res.json(bcrypt.hash('hello'));
});

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// Require Notes routes
require('./app/routes/customer.routes.js')(app);
require('./app/routes/karyawan.routes.js')(app);
require('./app/routes/userlogin.routes.js')(app);
require('./app/routes/invoice.routes.js')(app);
require('./app/routes/order.routes.js')(app);
require('./app/routes/detailorder.routes.js')(app);
require('./app/routes/brokenmaterial.routes.js')(app);
require('./app/routes/images.routes')(app);

global.__basedir = __dirname;


// express to access file statics
const dirname = path.resolve();
app.use("/resources/static/assets/uploads/", express.static(path.join(dirname, "/resources/static/assets/uploads/")));

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});