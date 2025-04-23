interface HdividerProps {
  message?: string;
  className?: string;
}

const Hdivider = ({ message = "", className = "" }: HdividerProps) => {
  // This component is a horizontal divider
  return (
    <div className={"w-full h-[1px] bg-gray-300 my-4 dark:bg-gray-700 " + className}>
      {message && (
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
          {message}
        </span>
      )}
    </div>
  );
};

export default Hdivider;
