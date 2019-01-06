const mongoose = require('mongoose');
const {database} = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then(bd = console.log('bd is connected'))
    .catch(err => console.log(err));