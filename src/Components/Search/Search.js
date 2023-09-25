import { InputText } from 'primereact/inputtext'
import React from 'react'

const Search = (props) => {
    const {value, changeHandler, placeHolder} = props; 
  return (
    <div className='flex justify-content-end'>
        <span className='p-input-icon-left'>
            <i className='pi pi-search'></i>
            <InputText value= {value} onChange={changeHandler} placeholder= {placeHolder}></InputText>
        </span>
    </div>
  )
}

export default Search
