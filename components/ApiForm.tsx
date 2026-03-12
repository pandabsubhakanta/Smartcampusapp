"use client";

import { useState } from "react";

type Props = {
  endpoint: string;
  fields: Array<{ name: string; label: string; type?: string }>;
  onSuccess?: () => void;
};

export default function ApiForm({ endpoint, fields, onSuccess }: Props) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const payload: Record<string, string | number> = {};
    for (const key of Object.keys(form)) {
      const numeric = Number(form[key]);
      payload[key] = Number.isNaN(numeric) || form[key].trim() === "" ? form[key] : numeric;
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setMessage(res.ok ? "Saved successfully" : data.error || "Request failed");
    if (res.ok) {
      setForm({});
      onSuccess?.();
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="mb-1 block text-sm text-slate-300">{field.label}</label>
          <input
            type={field.type ?? "text"}
            value={form[field.name] ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
            required
          />
        </div>
      ))}
      <button className="bg-indigo-600 text-white" type="submit">
        Save
      </button>
      {message && <p className="text-sm text-slate-300">{message}</p>}
    </form>
  );
}
