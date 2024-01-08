import mongoose from "mongoose";

var commentsSchema = mongoose.Schema({
     rating: {
          type: Number,
          min: 1,
          max: 5,
          require: true
     },
     comment: {
          type: String,
          require: true
     },
     author: {
          type: String,
          require: true
          // type: mongoose.Schema.Types.ObjectId,
          // ref: 'user'
     }
});


const leaderSchema = new mongoose.Schema({
     name: {
          type: String,
          require: true,
          unique: true
     },
     description: {
          type: String,
          require: true,
     },
     image: {
          type: String,
          require: true,
     },
     category: {
          type: String,
          require: true,
     },
     label: {
          type: String,
          default: '',
     },
     price: {
          type: Currency,
          require: true,
          min: 0
     },
     feature: {
          type: String,
          default: false,
     },
     comments: [commentsSchema]
})