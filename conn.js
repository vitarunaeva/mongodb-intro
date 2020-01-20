const m	= require('mongoose');

m.Promise = global.Promise;

const conn = m.createConnection('mongodb+srv://user:user@cluster0-lwvqu.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new m.Schema({
        "login": {
            "type": "string"
        },
        "password": {
            "type": "string"
        }
    }, {"collection": "userlist"}
);

const User = conn.model( null, UserSchema );

module.exports.User = User;
