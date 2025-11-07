import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 16, scale: 0.98, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
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

const Login = () => {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }

    const userData = { username, role };
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    if (role === "admin") navigate("/admin/dashboard");
    else navigate("/user/dashboard");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-zinc-100"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.form
        onSubmit={handleLogin}
        className="w-96 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] space-y-6 transition-all duration-300 hover:bg-white/10"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-2xl font-semibold text-center tracking-tight"
          variants={item}
        >
          Login
        </motion.h2>

        <motion.div className="flex flex-col gap-2" variants={item}>
          <label htmlFor="username" className="text-zinc-400">
            Name
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            placeholder="Your name"
          />
        </motion.div>

        <motion.div className="flex flex-col gap-2" variants={item}>
          <label htmlFor="role" className="text-zinc-400">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <option value="admin" className="bg-[#0a0a0a]">
              Admin
            </option>
            <option value="user" className="bg-[#0a0a0a]">
              User
            </option>
          </select>
        </motion.div>

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
          variants={item}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Login;
