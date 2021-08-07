import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

// import useFetch from '../hooks/useFetch';


const REVIEWS = gql`
query GetReviews {
  reviews {
    id,
    title,
    rating,
    body,
    categories{
      name,
      id
    }
  }
}
`;
// const URL = 'http://localhost:1337/reviews'

export default function Homepage() {
  // const { loading, error, data } = useFetch('http://localhost:1337/reviews');
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <p>loading...</p>
  if (error) return <p>Error :'(</p>
  // console.log(data.reviews)
  return (
    <div>
      {
        data.reviews.map(review => (
          <div key={review.id} className='review-card'>
            <div className='rating'>{review.rating}</div>
            <h2>{review.title}</h2>
            {review.categories.map(category => (
              <small key={category.id}>{category.name}</small>
            ))}
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{review.body.substring(0, 100)} ...</ReactMarkdown>
            <Link to={`details/${review.id}`}>Read More</Link>
          </div>
        ))
      }
    </div>
  )
}
 /*
{data.map(review => (
<div key={review.id} className='review-card'>
<div className='rating'>{review.rating}</div>
<h2>{review.title}</h2>
<small>console list</small>
<p>{review.body}</p>
</div>
))}
*/