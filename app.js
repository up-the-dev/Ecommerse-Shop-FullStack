const path = require('path');
const express = require('express');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoose = require('mongoose')
const { APP_PORT, DB_URL, SESSION_SECRET } = require('./config')
const auth = require('./middlewares/auth')
const admin = require('./middlewares/admin')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true
    }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', auth, admin, adminRoutes);
app.use(shopRoutes);

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


