const path = require('path');
const express = require('express');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const guestRoutes = require('./routes/guest')
const mongoose = require('mongoose')
const { APP_PORT, DB_URL, SESSION_SECRET } = require('./config')
const auth = require('./middlewares/auth')
const admin = require('./middlewares/admin')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(expressSession({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    }
}))
app.use(flash())
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
    res.locals.role = null
    next()
}, guestRoutes)
app.use(userRoutes);
app.use('/admin', auth, admin, adminRoutes);



app.use(errorHandler);
app.use(errorController.get404)

async function connection() {
    try {
        await mongoose.connect(DB_URL)
        console.log('db connected')

        app.listen(APP_PORT, () => {
            console.log(`server started at ${APP_PORT}`)
        });
    } catch (err) {
        throw err
    }
}
connection()


