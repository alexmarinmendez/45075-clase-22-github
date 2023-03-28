import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import sessionRouter from './routes/session.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import mongoose from 'mongoose'

const app = express()
const MONGO_URL = "mongodb://localhost:27017"
const MONGO_DB_NAME = "clase22"

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/session', sessionRouter)

app.get('/', (req, res) => res.send({ path: 'HOME', session: req.user }))

mongoose.set('strictQuery')

try {
    await mongoose.connect(MONGO_URL, { dbName: MONGO_DB_NAME})
    console.log('DB Connected!')
    app.listen(8080, console.log('Server Up!'))
} catch (err) {
    console.log('No db connected!')
}
