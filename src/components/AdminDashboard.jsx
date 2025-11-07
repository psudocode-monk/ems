import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CreateUser from "./CreateUser";
import AssignTask from "./AssignTask";
import AdminTaskOverview from "./AdminTaskOverview";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const pageVariants = {
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
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("users");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // ✅ Add sidebar state

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userData || userData.role !== "admin") navigate("/login");

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setUsers(storedUsers);
    setTasks(storedTasks);
  }, [navigate]);

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const assignTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.setItem("tasks", JSON.stringify([]));
    const clearedUsers = users.map((u) => ({ ...u, tasks: [] }));
    setUsers(clearedUsers);
    localStorage.setItem("users", JSON.stringify(clearedUsers));
  };

  return (
    <motion.div
      className="flex min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-zinc-100 overflow-x-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      {/* ✅ Sidebar with working toggle */}
      <Sidebar
        role="admin"
        onNavigate={(section) => {
          setActiveSection(section);
          setIsOpen(false);
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeSection={activeSection}
      />

      <motion.div
        className="flex-1 md:ml-64 ml-0 p-4 sm:p-6 md:p-8 transition-all duration-300"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* ✅ Header with toggle button for mobile */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sticky top-0 z-10 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10 px-3 sm:px-6 py-4 rounded-b-2xl shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          variants={item}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Hello {JSON.parse(localStorage.getItem("loggedInUser"))?.username}{" "}
              👋
            </h1>
          </div>
          <LogoutButton />
        </motion.div>

        {/* ✅ Content Box */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-4 sm:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-white/[0.08]"
          variants={item}
          whileHover={{ y: -2 }}
        >
          {activeSection === "users" && (
            <motion.div variants={item}>
              <CreateUser users={users} addUser={addUser} />
            </motion.div>
          )}

          {activeSection === "assign" && (
            <motion.div variants={item}>
              <AssignTask users={users} assignTask={assignTask} />
            </motion.div>
          )}

          {activeSection === "overview" && (
            <>
              <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4"
                variants={item}
              >
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Task Overview
                </h2>
                <motion.button
                  onClick={clearAllTasks}
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-white/10 bg-white/10 text-zinc-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 hover:bg-white/20"
                  whileHover={{
                    y: -2,
                    scale: 1.03,
                    boxShadow:
                      "0 0 15px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.6)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  Clear All Tasks
                </motion.button>
              </motion.div>

              <motion.div variants={item}>
                <AdminTaskOverview tasks={tasks} users={users} />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
