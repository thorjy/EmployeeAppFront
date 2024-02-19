interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const { count, page, onPageChange, rowsPerPage } = props;

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  return (
    <div
      className="pageButtons"
      style={{
        display: "flex",
        color: "rgb(3, 46, 82)",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <button
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        style={{
          fontSize: "medium",
          border: "none",
          color: page === 0 ? "grey" : "rgb(3, 46, 82)",
          background: "none",
          cursor: page === 0 ? "not-allowed" : "pointer",
        }}
      >
        <strong>Previous</strong>
      </button>
      <span
        style={{
          alignContent: "center",
          display: "flexbox",
          justifyContent: "center",
          color: "rgb(3, 46, 82)",
          fontSize: "large",
        }}
      >
        <strong>{page + 1}</strong>
      </span>
      <button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        style={{
          fontSize: "medium",
          border: "none",
          color:
            page >= Math.ceil(count / rowsPerPage) - 1
              ? "grey"
              : "rgb(3, 46, 82)",
          background: "none",
          cursor:
            page >= Math.ceil(count / rowsPerPage) - 1
              ? "not-allowed"
              : "pointer",
        }}
      >
        <strong>Next</strong>
      </button>
    </div>
  );
};
