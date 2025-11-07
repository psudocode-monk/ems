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
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const row = {
  hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <motion.div
      className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] backdrop-blur-md p-6 sm:p-8 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] hover:bg-white/[0.08] transition-all duration-300"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-2xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Registered Users
      </h2>

      {users.length === 0 ? (
        <p className="text-zinc-400 text-base sm:text-lg italic">
          No users created yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
          <table className="w-full table-auto text-left text-sm sm:text-base">
            <thead className="bg-white/[0.06] text-zinc-400 uppercase text-xs sm:text-sm tracking-wide">
              <tr>
                <th className="py-3 px-4 border-b border-white/10 font-medium">
                  #
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium">
                  Name
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium">
                  Email
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium">
                  Role
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium">
                  Tasks
                </th>
              </tr>
            </thead>

            <motion.tbody
              variants={stagger}
              initial="hidden"
              animate="show"
              className="divide-y divide-white/10"
            >
              {users.map((user, i) => (
                <motion.tr
                  key={user.id}
                  variants={row}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                  className="transition-all duration-300"
                >
                  <td className="py-3 px-4 text-zinc-400">{i + 1}</td>
                  <td className="py-3 px-4 font-medium text-zinc-100">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-zinc-300 truncate max-w-[240px]">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        user.role === "admin"
                          ? "border-emerald-400/30 bg-emerald-400/20 text-emerald-300"
                          : "border-white/10 bg-white/5 text-zinc-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">
                    {user.tasks?.length || 0}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default UserList;
