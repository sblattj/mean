var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes); //order of middleware important

//httpe://localhost:8080/api/users

mongoose.connect('mongodb://localhost:27017/tutorial', function(err) {
    if (err) {
        console.log('not connected to the database: ' + err);
    }
    else {
        console.log('connected to mgdb');
    }
});


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// app.listen(port, function() {
//     console.log('running the server on port ' + port);
// });

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});