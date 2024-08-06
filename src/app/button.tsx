'use client'
import {useState, useContext} from 'react'
import {ThemeContext} from './providers'

type Theme =  'dark' | 'light'
const Button = () => {
    const value = useContext(ThemeContext) as Theme
    const [count, setCount] = useState(0)
    console.log(value)
    return (
        <>
        <button onClick={() => setCount(count +1)} >
            Click {count} times
        </button>
            <p> {value} </p>
        </>
    )
}
export default Button;