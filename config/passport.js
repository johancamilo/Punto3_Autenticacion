const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


passport.use(
    new LocalStrategy(
      {
        usernameField: "correo",
      },
      async (correo, password, done) => {
        // Match correo User
        const user = await User.findOne({ correo: correo });
  
        if (!user) {
          return done(null, false, { message: "Not User found." });
        } else {
          // Match Password's User
          const match = await user.matchPassword(password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect Password." });
          }
        }
      }
    )
);


passport.serializeUser((user, done) => {   //se almacena las sesion en el id
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => { //toma el id y genera el ususario
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });