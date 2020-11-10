import * as React from 'react'
import axios from 'axios'
import * as ReactSpring from 'react-spring'
import { animated } from 'react-spring'

// Import styling
import '../css/main.css'

const Home = () => {
    // Animation
    const fadeRef = React.useRef()
    const fade = ReactSpring.useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 500},
        ref: fadeRef
    })

    ReactSpring.useChain([fadeRef])

    // States
    const [textFromServer, setTextFromServer] = React.useState('')
    const [searchQuery, setSearchQuery] = React.useState('')

    // Functions
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
            <animated.input 
                style={fade}
                className='border-teal-500 border-4 w-1/2 rounded-full py-5 px-16 bg-white shadow-xl 
                    text-3xl text-gray-600 
                    outline-none transition duration-500 ease-in-out z-20
                    transition transform
                    fixed focus:scale-65 focus:-translate-y-toTop focus:shadow-none'
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder={textFromServer}
                type="text"/>
            <p>Ini dimana coba</p>
        </div>
    )
}

export default Home