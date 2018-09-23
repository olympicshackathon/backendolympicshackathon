'use strict';

const Router = require('express').Router;
const morgan = require('morgan');
const cors = require('cors');

const bindResponseMethods = require('./../lib/bind-response-methods.js');
const authRouter = require('./user/auth-router.js');
const profileRouter = require('./user/profile-router.js');
const errors = require('./../lib/error-middleware.js');

modules.exports = new Router()
    .use([
        cors({
            credentials: true,
            origin: process.env.CORS_ORIGINS,
        }),
        morgan('dev'),
        bindResponseMethods,
        authRouter,
        profileRouter,
        errors,
    ]);