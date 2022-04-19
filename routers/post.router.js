"use strict"

const express = require("express");
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/post.controller");

const router = express.Router({
    mergeParams: true
})

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;