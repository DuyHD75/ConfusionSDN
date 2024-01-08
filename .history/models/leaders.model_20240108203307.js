import mongoose from "mongoose";

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