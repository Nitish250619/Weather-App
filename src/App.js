import React from 'react'
import "./App.css"
import CurrentLocation from './Components/CurrentLocation/CurrentLocation'
import ForCast from './Components/ForCast/ForCast'

const App = () => {
   
  return (
    <div className='container'>
        <div className='currentLocation'>
            <CurrentLocation/>
        </div>
        <div className='forCast' >
            <ForCast/>
        </div>
    </div>
  )
}

export default App