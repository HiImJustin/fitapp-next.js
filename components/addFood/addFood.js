import classes from './foodlog.module.css'
import foodData from './foodData';
import React from 'react'

function AddFood() {
    //This manages the state for what is being typed into the search bar
    const [foodOptions, setFoodOptions] = React.useState("")
    function handleChange(e) {
        e.preventDefault();
        setFoodOptions(e.target.value.toLowerCase())
    }

    const filtered = foodData.filter(food => food.name.toLowerCase().includes(foodOptions))
    const results = filtered.map(food => <div key={food.key}>{food.name}</div>)

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
        console.log(selected)
    }
    console.log(selectedArray)
    

    let arrayElement = ""        
    for(let i=0; i < selectedArray.length; i++) {
            arrayElement = selectedArray.map(selected => 
            <p  className={classes.selected} onClick={deleteFood}
                key={selected.index}>{selected}
            </p>
        )
    }
    console.log(arrayElement)

    function handleSubmit(e) {
        e.preventDefault();
    }
        
    return(
        <>
            <h1 className={classes.title}>Log Food</h1>

            <form className={classes.searchBar}>

                <label htmlFor='search'>Search Foods</label>
                <input type="text" onChange={handleChange}></input>

                { foodOptions.length > 0 && 
                    <div onClick={selectedFood} className={classes.foodOptions}>{results}</div>
                }

                {foodOptions.length > 0 && arrayElement.length > 0 &&
                <div className={classes.selectedFoods}>
                   {arrayElement}
                </div>}
                
                <button className={classes.addToLog} onClick={handleSubmit}>Add to log</button>
                
            </form>
        </>
    )
}
export default AddFood;