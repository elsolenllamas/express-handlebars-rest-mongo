var mongoose = require('mongoose');  
var ProductSchema = new mongoose.Schema({  
  name: String,
  size: Number,
  color: String
});
mongoose.model('Product', ProductSchema);