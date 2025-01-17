const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg
        className="w-12 h-12 animate-spin-slow"
        viewBox="25 25 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="fill-none stroke-indigo-500 stroke-2
          stroke-dasharray-1 stroke-dashoffset-0 animate-dash"
          r="20"
          cy="50"
          cx="50"
        ></circle>
      </svg>
    </div>
  );
};

export default Loader;
