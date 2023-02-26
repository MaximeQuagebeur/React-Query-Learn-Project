import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const fetchSuperHero = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

// **************************************** Methode "classique" ****************************************
// export const useSuperHeroData = (params) => {
//   return useQuery(['super-hero', params.id], fetchSuperHero, {
//     onSuccess: params.onSuccess,
//     onError: params.onError,
//     // enabled: params.isEnabled,
//     // refetchOnMount: params.isOnMount,
//     // cacheTime: params.cacheTime,
//   });
// };
// *****************************************************************************************************

// **************************************** Methode qui utilise ce qu'il y a dans le cache ****************************************

export const useSuperHeroData = (params) => {
  const queryClient = useQueryClient();
  return useQuery(['super-hero', params.id], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(params.id));
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};

// ********************************************************************************************************************************
