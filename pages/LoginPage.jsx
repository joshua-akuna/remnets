import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function loginUser(ev) {
    ev.preventDefault();

    const url = 'http://localhost:4000/api/v1/auth/login';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.status === 200) {
      setRedirect(true);
    } else {
      alert('Invalid username or password.');
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <form className='form' onSubmit={loginUser}>
      <h1>Login</h1>
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
      <button>Login</button>
    </form>
  );
}
