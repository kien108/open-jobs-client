import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const shortName = {
  asc: 'ascend',
  desc: 'descend'
};

export interface IParams {
  sort: string;
  page: number;
  size: number;
}

const useTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortQueryString = searchParams.get('sort');
  const sortArray = sortQueryString ? sortQueryString.split(',') : ['', ''];
  const sortBy = sortArray[0];
  const sortDirection = sortArray[1];
  const [sort, setSort] = useState({
    sortBy: sortBy,
    sortDirection: shortName[sortDirection as keyof typeof shortName]
  });
  const countRerender = useRef(0);
  const [params, setParams] = useState<IParams>({
    sort: `${sortBy},${sortDirection}`,
    page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0,
    size: searchParams.get('size') ? parseInt(searchParams.get('size') as string) : 10
  });
  const onSort = (sortValue: any) => {
    const { order, field } = sortValue;
    const newParams = { ...params };
    if (order) {
      const sortString = `${field},${Object.keys(shortName).find(
        (key) => shortName[key as keyof typeof shortName] === order
      )}`;
      searchParams.set('sort', sortString);
      setSearchParams(searchParams);
      newParams.sort = sortString;
      setParams(newParams);
    } else {
      if (searchParams.has('sort')) {
        searchParams.delete('sort');
        setSearchParams(searchParams);
      }
      // @ts-ignore
      delete newParams.sort;
      setParams(newParams);
    }
    setSort((prev) => {
      return {
        sortBy: field ?? '',
        sortDirection: field ? order : ''
      };
    });
  };
  const tableParams = ['sort', 'page', 'size'];
  const otherParams = useRef(null as any);

  const setPage0 = () => {
    setParams((prev) => {
      return {
        ...prev,
        page: 0
      };
    });
    searchParams.set('page', '0');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // }
    let otherParamsArray: [string, string | number][] = [['1', 1]];
    let isEmpty = false;
    if (otherParams.current) {
      isEmpty = Object.keys(otherParams.current).length === 0;

      if (!isEmpty) {
        otherParamsArray = Object.entries(otherParams.current);
      }
    }
    let alterArray = [...otherParamsArray];
    countRerender.current++;
    let i = 0;
    while (i < otherParamsArray.length) {
      searchParams.forEach((value, key) => {
        if (otherParams.current) {
          isEmpty = Object.keys(otherParams.current).length === 0;

          if (!isEmpty) {
            alterArray = Object.entries(otherParams.current);
          }
        }
        if (alterArray.length !== otherParamsArray.length) {
          setPage0();
        }
        if (
          otherParamsArray[i][0] !== '1' &&
          searchParams.get(otherParamsArray[i][0]) &&
          searchParams.get(otherParamsArray[i][0]) !== otherParamsArray[i][1] &&
          !tableParams.includes(otherParamsArray[i][0])
        ) {
          setPage0();
        }
        if (
          !searchParams.get(otherParamsArray[i][0]) &&
          otherParams.current &&
          otherParams.current[otherParamsArray[i][0]] !== searchParams.get(otherParamsArray[i][0])
        ) {
          if (otherParamsArray[i][0] !== '1') {
            setPage0();
          }
          delete otherParams.current[otherParamsArray[i][0]];
        }
        if (
          countRerender.current > 1 &&
          !tableParams.includes(key) &&
          otherParamsArray[i][0] === '1'
        ) {
          setPage0();
        }
        if (otherParams.current) {
          if (isEmpty && !tableParams.includes(key)) {
            setPage0();
          }
        }

        if (!tableParams.includes(key)) {
          otherParams.current = {
            ...otherParams.current,
            [key]: value
          };
        }
      });
      i++;
    }
  }, [searchParams]);

  return { onSort, params, setParams, sort, setSort, searchParams, setSearchParams };
};
export default useTable;
