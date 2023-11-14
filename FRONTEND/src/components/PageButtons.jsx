import useEntries from "../hooks/useEntries";
import UsePageNumber from "../hooks/usePageNumber";

export default function PageButton({news}) {
  const {initPage,endPage,setInitPage,setEndPage} = UsePageNumber(6);
  
console.log(news.slice(initPage,endPage))
  
  
  return (
      <>
          <button
              onClick={() => {
                  setInitPage(initPage - 6);
                  setEndPage(endPage - 6);
                  if (initPage <= 0) {
                      setInitPage(0), setEndPage(6);
          }
           console.log(initPage, endPage);
                  
                 
              }}
          >
              Previous
          </button>
          <button
              onClick={() => {
                  if (endPage <= news.length) {
                      setInitPage(initPage + 6);
                      setEndPage(endPage + 6);
                  }
                  console.log(initPage, endPage);
              }}
          >
              Next
          </button>
      </>
  );
}