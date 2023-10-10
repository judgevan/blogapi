const Blog = require("../models/blogModel");
const schema = require("../validators/blogschemavalidator");

const STATUSCODE = require("http-status-codes");
const bcrypt = require("bcryptjs");

const CreateUserAccount = async (req, res) => {
  const { username, password } = req.body;
  const { error } = schema(req.body);
  const { generatetoken } = require("../middlewares/authentication");

  if (error) {
    return res.status(STATUSCODE.BAD_REQUEST).json({
      message: error.message,
    });
  }

  try {
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(STATUSCODE.UNAUTHORIZED).json({
        message: "invalid username or password",
      });
    }

    const hashpassword = bcrypt.hash(password);
    const User = Blog.create({
      username,
      password: hashpassword,
    });

    return res.status(STATUSCODE.OK).json({
      message: "user registered successfully",
      user: User,
    });
  } catch (err) {
    return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
      message: "internal server error",
    });
  }
};
