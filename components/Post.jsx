export default function Post(props) {
  return (
    <div className='post'>
      <div className='image'>
        <img src={`http://localhost:4000${props.cover}`} alt='' />
      </div>
      <div className='texts'>
        <h2>{props.title}</h2>
        <p className='info'>
          <a href='' className='author'>
            Akuna Joshua
          </a>
          <time>{props.createdAt}</time>
        </p>
        <p className='summary'>{props.summary}</p>
      </div>
    </div>
  );
}
