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
      className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-zinc-100 p-4 sm:p-6 md:p-10 overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sticky top-0 z-10 backdrop-blur-2xl bg-[#0a0a0a]/80 border-b border-white/10 px-4 py-4 rounded-b-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        variants={item}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">
            Hello {user?.name || "User"} 👋
          </h1>
          <p className="text-sm text-zinc-400">
            Welcome to your personal task board
          </p>
        </div>

        <motion.button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 px-5 py-2.5 rounded-xl border border-emerald-400/20 bg-emerald-500/20 text-zinc-100 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 hover:bg-emerald-500/30 hover:shadow-[0_4px_24px_rgba(16,185,129,0.3)]"
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Logout
        </motion.button>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-xl sm:text-2xl font-semibold tracking-tight mb-4 border-b border-white/10 pb-2"
        variants={item}
      >
        Your Assigned Tasks
      </motion.h2>

      {/* Empty State */}
      {!user?.tasks || user.tasks.length === 0 ? (
        <motion.p
          className="text-zinc-400 text-base sm:text-lg italic mt-6 text-center"
          variants={item}
        >
          No tasks assigned yet. Sit tight! 🚀
        </motion.p>
      ) : (
        <motion.div
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-sm sm:text-base text-left">
              <thead className="bg-emerald-500/10 text-emerald-200 uppercase tracking-wide">
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
                  <th className="px-4 py-3 border-b border-white/10 font-medium text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <motion.tbody
                className="divide-y divide-white/10"
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                {user.tasks.map((task, index) => (
                  <motion.tr
                    key={task.id}
                    variants={item}
                    className="transition-all duration-300 hover:bg-emerald-500/10 hover:backdrop-blur-md"
                    style={{ transformOrigin: "center" }}
                  >
                    <td className="px-4 py-3 text-zinc-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-zinc-100 whitespace-nowrap">
                      {task.title}
                    </td>
                    <td className="px-4 py-3 text-zinc-300 break-words max-w-[300px]">
                      {task.description}
                    </td>
                    <td className="px-4 py-3">
                      {task.completed ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs sm:text-sm font-medium text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1 text-xs sm:text-sm font-medium text-zinc-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span>
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!task.completed ? (
                        <motion.button
                          onClick={() => handleMarkAsDone(task.id)}
                          className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-emerald-400/20 bg-emerald-500/20 text-emerald-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 hover:bg-emerald-500/30 hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                          whileHover={{ y: -1, scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Mark as Done
                        </motion.button>
                      ) : (
                        <span className="text-emerald-400 text-lg">✅</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserDashboard;
