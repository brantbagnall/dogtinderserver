const express = require('express'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    ctrl = require('./controllers/controller.js'),
    app = express(),
    port = 3001;

    app.use(bodyParser.json());

    app.use(express.static('./../../dogtinderclient/public'));

    app.get('/api/all', ctrl.getAllRandom);

    app.get('/api/:breed', ctrl.getByBreed);

    app.get('/api/:breed/:sub', ctrl.getBySubBreed)

app.listen(port, ()=> console.log(`listening on port ${port}`));