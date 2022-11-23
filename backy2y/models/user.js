const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function (plaintext, encryptedPass) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintext, encryptedPass, function (err, res) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(res);

        })
    })
};

// module.exports = new mongoose.model('User', userSchema);
module.exports.User = mongoose.model('User', userSchema);