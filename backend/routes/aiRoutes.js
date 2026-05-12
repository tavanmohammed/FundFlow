import express from "express";
import OpenAI from "openai";
import Project from "../models/Project.js";
import Expense from "../models/Expense.js";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const projects = await Project.find();
    const expenses = await Expense.find();

    const prompt = `
    Projects: ${JSON.stringify(projects)}
    Expenses: ${JSON.stringify(expenses)}

    Answer this finance question:
    ${question}
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;