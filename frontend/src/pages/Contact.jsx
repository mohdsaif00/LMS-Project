import { useState } from 'react';
import { handleError, handleSuccess } from '../utils/handleMessage';

function Contact() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = contactData;

    if (!name || !email || !message) {
      return handleError("All fields are required");
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
      });

      const data = await response.json();
      const { success, message: msg } = data;

      if (success) {
        handleSuccess(msg);
        setContactData({ name: '', email: '', message: '' });
      } else {
        handleError(msg);
      }
    } catch (error) {
      handleError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-1">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center">Contact Us</h2>
          <p className="text-sm text-center text-gray-600">We’d love to hear from you!</p>

          <div>
            <label className="block font-semibold" htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={contactData.name} onChange={handleChange} required />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={contactData.email} onChange={handleChange} required />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Your message..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={contactData.message} onChange={handleChange} required />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;