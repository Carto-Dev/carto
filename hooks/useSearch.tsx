import {useEffect, useState} from 'react';
import {SearchDto} from '../dtos/search/search.dto';
import {ProductModel} from '../models/product.model';
import * as searchService from './../services/search.service';

const useSearch = () => {
  const [query, setQuery] = useState<string>('EMPTY');
  const [categories, setCategories] = useState<string[]>(['EMPTY']);
  const [sortBy, setSortBy] = useState<string>('ASC');

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    searchService
      .searchForProducts(SearchDto.newDto(query, sortBy, categories))
      .then((products) => (mounted ? setProducts(products) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));

    return () => {
      mounted = false;
    };
  }, [query, sortBy, categories]);

  return {
    products,
    query,
    categories,
    sortBy,
    loading,
    setQuery,
    setCategories,
    setSortBy,
  };
};

export default useSearch;
