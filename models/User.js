const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre: { type: String, trim: true },
    apellido: { type: String, trim: true },
    celular: { type: String, trim: true },
    correo: { type: String, required: true },
    password: { type: String, required: true },
    genero: { type: String, trim: true },
    ciudad: { type: String, trim: true },
    date: { type: Date, default: Date.now },
})

//Ciframos contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);  //generar la contraseña cifrada
    return await bcrypt.hash(password, salt);  //obtenemos la contraseña cifrada
  };
  
  
  UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);//validar la contraseña que sse ingresa con la cifrada en la db
  };


module.exports = mongoose.model('User', UserSchema);
