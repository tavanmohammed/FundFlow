import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  projectId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Project"
  },
  category:String,
  amount:Number,
  description:String,
  date:{
    type:Date,
    default:Date.now
  }
});

export default mongoose.model("Expense", expenseSchema);