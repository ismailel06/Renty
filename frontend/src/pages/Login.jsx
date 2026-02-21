import { useState } from "react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", role: "client" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ ...form, id: 1 });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="client">Client</option>
          <option value="provider">Provider</option>
        </select>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}