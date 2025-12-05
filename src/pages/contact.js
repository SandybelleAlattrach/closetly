import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Heyyyy! I think you like your Outfit!  Let your style shine always, you deserve it💖');
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full p-2 border rounded" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}

export default Contact;
