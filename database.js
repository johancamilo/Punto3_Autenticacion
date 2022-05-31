const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usuariosapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('SUCCESSFUL CONNECTION TO THE DATABASE '))
.catch(err => console.error(err));