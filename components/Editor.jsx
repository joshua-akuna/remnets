import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

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

export default function Editor({ value, onChange }) {
  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
      placeholder='Start writing...'
    />
  );
}
