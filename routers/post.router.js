"use strict"

const express = require("express");
const {
    getAllPosts,
    getPostsByUID,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostsLength,
    getPostsByLikes
} = require("../controllers/post.controller");

const router = express.Router({
    mergeParams: true
})

router.get("/", getPostsLength);
router.get("/uid/:id", getPostsByUID);
router.get("/likes/:id", getPostsByLikes);
router.get("/:limit", getAllPosts);
router.get("/id/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;