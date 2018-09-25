'use strict';

const { Router, json } = require('express');
const debug = require('debug')('backend:pokemon-router');
const createError = require('http-errors');

// const Profile = require('../../model/user/profile.js');
// const User = require('../../model/user/user.js');
const Pokemon = require('../../model/user/pokemon.js');
const bearerAuth = require('../../lib/bearer-auth-middleware.js');

const pokemonRouter = module.exports = Router();


pokemonRouter.post("/getpoints", json(), (req, res, next) => {
    debug('POST: /getpoints');
    console.log('/getpoints');
    
    const { name, type, coordinates, photos } = req.body;
    const message = !name ? 'expected a name'
    : !type ? 'expected a type'
      : !coordinates ? 'expected coordinates'
        : !photos ? 'expected photos'
            : null;

    console.log('req.body: ', req.body, '\n');
    console.log('name: ', name, '\n', 'type: ', type, '\n', 'coordinates: ', coordinates, '\n', 'photos: ', photos, '\n', );
    if(message)
        return next(createError(400, `BAD REQUEST ERROR: ${message}`));
    
    new Pokemon(req.body).save()
        .then(marker => res.json(marker))
        .catch(next);
});

pokemonRouter.post("/savemarkers", json(), (req, res, next) => {
    debug('POST: /savemarkers');
    console.log('/savemarkers');

    const { name, type, coordinates, photos } = req.body;
    const message = !name ? 'expected a name'
    : !type ? 'expected a type'
      : !coordinates ? 'expected coordinates'
        : !photos ? 'expected photos'
            : null;

    console.log('req.body: ', req.body, '\n');
    console.log('name: ', name, '\n', 'type: ', type, '\n', 'coordinates: ', coordinates, '\n', 'photos: ', photos, '\n', );
    if(message)
        return next(createError(400, `BAD REQUEST ERROR: ${message}`));
    
    new Pokemon(req.body).save()
        .then(marker => res.json(marker))
        .catch(next);
});

app.post("/savemarkers", (req, res)=> {

    debug("/savemarkers called: ", JSON.stringify(req.body));
    let response = {error: false, msg: "", result: null};
    console.log('/savemarkers');
    req.body.points.forEach(p=> {
        p.location.coordinates[0] = parseFloat(p.location.coordinates[0]);
        p.location.coordinates[1] = parseFloat(p.location.coordinates[1]);
    });

    db.markers.insert(req.body.points, (err, docs)=> {
        if (err) {
            response.error = true;
            response.msg = err;
        } else {
            response.result = docs;
        }

        res.json(response);
    })
});
// get current users profile
// http GET :3000/api/profiles/currentuser 'Authorization:Bearer TOKEN'
profileRouter.get('/api/profiles/currentuser', bearerAuth, (req, res, next) => {
  Profile.findOne({userID: req.user._id})
    .then(profile => {
      if(!profile)
        return next(createError(404, 'NOT FOUND ERROR: profile not found'));
      res.json(profile);
    })
    .catch(next);
});

// update profile
// http PUT :3000/api/profile/:profileID 'Authorization:Bearer TOKEN' username='new username'
profileRouter.put('/api/profile/:profileID', bearerAuth, json(), (req, res, next) => {
  debug('PUT: /api/profile:profileID');

  req.body.lastLogin = new Date();
  Profile.findByIdAndUpdate(req.params.profileID, req.body, {new: true, runValidators: true})
    .then(myProfile => {
      if(!myProfile)
        return next(createError(404, 'NOT FOUND ERROR: profile not found'));
        
      let usernameObj = {username: myProfile.username };
      User.findByIdAndUpdate(myProfile.userID, usernameObj, {runValidators: true})
        .then(() => res.json(myProfile))
        .catch(next);
    })
    .catch(next);
});