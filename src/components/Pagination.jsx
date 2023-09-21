import ReactPaginate from "react-paginate";

const Pagination = ({ className = "", children }) => {
  return (
    <div className={"pt-4 " + className} role="navigation" aria-label="pagination">
      {children}
    </div>
  );
};

const PaginationContent = ({ className = "", children, ...props }) => {
  return (
    <nav
      {...props}
      className={
        "flex flex-col items-center justify-between md:flex-row lg:flex-row xl:flex-row " +
        className
      }
      role="navigation"
      aria-label="pagination">
      {children}
    </nav>
  );
};

const PaginationInfo = ({ className = "", children }) => {
  return (
    <span className={"mb-2 text-sm font-normal text-neutral-80 " + className}>{children}</span>
  );
};

const PaginationLink = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={<i className="fa-solid fa-angle-left text-sm"></i>}
      nextLabel={<i className="fa-solid fa-angle-right text-sm"></i>}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"inline-flex items-center -space-x-px"}
      pageLinkClassName={
        "px-3 py-2 leading-tight text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      }
      previousLinkClassName={
        "ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-secondary-navy hover:bg-blue-100 hover:text-indigo-800"
      }
      nextLinkClassName={
        "ml-0 block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-secondary-navy hover:bg-gray-50 hover:text-indigo-800"
      }
      activeLinkClassName={
        "z-10 px-3 font-semibold py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-100 hover:bg-blue-100 hover:text-blue-700"
      }
      disabledLinkClassName={
        "cursor-not-allowed bg-neutral-20 font-normal leading-tight text-neutral-40"
      }
    />
  );
};

Pagination.PaginationContent = PaginationContent;
Pagination.PaginationInfo = PaginationInfo;
Pagination.PaginationLink = PaginationLink;

export default Pagination;
