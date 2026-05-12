import { useEffect, useState } from "react";
import "./index.css";

const API = "https://fundflow-ai.onrender.com/api";

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [projectForm, setProjectForm] = useState({
    name: "",
    donor: "",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const [expenseForm, setExpenseForm] = useState({
    projectId: "",
    category: "",
    amount: "",
    description: "",
  });

  const loadData = async () => {
    const dashRes = await fetch(`${API}/dashboard`);
    const projectRes = await fetch(`${API}/projects`);
    const expenseRes = await fetch(`${API}/expenses`);

    setDashboard(await dashRes.json());
    setProjects(await projectRes.json());
    setExpenses(await expenseRes.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  const addProject = async (e) => {
    e.preventDefault();

    await fetch(`${API}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...projectForm,
        budget: Number(projectForm.budget),
      }),
    });

    setProjectForm({
      name: "",
      donor: "",
      budget: "",
      startDate: "",
      endDate: "",
    });

    loadData();
  };

  const addExpense = async (e) => {
    e.preventDefault();

    await fetch(`${API}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...expenseForm,
        amount: Number(expenseForm.amount),
      }),
    });

    setExpenseForm({
      projectId: "",
      category: "",
      amount: "",
      description: "",
    });

    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">FundFlow AI</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card title="Total Projects" value={dashboard?.totalProjects || 0} />
        <Card title="Total Budget" value={`$${dashboard?.totalBudget || 0}`} />
        <Card title="Total Expenses" value={`$${dashboard?.totalExpenses || 0}`} />
        <Card title="Remaining Budget" value={`$${dashboard?.remainingBudget || 0}`} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <section className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Create Project</h2>

          <form onSubmit={addProject} className="space-y-3">
            <input className="input" placeholder="Project name" value={projectForm.name}
              onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} />

            <input className="input" placeholder="Donor name" value={projectForm.donor}
              onChange={(e) => setProjectForm({ ...projectForm, donor: e.target.value })} />

            <input className="input" placeholder="Budget" type="number" value={projectForm.budget}
              onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })} />

            <button className="btn">Add Project</button>
          </form>
        </section>

        <section className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Add Expense</h2>

          <form onSubmit={addExpense} className="space-y-3">
            <select className="input" value={expenseForm.projectId}
              onChange={(e) => setExpenseForm({ ...expenseForm, projectId: e.target.value })}>
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>

            <input className="input" placeholder="Category" value={expenseForm.category}
              onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} />

            <input className="input" placeholder="Amount" type="number" value={expenseForm.amount}
              onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} />

            <input className="input" placeholder="Description" value={expenseForm.description}
              onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} />

            <button className="btn">Add Expense</button>
          </form>
        </section>
      </div>

      <section className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        {projects.map((p) => (
          <p key={p._id} className="border-b py-2">
            <b>{p.name}</b> — {p.donor} — ${p.budget}
          </p>
        ))}
      </section>

      <section className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Expenses</h2>
        {expenses.map((e) => (
          <p key={e._id} className="border-b py-2">
            <b>{e.category}</b> — ${e.amount} — {e.projectId?.name}
          </p>
        ))}
      </section>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

export default App;
