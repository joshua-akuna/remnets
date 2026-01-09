import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();

    const url = 'http://localhost:4000/api/v1/register';
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await data.json();
    console.log(result);
  }

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
