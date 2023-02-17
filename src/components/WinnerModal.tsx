import React from 'react'


type Winner = {
  winner:string, 
  setWinner:React.Dispatch<React.SetStateAction<any>>
}

const WinnerModal = ({winner, setWinner}: Winner) => {
  return (
    <div className="winning-component text-lg font-semibold backdrop-blur-md h-60 justify-between">
          <h2 className='text-4xl text-center px-6 py-4 bg-orange-300 rounded-xl'>Winner <br /> {winner}</h2>
          <button onClick={() => setWinner(null)}>Go Back</button>
    </div>
  )
}

export default WinnerModal