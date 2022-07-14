const { Schema, model } = require('mongoose');

const boardgameSchema = new Schema( 
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        genre: {
            type: String,
            required: true,
            trim: true
        },
        playTime: {
            type: Number,
            required: true,
            trim: true
        },
        playerCount: {
            type: Number,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            trim: true
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

const Boardgame = model('Boardgame', boardgameSchema);

module.exports = Boardgame