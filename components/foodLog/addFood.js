import classes from './foodlog.module.css'
import foodData from './foodData';
import React from 'react'

function AddFood() {
    //dummby data from foodData.js - will mimic database data
    console.log(foodData)
    
    const [foodOptions, setFoodOptions] = React.useState("")
    
    function handleChange(e) {
        e.preventDefault();
        setFoodOptions(e.target.value)
    }

    const filtered = foodData.filter(food => 
    food.name.toLowerCase().includes(foodOptions) || food.name.toUpperCase().includes(foodOptions))
    
    const results = filtered.map(food => <div key={food[0]}>{food.name}</div>)
    
    const [selectedArray, setSelectedArray] = React.useState([])
    //This is stuff
    function selectedFood(e) {
        let selected = e.target.textContent
        setSelectedArray(prevState => prevState + selected + " ")
    }
    console.log(selectedArray)
    
    function handleSubmit(e) {
            e.preventDefault();
            
            const foodlogging = selectedArray.split(" ") 
            console.log(foodlogging)
    }
        
    return(
        <>
            <h1 className={classes.title}>FoodLog</h1>

            <form className={classes.searchBar}>

                <label htmlFor='search'>Search Foods</label>

                <input type="text"  onChange={handleChange} />

                {foodOptions.length > 0 && 
                    <div onClick={selectedFood} className={classes.foodOptions}>{results}
                </div>}

                {foodOptions.length > 0 && <div className={classes.selectedFoods}>
                    <div className={classes.selected}>
                        {selectedArray}
                    </div>
                </div>}
                <button className={classes.addToLog} onClick={handleSubmit}>Add to log</button>
                
            </form>
        </>
    )
}
export default AddFood;