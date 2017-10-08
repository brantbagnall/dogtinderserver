const axios = require('axios'),
    apiUrl = 'https://dog.ceo/api',
    low = require('lowdb'),
    Filesync = require('lowdb/adapters/Filesync'),
    adapter = new Filesync('db.json'),
    db = low(adapter);

    db.defaults({ 
        currentUser: 'default',
        currentId: 0,
        dog: {
            breed: 'none',
            link: 'none',
            user: 'default',
            id: 0
        },
        like: [],
        dislike: [],

     })
    .write();

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
            db.set('dog.user', db.get('currentUser').value()).write()
            db.set('dog.id', db.get('currentId').value()).write()
            db.set('currentId', db.get('currentId').value() + 1).write()
            return res.status(200).send(db.get('dog'));
        })     
    },
    getByBreed: function (req, res) {
        axios.get(`${apiUrl}/breed/${req.params.breed}/images/random`).then(e=> {
            
            db.set('dog.breed', req.params.breed).write();
            db.set('dog.link', e.data.message).write();
            db.set('dog.user', db.get('currentUser').value()).write()
            db.set('dog.id', db.get('currentId').value()).write()
            db.set('currentId',db.get('currentId').value() + 1).write()
            return res.status(200).send(db.get('dog'))
        });
    },
    getBySubBreed: function (req, res) {
        axios.get(`${apiUrl}/breed/${req.params.breed}/${req.params.sub}/images/random`).then(e=> {
            db.set('dog.breed', req.params.breed).write();
            db.set('dog.link', e.data.message).write();
            db.set('dog.user', db.get('currentUser').value()).write()
            db.set('dog.id', db.get('currentId').value()).write()
            db.set('currentId', db.get('currentId').value() + 1).write()
            return res.status(200).send(db.get('dog'))
    });
    },
    postList: function (req, res) {
        if (req.body.list === 'like') {
            var test = Object.assign({},db.get('dog').value());
            db.get('like').push(test).write();
            res.status(200).send(db.get('like'));
        } else {
            var test = Object.assign({},db.get('dog').value());
            db.get('dislike').push(test).write();
            res.status(200).send(db.get('dislike'));
        }
    },
    deleteById: function (req, res) {
        var deleteId =  req.params.id;
        var list = req.params.list;
        // console.log(deleteId);
        var dbLook = db.get(list).value();
        dbLook.map((curr, i, arr) => {
            if(curr.id == deleteId){
                arr.splice(i, 1);
            }
        })
        db.set(list, Object.assign({}, dbLook));
        return res.status(200).send(db.get(list));
    },
    breedList: function(req, res) {
        axios.get(apiUrl + '/breeds/list').then(e => res.status(200).send(e.data.message));
    },
    subList: function(req, res){
        axios.get(apiUrl + `/breed/${req.params.breed}/list`).then(e => res.status(200).send(e.data.message));
    },
    getLike: function(req, res){
        res.status(200).send(db.get('like').value())
    },
    getDislike: function(req, res) {
        res.status(200).send(db.get('dislike').value())
    }
    
}