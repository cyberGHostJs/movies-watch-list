const ErrorPage = () => {
  return (
    <p style={{ color: "grey" }} className="emptyList_alert">
      An Error Occured Reload Page
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="#f33f3f"
        className="bi bi-exclamation-lg exclamation"
        viewBox="0 0 16 16"
      >
        <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
      </svg>
    </p>
  );
};

export default ErrorPage;
