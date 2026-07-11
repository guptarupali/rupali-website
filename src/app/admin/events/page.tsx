"use client"
import { useEffect, useState } from "react"

export default function EventsAdminPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: "", description: "", role: "", linkedin_url: "" })
  const [editId, setEditId] = useState("")

  const load = () => {
    fetch("/api/admin/events").then(r => r.json()).then(d => setEvents(d.events || [])).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!form.name) { alert("Name is required"); return }
    const res = await fetch("/api/admin/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    if (res.ok) { setForm({ name: "", description: "", role: "", linkedin_url: "" }); load() }
    else alert("Failed to add")
  }

  const saveEdit = async (ev: any) => {
    await fetch("/api/admin/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(ev) })
    setEditId(""); load()
  }

  const remove = async (id: string, name: string) => {
    if (!confirm("Delete " + name + "?")) return
    await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setEvents(events.filter((e) => e.id !== id))
  }

  const updateLocal = (id: string, field: string, val: string) => setEvents(events.map((e) => e.id === id ? { ...e, [field]: val } : e))

  const input = { padding: "10px", background: "#1a1a1a", border: "1px solid #333", color: "#fff", borderRadius: "4px", width: "100%" }
  const btn = { padding: "10px 16px", background: "#C9A24B", color: "#000", border: "none", borderRadius: "4px", fontWeight: "bold" as const, cursor: "pointer" }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Speaking Engagements</h1>
      <div style={{ display: "grid", gap: "10px", marginTop: "24px", padding: "20px", background: "#1a1a1a", borderRadius: "8px" }}>
        <input placeholder="Event name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={input} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={input} />
        <input placeholder="Role (e.g. Keynote, Panelist)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={input} />
        <input placeholder="LinkedIn URL (optional)" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} style={input} />
        <button onClick={add} style={btn}>+ Add Engagement</button>
      </div>
      <div style={{ marginTop: "30px", display: "grid", gap: "12px" }}>
        {loading ? <p>Loading...</p> : events.map((ev) => (
          <div key={ev.id} style={{ padding: "16px", background: "#1a1a1a", borderRadius: "6px" }}>
            {editId === ev.id ? (
              <div style={{ display: "grid", gap: "8px" }}>
                <input value={ev.name} onChange={(e) => updateLocal(ev.id, "name", e.target.value)} style={input} />
                <input value={ev.description || ""} onChange={(e) => updateLocal(ev.id, "description", e.target.value)} style={input} />
                <input value={ev.role || ""} onChange={(e) => updateLocal(ev.id, "role", e.target.value)} style={input} />
                <input value={ev.linkedin_url || ""} onChange={(e) => updateLocal(ev.id, "linkedin_url", e.target.value)} style={input} />
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => saveEdit(ev)} style={btn}>Save</button>
                  <button onClick={() => { setEditId(""); load() }} style={{ background: "transparent", border: "1px solid #666", color: "#999", padding: "8px 14px", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "15px" }}>{ev.name}</h3>
                  <p style={{ margin: "2px 0", color: "#C9A24B", fontSize: "13px" }}>{ev.role}</p>
                  <p style={{ margin: 0, color: "#ccc", fontSize: "14px" }}>{ev.description}</p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button onClick={() => setEditId(ev.id)} style={{ background: "transparent", border: "1px solid #C9A24B", color: "#C9A24B", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => remove(ev.id, ev.name)} style={{ background: "transparent", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
