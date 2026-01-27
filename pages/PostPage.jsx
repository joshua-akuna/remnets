import { formatISO9075 } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function PostPage() {
  const [redirect, setRedirect] = useState(null);
  const [postInfo, setPostInfo] = useState(false);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchPost() {
      try {
        // const url = `http://localhost:4000/api/v1/posts/${id}`;
        const url = `https://memnet-api.vercel.app/api/v1/posts/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        setPostInfo(data);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchPost();
  }, []);

  async function deletePost() {
    // const url = `http://localhost:4000/api/v1/posts/${id}`;
    const url = `https://memnet-api.vercel.app/api/v1/posts/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (!postInfo) {
    return '';
  }

  return (
    <div className='post-page'>
      <h2>{postInfo?.title}</h2>
      <time className='time'>
        {formatISO9075(new Date(postInfo?.createdAt))}
      </time>
      <div className='author'>by {postInfo?.author.username}</div>
      {user?.id === postInfo?.author._id && (
        <div className='btn-row'>
          <Link className='btn edit' to={`/edit/${postInfo?._id}`}>
            Edit Post
          </Link>
          <Link className='btn delete' onClick={deletePost}>
            Delete Post
          </Link>
        </div>
      )}
      <div className='image'>
        {/* <img src={`https://memnets-api.vercel.app/${postInfo?.cover}`} alt='' /> */}
        {/* <img src={`http://localhost:4000${postInfo?.cover}`} alt='' /> */}
        <img src={postInfo?.cover} alt={postInfo?.cover} />
      </div>
      <div
        className='q1-editor'
        dangerouslySetInnerHTML={{ __html: postInfo?.content }}
      />
    </div>
  );
}
