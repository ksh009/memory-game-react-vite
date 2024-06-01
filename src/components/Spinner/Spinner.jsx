export const Spinner = () => {
  return (
    <div
      role="status"
      aria-label="Loading Spinner"
      className="flex justify-center items-center w-1/1 h-1/1"
    >
      <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-gray-900">
        ...Loading
      </div>
    </div>
  );
};
