import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

export default function CreatePost() {
  // states for inputs and ReactQuill
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createPost(ev) {
    ev.preventDefault();

    const formData = new FormData();
    formData.set('title', title);
    formData.set('summary', summary);
    formData.set('content', content);
    formData.set('file', files[0]);

    const url = 'http://localhost:4000/api/v1/posts';
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createPost}>
      <input
        type='text'
        placeholder='Enter Post Title'
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type='text'
        placeholder='Summary'
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
      <button style={{ marginTop: '10px' }}>Create Post</button>
    </form>
  );
}
