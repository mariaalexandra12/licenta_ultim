import React, {useState} from 'react'
import './clock.css'

const Clock = () => {
    let time = new Date().toLocaleTimeString();
    const [Clock, setClock] = useState(time)

    const UpdateClock = () =>{
        time = new Date().toLocaleTimeString();
        setClock(time);
    }

    setInterval(UpdateClock, 1000)
  return (
    <>
    <div className='clock-wrapper' style={{marginTop: '20px',marginLeft:'-350px'}}>
      <div className='clock-container'>
      <h1 className='clock'>
        {Clock}
    </h1>
      </div>
    </div>
    </>
  )
}

export default Clock