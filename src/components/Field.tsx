import React from 'react'


type FieldProps = {
  index:number, 
  cell:string, 
  handleClick:React.Dispatch<React.SetStateAction<any>>
}

const Field = ({index, cell, handleClick}: FieldProps) => {
  return (
    <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
    </div>
  )
}

export default Field