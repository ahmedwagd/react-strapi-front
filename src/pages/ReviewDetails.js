import React from 'react';
import { useParams } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';


const REVIEW = gql`
query GetReview($id: ID!) {
  review(id: $id) {
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


export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  });
  // console.log(data)
  // const { loading, error, data } = useFetch(`http://localhost:1337/reviews/${id}`);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div className='review-card'>
      <div className='rating'>{data.review.rating}</div>
      <h2>{data.review.title}</h2>
      {data.review.categories.map(category => (
        <small key={category.id}>{category.name}</small>
      ))}
      <ReactMarkdown>{data.review.body}</ReactMarkdown>
    </div>
  )
}
