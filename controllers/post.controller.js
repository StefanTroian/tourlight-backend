"use strict"

const { uuid } = require('uuidv4');
const CONSTANTS = require("../config/constants");

// // GET for /api/tourlight/posts
// const getAllPosts = async function (req, res) {
//     try {
        
//         let posts = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).find({}).toArray();

//         res.status(200).json(posts);

//     } catch (error) {
//         res.status(500).send({
//             message: `Server error ${error}`
//         })
//     }
// }

// GET for /api/tourlight/posts
const getPostsLength = async function (req, res) {
    try {
        
        let postsLength = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).count();

        res.status(200).json(postsLength);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// GET for /api/tourlight/posts/uid/:id
const getPostsByUID = async function (req, res) {
    try {
        
        let posts = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).find({ 'useruid': req.params.id }).toArray();

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// GET for /api/tourlight/posts/likes/:id
const getPostsByLikes = async function (req, res) {
    try {
        
        let posts = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).find({ 'likes': req.params.id }).toArray();

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// GET for /api/tourlight/posts/:limit
const getAllPosts = async function (req, res) {
    try {
        let limit = parseInt(req.params.limit)
        let maxLimit = limit;

        let postsLength = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).count();
        
        if (limit > postsLength) {
            maxLimit = postsLength;    
        }
        let posts = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).find().sort({$natural:-1}).skip(limit - 3).limit(maxLimit).toArray();

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// GET for /api/tourlight/posts/id/:id
const getPostById = async function (req, res) {
    try {
        
        let post = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).findOne({ 'id': req.params.id });

        res.status(200).json(post);

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// POST for /api/tourlight/posts/:id
const createPost = async function (req, res) {
    try {

        const id = uuid();
        const post = { id, ...req.body, dateCreated: new Date() }

        await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).insertOne(post);

        res.status(201).send({
            message: `Post inserted successfully.`
        }) 

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// PUT for /api/tourlight/posts/:id
const updatePost = async function (req, res) {
    try {

        let post = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).findOne({ 'id': req.params.id });
        
        // Check if post exists
        if (!post) {
            return res.status(500).send({
                message: `Post not found!`
            })
        }
        
        // updatedPost is now the union of post and req.body. Properties in post will be replaced with those from req.body
        const updatedPost = { ...post, ...req.body };
        await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).replaceOne({ 'id': req.params.id }, updatedPost );

        res.status(200).send({
            message: `Post updated successfully.`
        }) 

    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

// DELETE for /api/tourlight/posts/:id
const deletePost = async function (req, res) {
    try {

        let post = await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).findOne({ 'id': req.params.id });
        
        // Check if post exists
        if (!post) {
            return res.status(500).send({
                message: `Post not found!`
            })
        }
        
        await global.DATABASE.collection(CONSTANTS.Databases.Collections.Posts).deleteOne({ 'id': req.params.id });

        res.status(200).send({
            message: `Post deleted successfully.`
        }) 
    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

module.exports = {
    getPostsLength,
    getPostsByUID,
    getPostsByLikes,
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}