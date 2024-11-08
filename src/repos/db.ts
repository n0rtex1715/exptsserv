import { timeStamp } from "console";
import { DataTypes } from "sequelize";

const { Sequelize } = require('sequelize')

// Init db
const sequelize = new Sequelize('sqlite::memory:')
const queryInterface = sequelize.getQueryInterface();

// Check connection
async function CheckConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to DB estabilished successfully');
    } catch (e) {
        console.log('Unable to connect to DB: ', e);
    }
}

/*
MODELS
*/

// Model: User
const User = sequelize.define(
    'User',
    {
        // attrs
        id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { 
        // options
        freezeTableName: true,
        timeStamp: true,
        updatedAt: false,
        createdAt: 'created', // custom createdAt field
    },
);

/*
METHODS
*/

// Create table 'User'
async function CreateTableUser(mode?: string) {
    if (mode === "force") {
        await User.sync({ force: true });
        console.log('User table was created with force;');
        return;
    }
    if (mode === "alter") {
        await User.sync({ alter: true });
        console.log('User table was created with alter;')
        return;
    }
    User.sync();
    console.log('User table was created with default;');
};

// Delete table 'User'
async function DeleteTableUser() {
    await User.drop();
    console.log('Table `User` was deleted');
}

