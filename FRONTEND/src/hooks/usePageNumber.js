import { useState } from 'react';

const UsePageNumber = (newsForPage) => {
    const [initPage, setInitPage] = useState(0);
  const [endPage, setEndPage] = useState(newsForPage);
  const [slicePage, setSlicePage] = useState()

    return {
        initPage,
        endPage,
        setInitPage,
        setEndPage,
        slicePage,
        setSlicePage,
    };
};
export default UsePageNumber;
