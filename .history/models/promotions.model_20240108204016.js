import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
     name: {
          type: String,
          require: true,
          unique: true
     },
     image: {
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
     }

}, {
     timestamps: true
})