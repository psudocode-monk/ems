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
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h2
        className="text-xl font-semibold tracking-tight mb-4"
        variants={item}
      >
        Create New User
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          variants={item}
        />

        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          variants={item}
        />

        <motion.select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
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
          className="w-full py-2 rounded-xl border border-white/10 bg-white/10 text-zinc-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          whileHover={{
            y: -2,
            scale: 1.02,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.6)",
          }}
          whileTap={{ scale: 0.99 }}
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
