import React from 'react'
import LoginForm from './LoginForm'
import RegForm from './RegForm'

const SigIn = () => {
  return (
    <div className='row'>
        <div className='col'>
            <RegForm></RegForm>
        </div>

        <div className='col'>
            <LoginForm></LoginForm>
        </div>

    </div>
  )
}

export default SigIn