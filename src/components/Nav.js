import * as React from 'react'
import { Link } from 'react-router-dom'

// Import icon
import { FaSearch } from 'react-icons/fa'

// Import styling
import '../css/main.css'

const Nav = () => {
    return (
        <nav className="fixed z-10 w-full flex bg-white rounded-b-3xl border-b-4 border-gray-400 shadow p-4">
            <div className='flex items-center flex-shrink-0 ml-5'>
                <FaSearch size='2.5em' className='text-teal-500'/>
                <Link to='/'>
                    <span className="font-bold text-3xl tracking-tight ml-3 text-gray-500">The </span>
                    <span className="font-bold text-3xl ml-1 text-teal-500 text-opacity-75">Searcher</span>
                </Link>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link to='/about-us' className="transition transform duration-500 ease-in-out block text-lg mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:scale-110 hover:text-teal-500 hover:font-bold mr-5 float-right">
                        About Us
                    </Link>
                    <Link to='/how' className="transition transform duration-500 ease-in-out block text-lg mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:scale-110 hover:text-teal-500 hover:font-bold mr-5 float-right">
                        How to Use
                    </Link>
                    <Link to='/upload' className="transition transform duration-500 ease-in-out block text-lg mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:scale-110 hover:text-teal-500 hover:font-bold mr-5 float-right">
                        Upload
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav