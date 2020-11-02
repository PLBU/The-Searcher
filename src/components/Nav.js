import * as React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <nav>
            <ul>
                <Link to='/'>
                    <li>
                    Search it Up!
                    </li>
                </Link>
                <Link to='/how'>
                    <li>
                    How to Use
                    </li>
                </Link>
                <Link to='/about-us'>
                    <li>
                    About Us
                    </li>
                </Link>
            </ul>
        </nav>
    )
}