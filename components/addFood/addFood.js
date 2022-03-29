import classes from './foodlog.module.css'
import foodData from './foodData';
import React from 'react'

function AddFood() {
    //This manages the state for what is being typed into the search bar
    const [foodOptions, setFoodOptions] = React.useState("")
    function handleChange(e) {
        setFoodOptions(e.target.value.toLowerCase())
    }

    const filtered = foodData.filter(food => food.name.includes(foodOptions))
    const results = filtered.map(food => <div key={food.key} onClick={selectedFood}>{food.name}</div>)

    //Manage state for the selected food options
    const [selectedArray, setSelectedArray] = React.useState([])
    function selectedFood(e) {
        let selected = e.target.textContent
        setSelectedArray(prevState => {
            return [...prevState, selected]
        })
    }

    function deleteFood(e) {
        let selected = e.target.textContent
        if(selectedArray.includes(selected)) {
            setSelectedArray(prevState =>  {
                let filtered = prevState.filter( food => food !== selected)
                return filtered
            })
        }
    }

    let arrayElement = selectedArray.map(selected => 
        <p  className={classes.selected} onClick={deleteFood}
            key={selected.index}>{selected}
        </p>
    )

    function handleSubmit(e) {
        e.preventDefault();
    }


        
    return(
        <>
            <h2 className={classes.title}>Log Food</h2>

            <form className={classes.searchBar}>

                <input
                    type="text" 
                    onChange={handleChange} 
                    className={classes.input}
                    placeholder="Search Foods"
                />

                { foodOptions.length > 0 && 
                    <div className={classes.foodOptions}>{results}</div>
                }

                {arrayElement.length > 0 &&
                <div className={classes.selectedFoods}>
                    <h3>Selected Foods:</h3>
                    {arrayElement}
                </div>}
                
                
            </form>
            <button className={classes.addToLog} onClick={handleSubmit}>Add to log</button>
        </>
    )
}
export default AddFood;