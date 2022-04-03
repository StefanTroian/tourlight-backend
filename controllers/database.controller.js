"use strict"
const CONSTANTS = require("../config/constants");

const get = async function (req, res) {
    try {
        
        let posts = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).find({}).toArray();

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

module.exports = {
    get,
}