import React from 'react'

const LoginForm = () => {
  return (
    <div>
        <h1>Login</h1>
      <form>

        <div className='form-group'>
          <label>Email</label>
          <input type="text" className='form-control' name="email" />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input type="password" className='form-control' name="password" />
        </div>

        <input type="submit" value="Login" className='btn btn-primary'/>
      </form>
    </div>
  )
}

export default LoginForm