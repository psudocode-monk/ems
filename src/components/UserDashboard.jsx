import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const currentUser = users.find((u) => u.email === loggedInUser?.username);
    setUser(currentUser);
  }, []);

  const handleMarkAsDone = (taskId) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => {
      if (u.email === user.email) {
        const updatedTasks = u.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: true } : t
        );
        return { ...u, tasks: updatedTasks };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    const updatedUser = updatedUsers.find((u) => u.email === user.email);
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <motion.div
      className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 relative"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="flex justify-between items-center mb-6 sticky top-0 z-10 backdrop-blur-lg bg-[#0a0a0a]/70 border-b border-white/10 px-2 py-4 rounded-b-2xl"
        variants={item}
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">
            Hello {user?.name || "User"} 👋
          </h1>
          <p className="text-sm text-zinc-400">Welcome to your dashboard</p>
        </div>

        <motion.button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl border border-white/10 bg-white/10 text-zinc-100 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          whileHover={{
            y: -2,
            scale: 1.05,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.6)",
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Logout
        </motion.button>
      </motion.div>

      <motion.h2
        className="text-xl font-semibold tracking-tight mb-4 border-b border-white/10 pb-2"
        variants={item}
      >
        Your Assigned Tasks
      </motion.h2>

      {!user?.tasks || user.tasks.length === 0 ? (
        <motion.p className="text-zinc-400 text-lg" variants={item}>
          No tasks assigned yet.
        </motion.p>
      ) : (
        <motion.div
          className="overflow-x-auto rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)] border border-white/10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 border-b border-white/10 font-medium">
                  #
                </th>
                <th className="px-4 py-3 border-b border-white/10 font-medium">
                  Title
                </th>
                <th className="px-4 py-3 border-b border-white/10 font-medium">
                  Description
                </th>
                <th className="px-4 py-3 border-b border-white/10 font-medium">
                  Status
                </th>
                <th className="px-4 py-3 border-b border-white/10 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {user.tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className="bg-transparent transition-all duration-300 hover:bg-white/5"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-zinc-100">
                    {task.title}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {task.description}
                  </td>
                  <td className="px-4 py-3">
                    {task.completed ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-200"></span>
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1 text-xs font-medium text-zinc-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span>
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!task.completed ? (
                      <motion.button
                        onClick={() => handleMarkAsDone(task.id)}
                        className="px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/10 text-zinc-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                        whileHover={{
                          y: -2,
                          scale: 1.03,
                          boxShadow:
                            "0 0 0 1px rgba(255,255,255,0.08), 0 16px 30px rgba(0,0,0,0.55)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        }}
                      >
                        Mark as Done
                      </motion.button>
                    ) : (
                      <span className="text-zinc-300 text-xl">✅</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserDashboard;
