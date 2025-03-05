const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const get = new Schema({
    tableName: {
        type: String,
        required: true
    },
    data: {
        type: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    returnType: {
        type: [String],
        required: false
    },
});
    
const update = new Schema({
    tableName: {
        type: String,
        required: true
    },
    data: {
        type: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }
});

const add = new Schema({
    tableName: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

const Get = mongoose.model('Get', get);
const Update = mongoose.model('Update', update);
const Add = mongoose.model('Add', add);

class DataBaseModel {
    static get get() {
        return Get;
    }
    static get update() {
        return Update;
    }
    static get add() {
        return Add;
    }
}

module.exports = DataBaseModel;