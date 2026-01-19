import { formatISO9075 } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchPost() {
      try {
        const url = `http://localhost:4000/api/v1/posts/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setPostInfo(data);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchPost();
  }, []);

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
          <Link className='btn edit' to={`edit/${postInfo?._id}`}>
            Edit Post
          </Link>
          <a className='btn delete' href=''>
            Delete Post
          </a>
        </div>
      )}
      <div className='image'>
        <img src={`http://localhost:4000${postInfo?.cover}`} alt='' />
      </div>
      <div
        className='q1-editor'
        dangerouslySetInnerHTML={{ __html: postInfo?.content }}
      />
    </div>
  );
}
