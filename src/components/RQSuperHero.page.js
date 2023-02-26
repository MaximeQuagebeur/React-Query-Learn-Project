import React from 'react';
import { useSuperHeroData } from '../hooks/useSuperHeroData';
import { useParams } from 'react-router-dom';
// import { useQueryClient, useQuery } from 'react-query';
// import axios from 'axios';

const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  const onSuccess = (data) => {
    console.log('onSuccess', data.data.length);
  };

  const onError = (error) => {
    console.log('Error', error);
  };

  const { isLoading, data, isError, error } = useSuperHeroData({
    onSuccess,
    onError,
    id: heroId,
  });

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <p>Name: {data.data.name}</p>
        <p>Alter Ego: {data.data.alterEgo}</p>
      </div>
    </>
  );
};

export default RQSuperHeroPage;
