import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

const ParallelQueriesPage = () => {
  const { data: shData, isLoading, isError, error } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friendsData } = useQuery('friends', fetchFriends);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>Parallel Queries Page</h2>
      {shData?.data.map((elem) => (
        <div key={elem.name}>{elem.name}</div>
      ))}
      <br />
      {friendsData?.data.map((elem) => (
        <div key={elem.name}>{elem.name}</div>
      ))}
    </div>
  );
};

export default ParallelQueriesPage;
