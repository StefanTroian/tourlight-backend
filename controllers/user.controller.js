"use strict"

const { uuid } = require('uuidv4');
const CONSTANTS = require("../config/constants");

// GET for /api/tourlight/users
const getAllUsers = async function (req, res) {
    try {
        
        let users = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).find({}).toArray();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// GET for /api/tourlight/users/:id
const getUserById = async function (req, res) {
    try {
        
        let user = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).findOne({ 'id': req.params.id });

        res.status(200).json(user);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// POST for /api/tourlight/users/:id
const createUser = async function (req, res) {
    try {

        const id = uuid();
        const user = { id, ...req.body, dateCreated: new Date() }

        let userAlreadyExists = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).findOne({ 'email': user.email });
        
        // Check if user exists
        if (userAlreadyExists) {
            return res.status(200).send({
                message: `User already exists.`
            })
        }

        await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).insertOne(user);

        res.status(201).send({
            message: `User inserted successfully.`
        }) 

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// PUT for /api/tourlight/users/:id
const updateUser = async function (req, res) {
    try {

        let user = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).findOne({ 'id': req.params.id });
        
        // Check if user exists
        if (!user) {
            return res.status(500).send({
                message: `User not found.`
            })
        }
        
        // updatedUser is now the union of user and req.body. Properties in user will be replaced with those from req.body
        const updatedUser = { ...user, ...req.body };
        await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).replaceOne({ 'id': req.params.id }, updatedUser );

        res.status(200).send({
            message: `User updated successfully.`
        })

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// DELETE for /api/tourlight/users/:id
const deleteUser = async function (req, res) {
    try {

        let user = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).findOne({ 'id': req.params.id });
        
        // Check if user exists
        if (!user) {
            return res.status(500).send({
                message: `User not found!`
            })
        }
        
        await global.DATABASE.collection(CONSTANTS.Databases.Collections.Users).deleteOne({ 'id': req.params.id });

        res.status(200).send({
            message: `User deleted successfully.`
        }) 
    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}