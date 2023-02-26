import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  //   console.log(queryResults.data);

  return (
    <div>
      <h2>Dynamic Parallel Queries</h2>
      {queryResults.map((elem) => (
        <p>{elem.data?.data.name || 'Loading...'}</p>
      ))}
    </div>
  );
};
