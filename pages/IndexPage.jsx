import { useEffect, useState } from 'react';
import Post from '../components/Post';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:4000/api/v1/post';
    async function fetchData() {
      const response = await fetch(url, {
        credentials: 'include',
      });
      setPosts(await response.json());
    }
    fetchData();
  }, []);

  console.log(posts);

  return (
    <>{posts.length > 0 ? posts.map((post) => <Post {...post} />) : null}</>
  );
}
