import { Link } from 'react-router-dom';
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData';
import { useState } from 'react';

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('onSuccess', data.data.length);
  };

  const onError = (error) => {
    console.log('Error', error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData({
    onSuccess,
    onError,
    isEnabled: true,
  });

  const { mutate } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log(name, alterEgo);
    const hero = { name, alterEgo };
    mutate(hero);
  };

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Super Hero's Name"
      />
      <input
        type="text"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
        placeholder="AlterEgo"
      />
      <button onClick={handleAddHeroClick}>Add Hero</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      <button onClick={refetch}>Fetch Heroes again</button>
    </>
  );
};
