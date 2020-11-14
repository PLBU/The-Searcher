import * as React from 'react'
import axios from 'axios'
import * as ReactSpring from 'react-spring'
import { animated } from 'react-spring'
import Modal from 'react-modal'

// Import styling
import '../css/main.css'

const shorten = (str, maxLen) => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(' ', maxLen));
}

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
    const [searchQuery, setSearchQuery] = React.useState('')
    const [searchRes, setSearchRes] = React.useState(null)
    const [table, setTable] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [textTitle, setTextTitle] = React.useState(null)
    const [textContent, setTextContent] = React.useState(null)

    // Functions
    const search = (event) => {
        if (event.key === 'Enter') {
            axios.get(`http://localhost:5000/search?q=${searchQuery}`)
                .then(res => {
                    console.log(res.data)
                    setSearchRes(res.data.searchResult)
                    var tableNow = res.data.table[0].map((_, colIndex) => res.data.table.map(row => row[colIndex] ) )
                    setTable(tableNow)
                })
                .catch(e => console.log(e) )
        }
    }

    const resultOnClick = (title, content) => {
        setShowModal(true)
        setTextTitle(title)
        setTextContent(content)
    }

    React.useEffect( () => {
    }, [])

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            {/* Modal isi dokumen */}
            <Modal
                style={{
                    overlay: {
                        zIndex: 30,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        borderRadius: '24px',
                    }
                }}
                onRequestClose={() => setShowModal(false)}
                isOpen={showModal}>
                <button className='absolute right-0 mr-8 font-bold text-3xl text-teal-500' 
                    onClick={() => setShowModal(false)}>X</button>
                <p className='font-bold text-3xl '>{textTitle}</p>
                <p className='font-bold text-base text-gray-700 '>{textContent}</p>
            </Modal>
            <animated.input 
                onKeyDown={search}
                style={fade}
                className='border-teal-500 border-4 w-1/2 rounded-full py-5 px-16 bg-white shadow-xl 
                    text-3xl text-gray-600 
                    outline-none transition duration-500 ease-in-out z-20
                    transition transform
                    fixed focus:scale-65 focus:-translate-y-toTop focus:shadow-none'
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder={"Search something here and hit enter"}
                type="text"/>
            <div className='flex flex-col h-screen items-center mt-48'>
                <div className='grid gap-4 grid-cols-3'>
                { searchRes && searchQuery.length
                    ? searchRes.map( (value, index) => 
                        <div key={index} 
                            onClick={() => resultOnClick(value.nama, value.isi)}
                            className='max-w-sm rounded-3xl overflow-hidden shadow-lg p-10 bg-white m-5 border-2 border-opacity-25 border-teal-500 
                            cursor-pointer hover:scale-110 transition duration-500 ease-in-out transform'>
                            <p className='font-bold text-xl'>{value.nama}</p>
                            <p>Similarity: {value.persentase.toFixed(2)}%</p>
                            <p>Word Count: {value.wordCount}</p>
                            <p>Content: {shorten(value.isi, 20)}</p>
                        </div>
                    )
                    : null
                }
                </div>
                {table && searchQuery.length
                    ?
                    <table className='table-auto my-10 shadow-lg'>
                        <tbody>
                            {table.map( (subarray, idx) => 
                            <tr>
                                {subarray.map( (element, index) => 
                                    <td className={
                                        (idx === 0)
                                        ? 'bg-teal-600 bg-opacity-50 border border-teal-600 px-4 py-2'
                                        : (index === 0)
                                        ? 'bg-teal-500 bg-opacity-25 border border-teal-500 px-4 py-2'
                                        : 'bg-white border border-teal-500 px-4 py-2'}>{element}</td>)}
                            </tr>
                            )}
                        </tbody>
                    </table>
                    : null
                }
                </div>
        </div>
    )
}

export default Home