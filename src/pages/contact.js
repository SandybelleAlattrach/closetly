import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
  "https://closetly-production-83da.up.railway.app/api/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }
);

 

      if (res.ok) {
        alert("Message sent 💖");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message 😢");
      }
    } catch (err) {
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>💌 Contact</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send 💖"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
