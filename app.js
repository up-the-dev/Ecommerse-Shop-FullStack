const path = require('path');
const express = require('express');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoose = require('mongoose')
const { APP_PORT, DB_URL } = require('./config')
const errorHandler = require('./middlewares/errorHandler')

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
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


