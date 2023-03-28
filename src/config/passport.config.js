import passport from "passport"
import UserModel from "../models/user.model.js"
import GitHubStrategy from 'passport-github2'

const initializePassport = () => {

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.48e162ac72468e5f",
        clientSecret: "b663359a5d984e602ecfd38fd1759f110c867107",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(profile)
        
        try {
            const user = await UserModel.findOne({ email: profile._json.email})
            if (user) {
                return done(null, user)
            }
            const newUser = await UserModel.create({
                first_name: profile._json.name,
                last_name: "",
                email: profile._json.email
            })
            return done(null, newUser)
        } catch(error) {
            return done('Error to login with github')
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}

export default initializePassport