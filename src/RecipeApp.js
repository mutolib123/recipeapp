import Nav from './recipe_app/Nav'
import Banner from './recipe_app/Banner'
import List from './recipe_app/List'
import Footer from './recipe_app/Footer'
import CopyRight from './recipe_app/CopyRight'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { keyboard } from '@testing-library/user-event/dist/keyboard'

const RecipeApp = ()=>{

    const [loading, setLoading] = useState(true)
    const[error, setError] = useState(false)
    const [recipes, setRecipes] = useState([])
    const[frecipe, setRecipe] = useState([])
    const[keyword, setkeyword] = useState('')

    useEffect(()=> {
    makeApiCall()}, [])

    // this will do the filtering
    const handlefilter = ()=> {
        const filtered_recipes = recipes.filter((recipe)=>{
            return recipe.name.toLowerCase().includes(keyword.toLowerCase())
        })

        setRecipes(filtered_recipes)
    }

    // make the api call and get the data for us.
    function makeApiCall(){
        axios.get("https://dummyjson.com/recipes")
        .then(function(resp){
            console.log(resp.data.recipes)
            setLoading(false)
            setRecipes(resp.data.recipes)
        })
        .catch(function(err){
            console.log(err)
            setLoading(false);
            setError(true)
        })
    }
    return (
        <div className='container-fluid'>

            <Nav/>

            <Banner  setkeyword={setkeyword} handlefilter={handlefilter} keyword={keyword}  />

            <List loading={loading} error={error} recipes={recipes} frecipe={frecipe} keyword={keyword}/>

            <Footer/>

            <CopyRight/>
        </div>
    )
}
export default RecipeApp