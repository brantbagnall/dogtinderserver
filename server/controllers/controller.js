const axios = require('axios'),
    apiUrl = 'https://dog.ceo/api',
    low = require('lowdb'),
    Filesync = require('lowdb/adapters/Filesync'),
    adapter = new Filesync('db.json'),
    db = low(adapter);

    db.defaults({ 
        currentUser: 'none',
        dog: {
            breed: 'none',
            link: 'none',
            user: 'none'
        },

     })
    .write()

module.exports = {
    getAllRandom: function (req, res){
        axios.get(apiUrl + '/breeds/image/random').then(e =>{ 
            var breed = e.data.message.replace('https://dog.ceo/api/img/', '');
            breed = breed.substring(0, breed.indexOf("/"));
            if(breed.indexOf("-") >= 0){
                breed = breed.substring(0, breed.indexOf("-"))
            }
            db.set('dog.breed', breed).write();
            db.set('dog.link', e.data.message).write();
            db.set('dog.user', db.get('currentUser').value())
            return res.status(200).send(db.get('dog'));
        })     
    },
    getByBreed: function (req, res) {
        axios.get(`${apiUrl}/breed/${req.params.breed}/images/random`).then(e=> {
            
            db.set('dog.breed', req.params.breed).write();
            db.set('dog.link', e.data.message).write();
            db.set('dog.user', db.get('currentUser').value())
            return res.status(200).send(db.get('dog'))
        });
    },
    getBySubBreed: function (req, res) {
        axios.get(`${apiUrl}/breed/${req.params.breed}/${req.params.sub}/images/random`).then(e=> {
            db.set('dog.breed', req.params.breed).write();
            db.set('dog.link', e.data.message).write();
            db.set('dog.user', db.get('currentUser').value())
            return res.status(200).send(db.get('dog'))
    });
    },
    postLike: function (req, res) {
        
    },
    postDislike: function (req, res) {
        
    }
}