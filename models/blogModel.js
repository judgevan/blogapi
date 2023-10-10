const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required:  [true, 'please post_id required'],
    unique: true,
    trim: true
  },
  content:{
    type: String,
    required: [true, 'please content required'],
    unique: true,
    trim: true,
    minLenght: [20, "post body must not be less than 20 characters"]
  },
  post_Author:{
    type: String,
    default: "judge",
    unique: true,
    trim: true
  },
  post_createdDate:{
    type: Date,
    default: new Date().toLocaleString(),
    unique: true,
    trim: true
  },
  allow_comments: {
    type: Boolean,
    unique: true,
    trim: true,
  },

  require_approval: {
    type: Boolean,
    default: false,
    unique: true,
    trim: true,
  },

  post_url: {
    type: String,
    unique: true,
    trim: true,
  },

  shared_message: {
    type: String,
    unique: true,
    trim: true,
  },

  seo_title: {
    type: String,
    unique: true,
    trim: true,
  },

  seo_description: {
    type: String,
    unique: true,
    trim: true,
  },

  tags: [ {
      type: String,
      unique: true,
      trim: true,
      default: "posts",
    },
  ],

  commenting_system: {
    type: String,
    default: "default",
    unique: true,
    trim: true,
  },

  created_date: {
    type: Date,
    unique: true,
    trim: true,
  },

  updated_date: {
    type: Date,
    unique: true,
    trim: true,
  },

  date_format: {
    type: String,
    default: "j/n/y",
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);


// schema is wat we want to achieve with what we are building; so d logic comes from the plans u hv fr d business