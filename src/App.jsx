import Header from '../components/Header';
import Post from '../components/Post';
import Layout from '../components/Layout';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CreatePost from '../pages/CreatePost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
