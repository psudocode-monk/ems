import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Sidebar = ({ role, onNavigate, isOpen, setIsOpen, activeSection }) => {
  const links =
    role === "admin"
      ? [
          { label: "Users", key: "users" },
          { label: "Assign Task", key: "assign" },
          { label: "Task Overview", key: "overview" },
        ]
      : [{ label: "My Tasks", key: "tasks" }];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        initial={false}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5 backdrop-blur-md rounded-br-2xl">
          <h2 className="text-lg font-semibold tracking-tight">
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-zinc-400 hover:text-zinc-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="flex-1 p-4 space-y-2">
          {links.map((link, index) => (
            <motion.li
              key={link.key}
              onClick={() => {
                onNavigate(link.key);
                setIsOpen(false);
              }}
              className={`cursor-pointer rounded-xl px-4 py-2 border transition-all duration-300 ${
                activeSection === link.key
                  ? "bg-white/10 border-white/10 text-zinc-100"
                  : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/10 hover:border-white/10"
              }`}
              whileHover={{ x: 6, scale: 1.03 }}
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
    </AnimatePresence>
  );
};

export default Sidebar;
