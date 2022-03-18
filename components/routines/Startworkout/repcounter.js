import { cloneElement } from 'react'
import classes from './rep-counter.module.css'
import React from 'react'

export default function RepCounter() {

    const [count, setCount] = React.useState(3)

    const element = <div>
        <input 
            className={classes.repCounter} 
            type="text"
        />
        <p className={classes.x}>x</p>
        <input 
            className={classes.setCounter} 
            type="text"
        />
        </div>
    
    function increaseInputs() {
        setCount(prevState => {
            return prevState + 1
        })
        
    }

    return (
        <section className={classes.repContainer}>
            {element}
            {element}
            {element}
            {element}
            {element}
            <buton onClick={increaseInputs} className={classes.button}>+</buton>
        </section>
    )
}