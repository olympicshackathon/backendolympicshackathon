'use strict';

const { Router, json } = require('express');
const debug = require('debug')('backend:pokemon-router');
const createError = require('http-errors');

// const Profile = require('../../model/user/profile.js');
// const User = require('../../model/user/user.js');
const Marker = require('../../model/pokemon/marker.js');
// const bearerAuth = require('../../lib/bearer-auth-middleware.js');

const mapRouter = module.exports = Router();

// add bearer auth
// gets markers
mapRouter.post("/getmarkers", json(), (req, res, next) => {
    debug('POST: /getmarkers');
    console.log('/getpoints');
    console.log('req.body: ', req.body, '\n');
    
    const { coordinates } = req.body;
    const message = !coordinates ? 'expected a coordinates' : null;

    console.log('coordinates: ', coordinates, '\n');
    if(message)
        return next(createError(400, `BAD REQUEST ERROR: ${message}`));

    Marker.find({ location: { $near: { $maxDistance: 1000, $geometry: { type: "Point", coordinates: [long, latt]}}}})
        .then(markers => {
            if(!markers)
                return next(createError(404, 'NOT FOUND ERROR: markers not found'));
            res.json(markers);
        })
        .catch(next);
    // Marker.find({ location: { $near: { $maxDistance: 1000, $geometry: { type: "Point", coordinates: [long, latt]}}}})
    //     .find((error, results) => {
    //         if (error) 
    //             console.log(error);
    //         console.log(JSON.stringify(results, 0, 2));
    //     });
});

// create markers
mapRouter.post("/savemarkers", json(), (req, res, next) => {
    debug('POST: /savemarkers');
    console.log('/savemarkers');
    console.log('req.body: ', req.body, '\n');

    const { name, type, location, photos } = req.body;
    const message = !name ? 'expected a name'
    : !type ? 'expected a type'
      : !location ? 'expected location'
        : !photos ? 'expected photos'
            : null;

    console.log('name: ', name, '\n', 'type: ', type, '\n', 'location: ', location, '\n', 'photos: ', photos, '\n');
    if(message)
        return next(createError(400, `BAD REQUEST ERROR: ${message}`));
    
    new Marker(req.body).save()
        .then(marker => res.json(marker))
        .catch(next);
});
