require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");



const Orders = mongoose.Schema({
  dateandtime : {type: Date, default: Date.now},
  name: {type: String},
  color: {type: String},
  featuredImage: {type: String},
});




const productSchema = mongoose.Schema({
    dateandtime : {type: Date, default: Date.now},
    name: {type: String, required: true},
    countInStock: {type: Number},
    image: {type: String},
    price: {type: Number},
    category: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Category',
               required: true
            },
    rating: {type: Number},
    orders: [Orders],
    isFeatured: {
              type: Boolean,
              default: false
            },
    description: {type: String},
    numberOfReviews: {type: String},
    status: {type: String}
});


productSchema.virtual('id').get(function() {
  return this._id.toHexString();
})

productSchema.set('toJSON', {
    virtual: true,
  })


module.exports = {
  Products: mongoose.model("Products", productSchema ),
}
