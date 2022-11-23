const mongoose = require('mongoose');
const url = 'mongodb+srv://defaultUser:default123@cluster0.okwpj.mongodb.net/yad2yokra?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected successfully to MongoDB!'))
    .catch(err => console.error('Something went wrong', err))
