import * as React from 'react'
import * as ReactSpring from 'react-spring'
import { animated } from 'react-spring'

const How = () => {
    // Animations
    const fadeRef = React.useRef()
    const fade = ReactSpring.useSpring({
        from: {opacity: 0, marginTop: 0},
        to: {opacity: 1, marginTop: 0},
        config: {duration: 500},
        ref: fadeRef
    })

    ReactSpring.useChain([fadeRef])

    return (
        <div className='flex h-screen items-center flex-col'>
            <animated.div style={fade}>
                <p className='text-4xl text-teal-600 font-bold mt-32'>How to use The Searcher?</p>
            </animated.div>
            <animated.div style={fade} className='flex h-screen items-center justify-center flex-col fixed'>
                <p className='text-2xl text-gray-600'>1. Upload your file on the Upload Menu</p>
                <p className='text-2xl text-gray-600 mt-5'>2. Search something on The Seacher Menu</p>
                <p className='text-2xl text-gray-600 mt-5'>3. Choose your desired documents :)</p>
            </animated.div>
        </div>
    )
}

export default How