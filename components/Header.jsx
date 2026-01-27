import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// JSX for Header component
export default function Header() {
  // const [username, setUsername] = useState(null);
  // variables from React Context
  const { user, setUser } = useContext(UserContext);

  // the async function fetches the user profile
  const fetchData = async () => {
    // backend url
    // const url = 'http://localhost:4000/api/v1/auth/profile';
    const url = 'https://memnet-api.vercel.app/api/v1/auth/profile';
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      // throw error if fetch fails
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // if fetch is successful, returns javascript object
      const data = await response.json();
      // set the setUser Context
      setUser(data);
    } catch (error) {
      throw new Error('Error fetching profile: ' + error.message);
    }
  };

  // fetches the user profile when the Header component mounts
  useEffect(() => {
    // invokes the fetchData function
    fetchData();
  }, []);

  // async function for logout
  async function logout() {
    // logout url
    // const url = 'http://localhost:4000/api/v1/auth/logout';
    const url = `https://memnet-api.vercel.app/api/v1/auth/logout`;
    try {
      const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
      });
      // throws error if response fails
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // console.log(await fetchData.json());
      // setUsername(null);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }

  // initialize username for conditional rendering
  const username = user?.username;
  // console.log(username);

  return (
    <header>
      <h2>
        <Link to='/' className='logo'>
          Remnets
        </Link>
      </h2>
      <nav>
        {/* if username, displays create New Post and 
        Logout else displays Login and Register */}
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
