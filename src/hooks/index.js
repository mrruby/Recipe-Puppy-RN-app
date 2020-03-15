import {useEffect, useState} from 'react';

export const useApi = (page, searchValue) => {
  const RESULTS_MAX_COUNT = 10;
  const BASE_API = 'http://www.recipepuppy.com/api';
  const [isLoading, setIsLoading] = useState(false);
  const [recipesList, setRecipesList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!searchValue) {
        return;
      }
      setIsLoading(true);
      const rawData = await fetch(`${BASE_API}/?q=${searchValue}&p=${page}`);
      const data = await rawData.json();
      const recipes = data?.results ?? [];
      setRecipesList(prevState =>
        page === 1 ? recipes : [...prevState, ...recipes],
      );
      setIsLoading(false);
    };
    fetchData();
  }, [page, searchValue]);
  return [isLoading, recipesList, RESULTS_MAX_COUNT];
};
