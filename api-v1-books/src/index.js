import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import makeCallback from './helpers/express-callback'
import handleOptionRequest from './helpers/handle-option-request'
import {
    bookController
} from './controllers'


dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/*', handleOptionRequest)

app.all('/books', makeCallback(bookController))
app.all('/books/:isbn', makeCallback(bookController))

app.listen(port, () => {
    console.log(`Service project config is listening on port ${port}`)
})
