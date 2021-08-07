import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';


const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id,
      name,
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
  }
`;

export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  });
  if (loading) return <p>loading categories...</p>
  if (error) return <p>Error fetching categories :'(</p>
  console.log(data)
  return (
    <div>
      <h2>{data.category.name}</h2>
      {
        data.category.reviews.map(review => (
          <div key={review.id} className='review-card'>
            <div className='rating'>{review.rating}</div>
            <h2>{review.title}</h2>
            {review.categories.map(category => (
              <small key={category.id}>{category.name}</small>
            ))}
            <p>{review.body.substring(0, 100)} ...</p>
            <Link to={`details/${review.id}`}>Read More</Link>
          </div>
        ))
      }
    </div>
  )
}
