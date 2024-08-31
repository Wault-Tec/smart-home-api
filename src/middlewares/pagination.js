export default function pagination(req, res, next) {
  const defaultPageIndex = null;
  const defaultRecordsPerPage = 5;

  const pageIndex = parseInt(req?.query?.page || defaultPageIndex);
  const recordsPerPage = parseInt(req?.query?.recordsPerPage || defaultRecordsPerPage);
  
  if (isNaN(pageIndex) || isNaN(recordsPerPage)) {
      return next();
  }

  const getFiltredData = (arr) => {
    const startIndex = (pageIndex - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, arr.length);
    const filtredArr = arr.slice(startIndex, endIndex);
    const totalRecords = arr.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    return {
      data: filtredArr,
      totalRecords,
      totalPages
    }
  }
  
  req.pagination = {
      pageIndex,
      recordsPerPage,
      getFiltredData
  };
  
  next();
}