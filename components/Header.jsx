import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h2>
        <Link to='/' className='logo'>
          Remnets
        </Link>
      </h2>
      <nav>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
    </header>
  );
}
