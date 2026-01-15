import { useState } from 'react';

export default function RegisterPage() {
  // register form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // async function to register new user
  async function registerUser(ev) {
    // prevents form default bahaviour
    ev.preventDefault();

    // sends a post request to the backend register endpoint
    const url = 'http://localhost:4000/api/v1/auth/register';
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
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
