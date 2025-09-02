import React from 'react'

export default function FormInput({type,name,label}) {
  return (
    <div>
        <label >{label}</label>
        <input type={type}name={name} />
    </div>
  )
}
