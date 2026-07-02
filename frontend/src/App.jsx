import { useState } from "react";

const API = "http://127.0.0.1:8000/api/v1";

export default function App() {

  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [notes, setNotes] = useState([]);

  const [msg, setMsg] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");

  const [editingId, setEditingId] = useState(null);

  async function register() {

    const r = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reg),
    });

    const d = await r.json();

    if (r.ok) {

      setMsg("✅ User Registered Successfully");

      setReg({
        name: "",
        email: "",
        password: "",
      });

    } else {

      if (d.detail === "Email already exists") {
        setMsg("❌ Email already exists. Please Login.");
      } else {
        setMsg("❌ Registration Failed");
      }

    }
  }

  async function loginUser() {

    const r = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const d = await r.json();

    if (d.access_token) {

      localStorage.setItem("token", d.access_token);

      setLoggedIn(true);

      setUserName(login.email);

      setMsg("✅ Login Successful");

      setLogin({
        email: "",
        password: "",
      });

      loadNotes();

    } else {

      setMsg("❌ Invalid Email or Password");

    }

  }

  async function logout() {

    localStorage.removeItem("token");

    setLoggedIn(false);

    setUserName("");

    setNotes([]);

    setEditingId(null);

    setNote({
      title: "",
      content: "",
    });

    setMsg("👋 Logged Out Successfully");

  }

  async function createNote() {

    const token = localStorage.getItem("token");

    const r = await fetch(`${API}/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(note),
    });

    const d = await r.json();

    if (r.ok) {

      setMsg("✅ Note Created Successfully");

      setNote({
        title: "",
        content: "",
      });

      loadNotes();

    } else {

      setMsg(d.detail || "Failed");

    }

  }

  async function updateNote() {

    const token = localStorage.getItem("token");

    const r = await fetch(`${API}/notes/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(note),
    });

    if (r.ok) {

      setMsg("✅ Note Updated Successfully");

      setEditingId(null);

      setNote({
        title: "",
        content: "",
      });

      loadNotes();

    }

  }

  async function deleteNote(id) {

    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this note?")) return;

    const r = await fetch(`${API}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (r.ok) {

      setMsg("✅ Note Deleted Successfully");

      loadNotes();

    }

  }

  async function loadNotes() {

    const token = localStorage.getItem("token");

    const r = await fetch(`${API}/notes/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const d = await r.json();

    if (r.ok) {

      setNotes(d);

      setMsg(`✅ Loaded ${d.length} Notes`);

    } else {

      setMsg(d.detail || "Failed");

    }

  }
    const card = {
    maxWidth: "750px",
    margin: "30px auto",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.15)",
    fontFamily: "Arial, sans-serif",
  };

  const input = {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  const button = {
    padding: "10px 18px",
    marginRight: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const greenButton = {
    ...button,
    background: "#16a34a",
  };

  const orangeButton = {
    ...button,
    background: "#f59e0b",
  };

  const redButton = {
    ...button,
    background: "#dc2626",
  };

  return (
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div style={card}>

        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            margin: 0,
            fontSize: "38px",
          }}
        >
          Notes Management System
        </h1>

        {loggedIn && (
          <h3
            style={{
              textAlign: "center",
              color: "#166534",
              marginTop: "15px",
            }}
          >
            👋 Welcome, {userName}
          </h3>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            padding: "10px",
            borderRadius: "6px",
            background: msg
              ? msg.startsWith("✅")
                ? "#dcfce7"
                : "#fee2e2"
              : "transparent",
            color: msg.startsWith("✅")
              ? "#166534"
              : "#dc2626",
            fontWeight: "bold",
          }}
        >
          {msg}
        </p>

        {loggedIn && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <button
              style={redButton}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}

        <hr />

        <h2>Register</h2>

        <input
          style={input}
          placeholder="Name"
          value={reg.name}
          onChange={(e) =>
            setReg({
              ...reg,
              name: e.target.value,
            })
          }
        />

        <input
          style={input}
          placeholder="Email"
          value={reg.email}
          onChange={(e) =>
            setReg({
              ...reg,
              email: e.target.value,
            })
          }
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={reg.password}
          onChange={(e) =>
            setReg({
              ...reg,
              password: e.target.value,
            })
          }
        />

        <button
          style={button}
          onClick={register}
        >
          Register
        </button>

        <hr />

        <h2>Login</h2>

        <input
          style={input}
          placeholder="Email"
          value={login.email}
          onChange={(e) =>
            setLogin({
              ...login,
              email: e.target.value,
            })
          }
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={(e) =>
            setLogin({
              ...login,
              password: e.target.value,
            })
          }
        />

        <button
          style={button}
          onClick={loginUser}
        >
          Login
        </button>

        <hr />
                <h2>
          {editingId ? "Update Note" : "Create Note"}
        </h2>

        <input
          style={input}
          placeholder="Title"
          value={note.title}
          onChange={(e) =>
            setNote({
              ...note,
              title: e.target.value,
            })
          }
        />

        <textarea
          style={{
            ...input,
            height: "100px",
          }}
          placeholder="Content"
          value={note.content}
          onChange={(e) =>
            setNote({
              ...note,
              content: e.target.value,
            })
          }
        />

        {editingId ? (
          <button
            style={orangeButton}
            disabled={!loggedIn}
            onClick={updateNote}
          >
            Update Note
          </button>
        ) : (
          <button
            style={{
              ...button,
              opacity: loggedIn ? 1 : 0.5,
              cursor: loggedIn ? "pointer" : "not-allowed",
            }}
            disabled={!loggedIn}
            onClick={createNote}
          >
            Create Note
          </button>
        )}

        <button
          style={{
            ...greenButton,
            opacity: loggedIn ? 1 : 0.5,
            cursor: loggedIn ? "pointer" : "not-allowed",
          }}
          disabled={!loggedIn}
          onClick={loadNotes}
        >
          Load Notes
        </button>

        <hr />

        <h2>Your Notes</h2>

        {notes.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#777",
            }}
          >
            No Notes Found
          </p>
        ) : (
          notes.map((n) => (
            <div
              key={n.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                background: "#fafafa",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#2563eb",
                }}
              >
                {n.title}
              </h3>

              <p>{n.content}</p>

              <button
                style={orangeButton}
                onClick={() => {
                  setEditingId(n.id);

                  setNote({
                    title: n.title,
                    content: n.content,
                  });

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                ✏️ Edit
              </button>

              <button
                style={redButton}
                onClick={() => deleteNote(n.id)}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}