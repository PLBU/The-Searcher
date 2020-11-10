import * as React from 'react'
import axios from 'axios'

// Import styling
import '../css/main.css'

const Home = () => {
    const [textFromServer, setTextFromServer] = React.useState('')
    const [searchQuery, setSearchQuery] = React.useState('')

    const getTxt = () => {
        axios.get('http://localhost:5000/txt')
            .then(res => {
                console.log(res.data) 
                setTextFromServer(res.data)
            })
            .catch(e => console.log(e) )
    }

    React.useEffect( () => {
        getTxt()
    }, [])

    return (
        <div className='flex h-screen justify-center items-center'>
            <input 
                className='border-teal-500 border-4 w-1/2 rounded-full py-5 px-16 bg-white shadow-xl 
                    text-3xl text-gray-600 
                    outline-none transition duration-500 ease-in-out z-20
                    transition transform
                    focus:fixed focus:scale-65 focus:-translate-y-toTop focus:shadow-none'
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder={textFromServer}
                type="text"/>
        </div>
    )
}

export default Home