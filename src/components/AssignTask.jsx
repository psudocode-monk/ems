import { useEffect, useState } from "react";
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

const AssignTask = ({ onTaskAssigned }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedUserId || !taskTitle.trim() || !taskDesc.trim()) {
      alert("Please fill all fields");
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === parseInt(selectedUserId)) {
        const newTask = {
          id: Date.now(),
          title: taskTitle,
          description: taskDesc,
          completed: false,
        };
        user.tasks = [...(user.tasks || []), newTask];
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    onTaskAssigned?.();

    setTaskTitle("");
    setTaskDesc("");
    setSelectedUserId("");
  };

  return (
    <motion.div
      className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] backdrop-blur-lg p-6 sm:p-8 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/[0.08]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
        variants={item}
      >
        Assign Task
      </motion.h2>

      <motion.form
        onSubmit={handleAssign}
        className="space-y-5"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm sm:text-base placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 transition-all duration-300"
          variants={item}
        >
          <option value="" className="bg-[#0a0a0a] text-zinc-400">
            Select user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id} className="bg-[#0a0a0a]">
              {user.name} ({user.email})
            </option>
          ))}
        </motion.select>

        <motion.input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 transition-all duration-300"
          variants={item}
        />

        <motion.textarea
          placeholder="Task description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 min-h-28 sm:min-h-32 transition-all duration-300"
          variants={item}
        />

        <motion.button
          type="submit"
          className="w-full py-3 rounded-xl border border-white/10 bg-emerald-500/20 text-zinc-100 text-sm sm:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 hover:bg-emerald-500/30 hover:shadow-[0_4px_24px_rgba(16,185,129,0.3)]"
          whileHover={{
            y: -2,
            scale: 1.03,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.6)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          variants={item}
        >
          Assign Task
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AssignTask;
