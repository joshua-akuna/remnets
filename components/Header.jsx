import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:4000/api/v1/auth/profile';
      try {
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        throw new Error('Error fetching profile: ' + error.message);
      }
    };
    fetchData();
  }, []);

  async function logout() {
    const url = 'http://localhost:4000/api/v1/auth/logout';
    try {
      const fetchData = await fetch(url, {
        credentials: 'include',
        method: 'POST',
      });
      if (!fetchData.ok) {
        throw new Error('Network response was not ok');
      }
      // console.log(await fetchData.json());
      setUsername(null);
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }

  return (
    <header>
      <h2>
        <Link to='/' className='logo'>
          Remnets
        </Link>
      </h2>
      <nav>
        {username ? (
          <>
            <Link to='/create'>Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
