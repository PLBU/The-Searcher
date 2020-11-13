import * as React from 'react'
import axios from 'axios'
import * as ReactSpring from 'react-spring'
import { animated } from 'react-spring'

const Upload = () => {
    // Animation
    const fadeRef = React.useRef()
    const fade = ReactSpring.useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 500},
        ref: fadeRef
    })


    ReactSpring.useChain([fadeRef])

    //States
    const [file, setFile] = React.useState(null)

    //Functions
    const uploadFile = () => {
        const formData = new FormData(); 
     
        // Update the formData object 
        formData.append( 
            "filetoupload", 
            file, 
            file.name 
        )

        axios.post('http://localhost:5000/upload', formData)
            .then(res => {
                alert("File successfully uploaded in ./doc")
                console.log(res.data) 
            })
            .catch(e =>{
                alert("An error has occured: " + e)
                console.log(e) 
            })
    }

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <animated.div style={fade} className='border-teal-500 border-4 w-1/2 rounded-full py-5 px-16 bg-white hover:shadow-xl text-xl text-gray-600'>
                <input type="file" className='outline-none' onChange={event => setFile(event.target.files[0])}/>
            </animated.div>
            <animated.button 
                style={fade}
                disabled={ (file) ? false : true}
                className={
                    (file) 
                    ? 'mt-10 text-xl bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 px-8 border-b-4 border-teal-700 hover:border-teal-500 rounded-xl' 
                    : 'mt-10 text-xl bg-teal-500 bg-opacity-25 text-white font-bold py-4 px-8 rounded-xl' }
                onClick={uploadFile}>
                Upload!
            </animated.button>
        </div>
    )
}

export default Upload