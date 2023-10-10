const express = require("express");
const {
    createPost,
    updateSpecificUserProfile,
    getSpecificUserProfile,
    deletePostByID,
    getAllUserProfile,
    UpdatePostByID,
    getSinglePostByID,
    retrieveAllBlogPost,
    CreateUsersAccount,
} = require("../controllers/blogSchema")


const  usersLogin = require("../controllers/login")
const verifyToken = require("../middlewares/jwt-auth")

const routes = express.Router();

routes.route("/api/auth/register").post(CreateUsersAccount)
routes.route("/api/auth/login").post( usersLogin )
routes.route("/api/posts").get(retrieveAllBlogPost).post(createPost)
routes.route("/api/posts/:id").get(getSinglePostByID).put(UpdatePostByID).delete(deletePostByID)
routes.route("/api/users").get(getAllUserProfile)
routes.route("/api/users/:id").get(getSpecificUserProfile).put(updateSpecificUserProfile).delete( retrieveAllBlogPost)


module.exports = routes