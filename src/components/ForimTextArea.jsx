import React from 'react'

export default function ForimTextArea({label,name,type}) {
  return (
    <div>
        <label >{label}</label>
        <br />
        <textarea type={type}name={name} />
        <br />
    </div>
  )
}
