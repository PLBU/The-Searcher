import * as React from 'react'
import axios from 'axios'

const Home = () => {
    const [textFromServer, SetTextFromServer] = React.useState('')

    const getTxt = () => {
        axios.get('http://localhost:5000/txt')
            .then(res => {
                console.log(res.data) 
                SetTextFromServer(res.data)
            })
            .catch(e => console.log(e) )
    }

    React.useEffect( () => {
        getTxt()
    }, [])

    return (
        <div>
            <h1>Search it up</h1>
            <h2>{textFromServer}</h2>
        </div>
    )
}

export default Home