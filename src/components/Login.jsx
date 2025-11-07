import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { SiReact } from "react-icons/si";

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
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-zinc-100 px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.form
        onSubmit={handleLogin}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl bg-white/[0.04] backdrop-blur-lg border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.4)] space-y-6 transition-all duration-300 hover:bg-white/[0.08]"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold text-center tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
          variants={item}
        >
          Welcome Back
        </motion.h2>
        <motion.p
          className="text-center text-zinc-400 text-sm sm:text-base"
          variants={item}
        >
          Sign in to continue managing your workspace
        </motion.p>

        {/* Username */}
        <motion.div className="flex flex-col gap-2" variants={item}>
          <label
            htmlFor="username"
            className="text-zinc-400 text-sm sm:text-base"
          >
            Name
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30 focus-visible:border-emerald-400/40 transition-all duration-200"
            placeholder="Enter your name"
          />
        </motion.div>

        {/* Role */}
        <motion.div className="flex flex-col gap-2" variants={item}>
          <label htmlFor="role" className="text-zinc-400 text-sm sm:text-base">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30 focus-visible:border-emerald-400/40 transition-all duration-200"
          >
            <option value="admin" className="bg-[#0a0a0a]">
              Admin
            </option>
            <option value="user" className="bg-[#0a0a0a]">
              User
            </option>
          </select>
        </motion.div>

        {/* Button */}
        <motion.button
          type="submit"
          className="w-full py-2.5 sm:py-3 rounded-xl border border-white/10 bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-zinc-100 font-medium text-sm sm:text-base transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
          whileHover={{
            y: -2,
            scale: 1.03,
            background:
              "linear-gradient(to right, rgba(16,185,129,0.4), rgba(5,150,105,0.3))",
            boxShadow:
              "0 0 15px rgba(16,185,129,0.3), 0 20px 40px rgba(0,0,0,0.6)",
          }}
          whileTap={{ scale: 0.97 }}
          variants={item}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          Login
        </motion.button>

        {/* Footer Note */}
        <motion.div
          className="flex items-center justify-center gap-2 pt-2 text-center text-xs sm:text-sm text-zinc-500"
          variants={item}
        >
          <motion.span className="text-emerald-200 font-medium">
            Made with ❤ and
          </motion.span>

          <motion.a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 6,
            }}
          >
            <SiReact className="text-lg sm:text-xl" />
          </motion.a>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
