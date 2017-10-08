const express = require('express'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    ctrl = require('./controllers/controller.js'),
    cors = require('cors'),
    app = express(),
    port = 3001;

    app.use(bodyParser.json());

    app.use(cors());

    app.use(express.static('./../../dogtinderclient/build'));
      
    app.get('/api/breedlist', ctrl.breedList);

    app.get('/api/like', ctrl.getLike);

    app.get('/api/dislike', ctrl.getDislike);

    app.get('/api/subList/:breed', ctrl.subList);

    app.get('/api/all', ctrl.getAllRandom);

    app.get('/api/:breed', ctrl.getByBreed);

    app.get('/api/:breed/:sub', ctrl.getBySubBreed);

    app.post('/api/list', ctrl.postList);

    app.delete('/api/delete/:list/:id', ctrl.deleteById);

app.listen(port, ()=> console.log(`listening on port ${port}`));