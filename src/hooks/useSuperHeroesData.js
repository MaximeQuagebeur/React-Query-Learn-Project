import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};

export const useSuperHeroesData = (params) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess: params.onSuccess,
    onError: params.onError,
    // enabled: params.isEnabled,
    // refetchOnMount: params.isOnMount,
    // cacheTime: params.cacheTime,
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // Utile pour la 2ème façon: on récupère 'data', qui est la réponse de la requête passée
    onSuccess: (data) => {
      // *****************************************************************************************
      // Permet "d'invalider" le client, donc refetch automatiqueent lors du succès de la mutation
      // queryClient.invalidateQueries('super-heroes');
      // *****************************************************************************************
      // Permet d'ajouter la réponse de la requête au cache de la query choisie (ici => 'super heroes')
      // On récupère les données actuelles du cache automatiquement en paramètre de la fonction en 2nd argument (ici => oldQueryData)
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        console.log('oleQueryData', oldQueryData);
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
