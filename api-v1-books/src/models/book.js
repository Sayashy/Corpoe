export default (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {

        isbn: {

            type: Sequelize.STRING,

            allowNull: false

        },

        name: {

            type: Sequelize.STRING,

            allowNull: false

        },

        author: {

            type: Sequelize.STRING,

            allowNull: false

        },

        release_date: {

            type: Sequelize.DATEONLY,

            allowNull: false

        }
    },
        {
            tableName: 'books',
            freezeTableName: true,	//prevent sequelize from pluralizing table names
            timestamps: false,
            underscored: false,
        }
    );

    return Book;
};