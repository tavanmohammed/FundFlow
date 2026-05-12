import express from "express";
import Project from "../models/Project.js";
import Expense from "../models/Expense.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    const expenses = await Expense.find();

    const totalBudget = projects.reduce(
      (sum, project) => sum + project.budget,
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const remainingBudget = totalBudget - totalExpenses;

    res.json({
      totalProjects: projects.length,
      totalBudget,
      totalExpenses,
      remainingBudget
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;