'use strict';

const debug = require('debug')('olympics:server-toggle');
const mongoose = require('mongoose');

module.exports = exports = {};

exports.serverOn = (server, done) => {
    if (!server.isRunning) {
        server.listen(process.env.PORT, () => {
            server.isRunning = true;
            debug('I was running - Forest Gump');
            done();
        });
        return;
    }
    done();
};

exports.serverOff = (server, done) => {
    if (server.isRunning) {
        server.close(err => {
            if (err)
                return done(err);
            server.isRunning = false;
            mongoose.connection.close();
            debug('server is dizzizown');
            done();
        });
        return;
    }
    done();
};