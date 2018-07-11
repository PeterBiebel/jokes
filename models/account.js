const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String,
    jokes: Array,

});

//account = Account.create({username: "blah", password: "asdfad", jokes: ["bradeh"]});
//account.set("jokes", account.jokes.concat(newJoke));

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
