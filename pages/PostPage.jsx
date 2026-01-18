import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const url = `http://localhost:4000/api/v1/posts/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchPost();
  }, []);

  return (
    <div>
      <h2>{post}</h2>
    </div>
  );
}
