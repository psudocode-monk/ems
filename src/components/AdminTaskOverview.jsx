import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0, y: 16, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const row = {
  hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
}

const AdminTaskOverview = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || []
    const allTasks = []

    allUsers.forEach((user) => {
      if (user.tasks && user.tasks.length > 0) {
        user.tasks.forEach((task) => {
          allTasks.push({
            ...task,
            assignedTo: user.name,
            email: user.email,
          })
        })
      }
    })
    setTasks(allTasks)
  }, [])

  return (
    <motion.div
      className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-md p-4 sm:p-6 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-2xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
        All Assigned Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-zinc-400 text-sm sm:text-base">
          No tasks have been assigned yet.
        </p>
      ) : (
        <div className="relative w-full overflow-x-auto rounded-xl border border-white/10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Desktop Table View */}
          <table className="hidden sm:table w-full min-w-[600px] table-auto text-left text-sm sm:text-base">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="py-3 px-4 border-b border-white/10 font-medium whitespace-nowrap">
                  #
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium whitespace-nowrap">
                  Title
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium whitespace-nowrap">
                  Assigned To
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium whitespace-nowrap">
                  Email
                </th>
                <th className="py-3 px-4 border-b border-white/10 font-medium whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>

            <motion.tbody
              variants={stagger}
              initial="hidden"
              animate="show"
              className="divide-y divide-white/10"
            >
              {tasks.map((task, i) => (
                <motion.tr
                  key={task.id}
                  variants={row}
                  className="group transition-all duration-300 hover:bg-emerald-400/10"
                >
                  <td className="py-3 px-4 text-zinc-400">{i + 1}</td>
                  <td className="py-3 px-4 text-zinc-100">{task.title}</td>
                  <td className="py-3 px-4 text-zinc-200">{task.assignedTo}</td>
                  <td className="py-3 px-4 text-zinc-400 truncate max-w-[220px]">
                    {task.email}
                  </td>
                  <td className="py-3 px-4">
                    {task.completed ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs sm:text-sm font-medium text-emerald-300">
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
                </motion.tr>
              ))}
            </motion.tbody>
          </table>

          {/* Mobile Card View */}
          <motion.div
            className="sm:hidden flex flex-col gap-4 py-2"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                variants={row}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-all duration-300 hover:bg-emerald-400/10"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-zinc-100 truncate max-w-[70%]">
                    {task.title}
                  </h3>
                  <span className="text-xs text-zinc-400">#{i + 1}</span>
                </div>
                <p className="text-sm text-zinc-400 mb-1">
                  <span className="font-medium text-zinc-300">Assigned:</span>{" "}
                  {task.assignedTo}
                </p>
                <p className="text-xs text-zinc-500 truncate mb-2">
                  {task.email}
                </p>
                <div>
                  {task.completed ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1 text-xs font-medium text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span>
                      Pending
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default AdminTaskOverview
