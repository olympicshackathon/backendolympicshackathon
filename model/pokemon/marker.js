const mongoose = require('mongoose');
const debug = require('debug')('backend:marker');

const markerSchema = mongoose.Schema(
{
    name: { type: String, required: true },
    type: { type: String, required: true },
    location:
    {
        type: { type: String, default:'Point' },
        coordinates: [ Number ],
        // geometry: { coordinates: { type: [ Number ],  index: '2dsphere', required: true }, },
    },
    photos: [ String ],
},
    {
        timestamps: true,
    }
);

markerSchema.index({ location: "2dsphere" });

const Marker = module.exports = mongoose.model('marker', markerSchema);