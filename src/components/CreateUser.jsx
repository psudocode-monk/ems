import { useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 16, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const CreateUser = ({ onUserCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("All fields are required");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      tasks: [],
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setName("");
    setEmail("");
    setRole("user");

    onUserCreated?.(newUser);
  };

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-xl p-6 sm:p-8 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/[0.08]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h2
        className="text-2xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent"
        variants={item}
      >
        Create New User
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 transition-all duration-300 hover:bg-white/[0.08]"
          variants={item}
        />

        <motion.input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 transition-all duration-300 hover:bg-white/[0.08]"
          variants={item}
        />

        <motion.select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 transition-all duration-300 hover:bg-white/[0.08]"
          variants={item}
        >
          <option value="user" className="bg-[#0a0a0a]">
            User
          </option>
          <option value="admin" className="bg-[#0a0a0a]">
            Admin
          </option>
        </motion.select>

        <motion.button
          type="submit"
          className="w-full py-3 rounded-xl border border-white/10 bg-emerald-500/20 text-emerald-100 font-medium text-base transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 hover:bg-emerald-500/30 hover:shadow-[0_4px_24px_rgba(16,185,129,0.3)]"
          whileHover={{
            y: -2,
            scale: 1.03,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          variants={item}
        >
          Add User
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default CreateUser;
