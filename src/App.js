import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {

const [loading, setLoading] = useState(true)
const [person, setPerson]   = useState(null)
const [title, setTitle]  = useState('name')
const [value, setValue] = useState('random person')


const getPerson = async () =>{
  setLoading(true)
  try{
     const response = await fetch(url)
     const data = await response.json()
     const person = data.results[0]
     const {phone,email} = person
     const {large:image} = person.picture
     const {login:{password}} = person
     const {last,first,title} = person.name
     const {dob:{age,date}} = person
     const {street:{number,name}} = person.location
     console.log(data)
     const newPerson = {
       phone,
       email,
       image,
       password,
       age,
       street: `${name} ${number}`,
       name: `${title} ${first} ${last}`
     }
     setPerson(newPerson)
     setTitle('name')
     setValue(newPerson.name)
     setLoading(false)
  }
  catch(error){
    console.log(error)
    setLoading(false)
  }
}


useEffect(() =>{
  getPerson()
},[])

const handleValue = (e) =>{
 if(e.target.classList.contains('icon')){
   const newValue = e.target.dataset.label
   console.log(newValue)
   setValue(person[newValue])
 }
}

  return <main>
    <div className='bcg-black block'></div>
      <div className='block'>
        <div className='container'>
          <img src={(person && person.image) || defaultImage} className="user-img" />
          <p className='user-title'>My {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button 
              className='icon' 
              data-label="name" 
              onMouseOver={handleValue}>
                <FaUser/>
              </button>

              <button 
              className='icon' 
              data-label="email" 
              onMouseOver={handleValue}>
                <FaEnvelopeOpen/>
              </button>

              <button 
              className='icon' 
              data-label="age" 
              onMouseOver={handleValue}>
                <FaCalendarTimes/>
              </button>

              <button 
              className='icon' 
              data-label="street" 
              onMouseOver={handleValue}>
                <FaMap/>
              </button>

              <button 
              className='icon' 
              data-label="phone" 
              onMouseOver={handleValue}>
                <FaPhone/>
              </button>

              <button 
              className='icon' 
              data-label="password" 
              onMouseOver={handleValue}>
                <FaLock/>
              </button>

          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'Loading...' : 'Random User'}
          </button>
        </div>
      </div>
  </main>
}

export default App
