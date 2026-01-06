import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(
        "https://closetly-nstg.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent 💖");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "Error");
      }
    } catch (error) {
      setStatus("Server error");
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

          <button type="submit">Send 💖</button>
        </form>

        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}

export default Contact;
