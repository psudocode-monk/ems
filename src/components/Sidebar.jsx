import { motion } from "framer-motion";

const Sidebar = ({ role, onNavigate }) => {
  const links =
    role === "admin"
      ? [
          { label: "Users", key: "users" },
          { label: "Assign Task", key: "assign" },
          { label: "Task Overview", key: "overview" },
        ]
      : [{ label: "My Tasks", key: "tasks" }];

  return (
    <motion.aside
      className="w-64 min-h-screen fixed left-0 top-0 bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] flex flex-col"
      initial={{ x: -80, opacity: 0, filter: "blur(8px)" }}
      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-xl font-semibold tracking-tight p-5 border-b border-white/10 bg-white/5 backdrop-blur-md rounded-br-2xl">
        {role === "admin" ? "Admin Panel" : "User Panel"}
      </div>

      <ul className="flex-1 p-4 space-y-2">
        {links.map((link, index) => (
          <motion.li
            key={link.key}
            onClick={() => onNavigate(link.key)}
            className="cursor-pointer rounded-xl px-4 py-2 bg-transparent border border-transparent text-zinc-300 transition-all duration-300 hover:text-zinc-100 hover:bg-white/10 hover:border-white/10"
            whileHover={{ x: 4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 18,
              delay: index * 0.05,
            }}
          >
            {link.label}
          </motion.li>
        ))}
      </ul>

      <div className="p-4 border-t border-white/10 text-xs text-zinc-500 tracking-wide">
        <p>© {new Date().getFullYear()} Task Manager</p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
