import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function RegisterPage() {
  // register form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  // async function to register new user
  async function registerUser(ev) {
    // prevents form default bahaviour
    ev.preventDefault();
    setRedirect(false);

    // sends a post request to the backend register endpoint
    try {
      // const url = 'http://localhost:4000/api/v1/auth/register';
      const url = 'https://memnet-api.vercel.app/api/v1/auth/register';
      const registerResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // const registerData = await registerResponse.json();
      if (registerResponse.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // redirect to login page after successful registration
  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  // JSX form for the register page
  return (
    <form className='form' onSubmit={registerUser}>
      <h1>Register</h1>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
