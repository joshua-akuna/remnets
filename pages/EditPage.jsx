import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState(null);
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(null);
  const { id } = useParams();

  const updatePost = async (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.set('title', title);
    formData.set('summary', summary);
    formData.set('content', content);
    formData.set('file', files?.[0]);

    // const url = `http://localhost:4000/api/v1/posts/${id}`;
    const url = `https://memnet-api.vercel.app/api/v1/posts/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });
    // const data = await response.json();
    // console.log(data);
    if (response.ok) {
      setRedirect(true);
    }
  };

  // TODO: debug redirect
  if (redirect) {
    return <Navigate to={`/posts/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type='text'
        value={title}
        placeholder='Enter Post Title'
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Post Summary'
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type='file'
        name='file'
        id='file'
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '10px' }}>Edit Post</button>
    </form>
  );
}
