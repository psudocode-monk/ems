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

const UserTasks = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (!loggedInUser || loggedInUser.role !== "user") return;

    const currentUser = allUsers.find((u) => u.email === loggedInUser.email);
    if (currentUser) {
      setUser(currentUser);
      setTasks(currentUser.tasks || []);
    }
  }, []);

  const toggleCompletion = (taskId) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = allUsers.map((u) => {
      if (u.email === user.email) {
        u.tasks = u.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      }
      return u;
    });

    const updatedUser = updatedUsers.find((u) => u.email === user.email);

    setTasks(updatedUser.tasks);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <motion.div
      className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-xl font-semibold tracking-tight mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-zinc-400">No tasks assigned yet.</p>
      ) : (
        <motion.ul
          className="space-y-4"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                task.completed
                  ? "bg-white/10 border-white/15"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
              variants={item}
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium tracking-tight">
                    {task.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{task.description}</p>
                </div>
                <motion.button
                  onClick={() => toggleCompletion(task.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 border ${
                    task.completed
                      ? "border-white/10 bg-white/10 text-zinc-100"
                      : "border-white/10 bg-transparent text-zinc-200 hover:bg-white/10"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20`}
                  whileHover={{
                    scale: 1.03,
                    y: -1,
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.08), 0 16px 30px rgba(0,0,0,0.55)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  {task.completed ? "Completed" : "Mark Done"}
                </motion.button>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default UserTasks;
