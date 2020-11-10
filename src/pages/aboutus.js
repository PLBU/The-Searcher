import * as React from 'react'
import * as ReactSpring from 'react-spring'
import { animated } from 'react-spring'

//importing images
import Farrell from '../images/foto-farrell.png'
import James from '../images/foto-james.png'
import Aldi from '../images/foto-aldi.png'

const AboutUs = () => {
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
        <animated.div style={fade} className='flex h-screen items-center flex-col'>
            <p className='text-5xl text-teal-600 font-bold mt-24'>Get to Know Us!</p>
            <p className='text-3xl text-teal-500 opacity-75 font-bold'>The Pikirkan Nanti Saja</p>
            <div className='flex flex-row mt-24'>
                <div className='flex-col text-center mx-5'>
                    <img src={Aldi} className='h-48 w-48 mx-5' alt=''/>
                    <p className='mt-3 text-lg text-gray-700 font-bold'>Renaldi Arlin</p>
                    <p className='text-lg text-gray-700'>13519114</p>
                    <p className='text-lg text-gray-700 mt-4'>
                        Here's something about me <br/>
                        IF = Begadang tiap Malam :)<br/>                        
                    </p>
                </div>
                <div className='flex-col text-center mx-5'>
                    <img src={Farrell} className='h-48 w-48 mx-5' alt=''/>
                    <p className='mt-3 text-lg text-gray-700 font-bold'>Farrel Abieza Zidan</p>
                    <p className='text-lg text-gray-700'>13519182</p>
                    <p className='text-lg text-gray-700 mt-4'>
                        Wanna know about me?<br/>
                        I'm a Dedlener :)<br/>                        
                    </p>
                </div>
                <div className='flex-col text-center mx-5'>
                    <img src={James} className='h-48 w-48 mx-5' alt=''/>
                    <p className='mt-3 text-lg text-gray-700 font-bold'>Leonardus James Wang</p>
                    <p className='text-lg text-gray-700'>13519189</p>
                    <p className='text-lg text-gray-700 mt-4'>
                        This is my thought right now<br/>
                        Semoga Tubes cepat selesai :)<br/>                        
                    </p>
                </div>
            </div>
        </animated.div>
    )
}

export default AboutUs