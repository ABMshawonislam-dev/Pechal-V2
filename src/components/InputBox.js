import React from 'react'
import TextField from '@mui/material/TextField';
const InputBox = ({label,variant,className,textChange,type,name,validation}) => {
  return (
    <TextField type={type} name={name} className={className}  label={label} variant={variant} onChange={textChange}/>
  )
}

export default InputBox