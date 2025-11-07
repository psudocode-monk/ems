import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import CreateUser from './CreateUser'
import AssignTask from './AssignTask'
import AdminTaskOverview from './AdminTaskOverview'
import LogoutButton from './LogoutButton'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'

const pageVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.45, ease: 'easeOut' }
  }
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('users')
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!userData || userData.role !== 'admin') {
      navigate('/login')
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setUsers(storedUsers)
    setTasks(storedTasks)
  }, [navigate])

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const assignTask = (task) => {
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const clearAllTasks = () => {
    setTasks([])
    localStorage.setItem('tasks', JSON.stringify([]))
    const clearedUsers = users.map(u => ({ ...u, tasks: [] }))
    setUsers(clearedUsers)
    localStorage.setItem('users', JSON.stringify(clearedUsers))
  }

  return (
    <motion.div
      className='flex min-h-screen bg-[#0a0a0a] text-zinc-100'
      variants={pageVariants}
      initial='hidden'
      animate='show'
    >
      <Sidebar role='admin' onNavigate={setActiveSection} />

      <motion.div
        className='ml-64 flex-1 p-8'
        variants={stagger}
        initial='hidden'
        animate='show'
      >
        <motion.div
          className='flex justify-between items-center mb-6 sticky top-0 z-10 backdrop-blur-lg bg-[#0a0a0a]/70 border-b border-white/10 px-2 py-4 rounded-b-2xl'
          variants={item}
        >
          <h1 className='text-3xl font-semibold tracking-tight'>
            Hello {JSON.parse(localStorage.getItem('loggedInUser'))?.username} 👋
          </h1>
          <LogoutButton />
        </motion.div>

        <motion.div
          className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:bg-white/10'
          variants={item}
          whileHover={{ y: -2 }}
        >
          {activeSection === 'users' && (
            <motion.div variants={item}>
              <CreateUser users={users} addUser={addUser} />
            </motion.div>
          )}

          {activeSection === 'assign' && (
            <motion.div variants={item}>
              <AssignTask users={users} assignTask={assignTask} />
            </motion.div>
          )}

          {activeSection === 'overview' && (
            <>
              <motion.div className='flex justify-between items-center mb-4' variants={item}>
                <h2 className='text-xl font-semibold tracking-tight'>Task Overview</h2>
                <motion.button
                  onClick={clearAllTasks}
                  className='px-4 py-2 rounded-xl text-sm font-medium border border-white/10 bg-white/10 text-zinc-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 hover:bg-white/20'
                  whileHover={{
                    y: -2, scale: 1.02,
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.6)'
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
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
  )
}

export default AdminDashboard
