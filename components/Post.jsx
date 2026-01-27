import { formatISO9075 } from 'date-fns/fp';
import { Link } from 'react-router-dom';

export default function Post(props) {
  return (
    <div className='post'>
      <div className='image'>
        <Link to={`posts/${props._id}`}>
          {/* <img src={`https://memnet-api.vercel.app${props.cover}`} alt='' /> */}
          {/* <img src={`http://localhost:4000${props.cover}`} alt='' /> */}
          <img src={props.cover} alt={props.cover} />
        </Link>
      </div>
      <div className='texts'>
        <Link to={`posts/${props._id}`}>
          <h2>{props.title}</h2>
        </Link>
        <p className='info'>
          <a href='' className='author'>
            {props.author.username}
          </a>
          <time>{formatISO9075(new Date(props.createdAt))}</time>
        </p>
        <p className='summary'>{props.summary}</p>
      </div>
    </div>
  );
}
