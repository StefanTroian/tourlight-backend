"use strict"

const { uuid } = require('uuidv4');
const CONSTANTS = require("../config/constants");

// GET for /api/tourlight/locations
const getTopLocations = async function (req, res) {
    try {
        
        let locations = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Locations).find({}).sort({ "freq": -1 }).limit(3).toArray();

        res.status(200).json(locations);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// POST for /api/tourlight/locations
const createLocation = async function (req, res) {
    try {

        let locationFound = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Locations).findOne({ 'location_name': req.body.location_name });
        
        if (locationFound) {
            locationFound.freq = locationFound.freq + 1;
            const updatedLocation = { ...locationFound, ...req.body };
       
            await global.DATABASE.collection(CONSTANTS.Databases.Collections.Locations).replaceOne({ 'id': locationFound.id }, updatedLocation);

            res.status(200).send({
                message: `Location updated successfully.`
            }) 
        } else {
            const id = uuid();
            const location = { id, ...req.body, freq: 1, dateCreated: new Date() }
    
            await global.DATABASE.collection(CONSTANTS.Databases.Collections.Locations).insertOne(location);
    
            res.status(201).send({
                message: `Location inserted successfully.`
            }) 
        }

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// DELETE for /api/tourlight/locations/:id
const deleteLocation = async function (req, res) {
    try {

        let location = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Locations).findOne({ 'id': req.params.id });
        
        // Check if post exists
        if (!location) {
            return res.status(500).send({
                message: `Location not found!`
            })
        }
        
        await global.DATABASE.collection(CONSTANTS.Databases.Collections.Locations).deleteOne({ 'id': req.params.id });

        res.status(200).send({
            message: `Location deleted successfully.`
        }) 
    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

module.exports = {
    getTopLocations,
    createLocation,
    deleteLocation
}