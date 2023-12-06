import passport from 'passport';
import UserCheme from "../models/user";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
const GOOGLE_CLIENT_ID = '1071385775528-p81aqbr7544c6b74tt108c4tq8lmhcer.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';


passport.use(new GoogleStrategy({
  clientID: '1071385775528-p81aqbr7544c6b74tt108c4tq8lmhcer.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"],
  passReqToCallback: true,
}, async (request, accessToken, refreshToken, profile, done) => {
  try
  {
    const user = await UserCheme.findOne({ authGoogleId: profile.id, authType: "google" });
    if (user) {
      return done(null, user);
    }
    const newUser = new UserCheme({
      authType: 'google',
      authGoogleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      img: profile.picture
    })
    await newUser.save()
     done(null, newUser);

  } catch (error)
  {
    done(error, false)
  }
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
