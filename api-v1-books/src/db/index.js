import Sequelize from 'sequelize';
import Book from '../models/book'
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.DB_HOST;

const makeDb = async () => {

    const sequelize = await new Sequelize(host, {logging: false})

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    sequelize.sync()
    
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.Book = Book(sequelize, Sequelize);

    return db;
}


export default makeDb;