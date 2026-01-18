import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

// Define custom toolbar modules
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['blockquote', 'code-block'],
    ['clean'], // remove formatting
  ],
  clipboard: {
    matchVisual: false, // prevents pasting with formatting
  },
};

// Define which formats are allowed
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'list',
  // 'bullet',
  'indent',
  'direction',
  'align',
  'link',
  'image',
  'video',
  'blockquote',
  'code-block',
];

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
        placeholder='Title'
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
      <ReactQuill
        theme='snow'
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
        placeholder='Start writing...'
      />
      <button style={{ marginTop: '10px' }}>Create Post</button>
    </form>
  );
}
