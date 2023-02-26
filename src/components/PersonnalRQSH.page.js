import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

export const PersonnalRQSH = () => {
  const onSuccess = (data) => {
    console.log('onSuccess on personnal', data.data.length);
  };

  const onError = (error) => {
    console.log('Error on personnal', error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData({
    onSuccess,
    onError,
    isEnabled: false,
    isOnMount: true,
    cacheTime: 0,
  });

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <h2>Personnal React Query Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Data</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.alterEgo}</div>;
      })}
    </>
  );
};
