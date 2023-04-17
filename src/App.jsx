import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

import './index.css'





function App() {
  const [characters, setCharacters] = useState([]);


  useEffect(() => {

      async function fetchData() {

        const response = await axios.get('http://localhost:3001/api/people/');
        setCharacters(response.data);
     

      }
      fetchData();
   

      

      if (characters.length > 0) {
        console.log(characters[0].name);
      } else {
        console.log("No characters data yet.");
        console.log(characters.length)
       
      }

  }, []);

      //helper functions
      const getYear = (birthdate) => {

        const [yearString] = birthdate.split(" ");
        if(yearString === "unknown"){
          return 0;
        }else {
          return parseInt(yearString);
  
        }
      
    }
  
    const getMultiplier = (birthdate) => {
      
        const yearString = birthdate.toString();
  
       
  
        if(yearString.endsWith("BBY")){
          return -1;
        } else if (yearString.endsWith("ABY")) {
  
          return 1;
        } 
  
    }
  
    const sortByBirthDate = ([...characters]) => {
      
      //The following lines were used for debugging
      console.log(characters);
      console.log("Triggered")
      console.log(characters.length);

        const sorted = characters.sort((a,b) => {

            console.log(a.birthdate);
            console.log(b.birthdate);
  
            const aYear = getYear(a.birthdate)
            const bYear = getYear(b.birthdate)
  
            const aMultiplier = getMultiplier(a.birthdate);
            const bMultiplier = getMultiplier(b.birthdate);
  
            const comparison = (aYear - bYear) * aMultiplier - (bYear - aYear) * bMultiplier;
            console.log(comparison)
            return comparison;
  
  
        })
        setCharacters(sorted);
        console.log(sorted)
  
    }
  
    const handleSortClick = () => {
  
        const sortedCharacters = sortByBirthDate([...characters]);
        console.log(sortedCharacters)
    }

    const callAgain = () => {

      async function fetchData() {

        const response = await axios.get('http://localhost:3001/api/people/');
        setCharacters(response.data);
     

      }
      fetchData();
    }

    const handleRevertClick = () => {
      callAgain;
      setCharacters(characters)

    }
  


 

  return (
   <>
   <h1 className='pb-1.5'>Star Wars Characters</h1>
   
   <button onClick={handleSortClick}>Sort By Birthdate</button>
   <button onClick={handleRevertClick}>Revert</button>
   <div className='grid grid-cols-4 gap-4'>

      {characters?.map((character) => (

        <div className='rounded-md shadow-md p-4' key = {character.id}>

          <h2 className='text-lg font-bold'> {character.name}</h2>
          <p>Birthday:  {character.birthdate}</p>
          <p>Gender:  {character.gender}</p>

        </div>
      

      ))}

   </div>
   </>
   
  )
}

export default App
