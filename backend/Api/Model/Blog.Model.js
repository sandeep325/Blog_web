const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      email: {
        type: String,
        maxlength: 50,
        required: true,
        // unique: true,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
      description:{
        type:String,
        required:true
      }
});

module.exports = mongoose.model("Blog",BlogSchema);