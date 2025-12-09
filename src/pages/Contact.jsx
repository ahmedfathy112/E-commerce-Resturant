import React, { useState } from "react";
import ShopHeroSection from "../components/HeroForSections";
import {
  FaUser,
  FaPhoneAlt,
  FaTag,
  FaRegComment,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple submit placeholder
    console.log("Contact submit", form);
    // reset
    setForm({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="w-full">
      <ShopHeroSection SecondLink={"contact"} />

      <section className="w-full max-w-4xl !mx-auto !px-4 md:!px-6 !py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#111] bg-opacity-60 rounded-2xl !p-6 md:!p-8 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <label className="relative">
              <span className="sr-only">Name</span>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                <FaUser />
              </div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ahmed Fathy"
                className="w-full !pl-12 !pr-3 !py-3 rounded-lg bg-transparent border-2 border-white/60 text-white placeholder-white/50 focus:outline-none"
                required
              />
            </label>

            {/* Phone */}
            <label className="relative">
              <span className="sr-only">Phone</span>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                <FaPhoneAlt />
              </div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+201 060 733 679"
                className="w-full !pl-12 !pr-3 !py-3 rounded-lg bg-transparent border-2 border-white/60 text-white placeholder-white/50 focus:outline-none"
                inputMode="tel"
              />
            </label>

            {/* Subject */}
            <label className="relative">
              <span className="sr-only">Subject</span>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                <FaTag />
              </div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full !pl-12 !pr-3 !py-3 rounded-lg bg-transparent border-2 border-white/60 text-white placeholder-white/50 focus:outline-none"
              />
            </label>
          </div>

          {/* Message */}
          <label className="relative w-full">
            <span className="sr-only">Message</span>
            <div className="absolute right-4 top-4 text-red-500">
              <FaRegComment />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows={6}
              className="w-full !pr-12 !pl-4 !py-4 rounded-lg bg-transparent border-2 border-white/60 text-white placeholder-white/50 focus:outline-none resize-none"
              required
            />
          </label>

          {/* Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>{/* optional info */}</div>

            <button
              type="submit"
              className="flex items-center gap-3 bg-transparent border-2 border-white/80 text-white !px-6 !py-3 rounded-lg hover:bg-red-600 hover:border-red-600 transition"
            >
              <FaPaperPlane />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contact;
