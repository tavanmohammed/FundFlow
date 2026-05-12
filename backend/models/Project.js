import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name:String,
  donor:String,
  budget:Number,
  startDate:Date,
  endDate:Date
});

export default mongoose.model("Project", projectSchema);