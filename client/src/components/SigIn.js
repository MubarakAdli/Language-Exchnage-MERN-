import React from 'react'
import LoginForm from './LoginForm'
import Register from './Register'


const SigIn = () => {
  return (
    <div className='row'>
        <div className='col'>
            <Register></Register>
        </div>

        <div className='col'>
            <LoginForm></LoginForm>
        </div>

    </div>
  )
}

export default SigIn