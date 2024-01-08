import mongoose from "mongoose";

var leaderSchema = new mongoose.Schema({
     name: {
          type: String,
          require: true,
          unique: true
     },
     image: {
          type: String,
          require: true,
     },
     designation: {
          type: String,
          require: true,
     },
     abbr: {
          type: String,
          require: true,
     },
     description: {
          type: String,
          require: true,
     },
     feature: {
          type: String,
          default: false,
     },
}, {
     timestamps: true
});

var Leaders = mongoose.model("Leaders", leaderSchema);
export default 