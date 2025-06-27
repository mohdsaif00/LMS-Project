import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ age: "", state: "", qualification: "" });

  useEffect(() => {
    axios.get("/api/user/profile", { headers: { Authorization: localStorage.getItem("token") } })
      .then(res => {
        setUser(res.data);
        setForm({
          age: res.data.age || "",
          state: res.data.state || "",
          qualification: res.data.qualification || ""
        });
      });
  }, []);

  const handleUpdate = () => {
    axios.put("/api/user/profile", form, {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow">
      <div className="flex items-center gap-4">
        <img src="/default-avatar.png" className="w-16 h-16 rounded-full" />
        <button className="text-blue-500">Change</button>
      </div>
      <p><b>Full Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>

      {editMode ? (
        <>
          <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="Age" />
          <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} placeholder="State" />
          <input value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} placeholder="Qualification" />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <p><b>Age:</b> {user.age || "Not set"}</p>
          <p><b>State:</b> {user.state || "Not set"}</p>
          <p><b>Qualification:</b> {user.qualification || "Not set"}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Profile;