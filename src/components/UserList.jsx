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
      className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-xl font-semibold tracking-tight mb-4">
        Registered Users
      </h2>

      {users.length === 0 ? (
        <p className="text-zinc-400">No users created yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full table-auto text-left">
            <thead className="bg-white/5 text-zinc-400">
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
                  className="transition-all duration-300 hover:bg-white/5"
                >
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">{user.tasks?.length || 0}</td>
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
