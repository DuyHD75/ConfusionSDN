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
          type: Number,
          require: true,
          min: 0
     },
     feature: {
          type: String,
          default: false,
     }
}, {
     timestamps: true
});

const Promotions = mongoose.model(""promotionSchema);

export default Promotions;