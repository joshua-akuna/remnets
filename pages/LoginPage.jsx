import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function LoginPage() {
  // states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  // the async function logs in user
  async function loginUser(ev) {
    // prevents form from default behaviour
    ev.preventDefault();
    // backend login endpoint
    // const url = 'http://localhost:4000/api/v1/auth/login';
    const url = 'https://memnet-api.vercel.app/api/v1/auth/login';
    try {
      // sends a post request to the backend login endpoint
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      // if fetch is successful, update the setUser and setRedirect states
      // else throw an error
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        setRedirect(true);
        // console.log(await response.json());
      } else {
        throw new Error('Invalid username or password.');
      }
    } catch (error) {
      throw new Error('Error: ', error.message);
    }
  }

  // Navigates to home screen if login is successful
  // and redirect is true
  if (redirect) {
    return <Navigate to='/' />;
  }

  // JSX form for the login page
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
