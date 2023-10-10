const BlogSchema = require("../models/blogModel");
const schema = require("../validators/blogvalidator");
const STATUSCODE = require("http-status-codes");
const bcrypt = require("bcryptjs");

const CreateUsersAccount = async (req, res) => {
  const { username, password } = req.body;

  const { error } = schema(req.body);

  if (error) {
    return res.status(STATUSCODE.BAD_REQUEST).json({
      message: error,
    });
  }

  try {
    const userExist = await BlogSchema.findOne({ username });
    if (userExist) {
      return res.status(STATUSCODE.CONFLICT).json({
        message: "Username already exist",
      });
    }
    const hashedPassword = bcrypt.hash(password);
    const User = BlogSchema.create({
      username,
      password: hashedPassword,
    });
    return res.status(STATUSCODE.OK).json({
      message: "User Registered Succesfully",
      user: User,
    });
  } catch (error) {
    return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

const retrieveAllBlogPost = async (req, res) => {
  try {
    const posts = await BlogSchema.find({}, "post_id content");

    return res.status(STATUSCODE.OK).json({
      post: posts,
    });
  } catch (error) {
    return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
      message: "internal server error",
    });
  }
};

const createPost = async (req, res) => {
  const { post_id, content } = req.body;

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(STATUSCODE.BAD_REQUEST)
      .json({ message: error.details[0].message });
  }

  try {
    const post = BlogSchema.create({
      content: value,
      user: post_id,
    });

    return res.json(post);
  } catch (error) {
    return res
      .status(STATUSCODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getSinglePostByID = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await BlogSchema.findById({ id }, "user_id, content");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const UpdatePostByID = async (req, res) => {
  const { id } = req.params;
  const { user_id, content } = req.body;

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(STATUSCODE.BAD_REQUEST).json({ message: error.message });
  }

  try {
    const post = await BlogSchema.findByIdAndUpdate(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    return res.json({
      post
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePostByID = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await BlogSchema.findByIdAndUpdate(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the authenticated user owns the post
    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }};

const getAllUserProfile = async (req, res) => {
  try {
    const users = await BlogSchema.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }};

const getSpecificUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await BlogSchema.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } return res.json(user);
} catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
}};

const updateSpecificUserProfile = async (req, res) => {
const { id } = req.params;
const { username, email } = req.body;

const {error} = schema.validate(req.body)

try {
  const user = await BlogSchema.findByIdAndUpdate(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the authenticated user matches the profile being updated
  if (user._id.toString() !== req.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  // Update the user profile
  if (username) user.username = username;

  return res.json(user);
} catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
}
res
  .status(200)
  .send("update specific user is working user profile is working");
};

module.exports = {
createPost,
updateSpecificUserProfile,
getSpecificUserProfile,
deletePostByID,
getAllUserProfile,
UpdatePostByID,
getSinglePostByID,
retrieveAllBlogPost,
CreateUsersAccount,
};
