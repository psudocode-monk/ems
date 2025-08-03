const Sidebar = ({ role, onNavigate }) => {
  const links = role === 'admin'
    ? [
        { label: 'Users', key: 'users' },
        { label: 'Assign Task', key: 'assign' },
        { label: 'Task Overview', key: 'overview' },
      ]
    : [
        { label: 'My Tasks', key: 'tasks' }
      ]

  return (
    <div className='w-64 min-h-screen bg-gray-900 text-white fixed'>
      <div className='text-xl font-bold p-4 border-b border-gray-700'>
        {role === 'admin' ? 'Admin Panel' : 'User Panel'}
      </div>
      <ul className='p-4 space-y-2'>
        {links.map((link) => (
          <li
            key={link.key}
            onClick={() => onNavigate(link.key)}
            className='cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors'
          >
            {link.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
