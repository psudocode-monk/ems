import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-950 text-white text-center px-4'>
      <div>
        <h1 className='text-7xl font-bold text-emerald-500'>404</h1>
        <p className='text-2xl mt-4'>Page Not Found</p>
        <p className='text-gray-400 mt-2'>The page you’re looking for doesn’t exist or has been moved.</p>
        <Link
          to='/login'
          className='inline-block mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition'
        >
          Go Back to Login
        </Link>
      </div>
    </div>
  )
}

export default NotFound
