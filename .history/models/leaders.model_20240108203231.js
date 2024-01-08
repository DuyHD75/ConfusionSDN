import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema({
     username: {
          type: String, 
          require: true, 
          unique: true
     }
})