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
      className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h2
        className="text-xl font-semibold tracking-tight mb-4"
        variants={item}
      >
        Assign Task
      </motion.h2>

      <motion.form
        onSubmit={handleAssign}
        className="space-y-4"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          variants={item}
        >
          <option value="" className="bg-[#0a0a0a]">
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
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          variants={item}
        />

        <motion.textarea
          placeholder="Task description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 min-h-28"
          variants={item}
        />

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
          Assign Task
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AssignTask;
