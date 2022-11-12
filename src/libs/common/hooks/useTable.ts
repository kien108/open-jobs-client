import { useState } from 'react';

const useTable = () => {
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  return { size, page, setSize, setPage };
};

export default useTable;
