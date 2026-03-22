const LoadingUsers = () => {
  return (
    <div className="flex flex-col gap-2 px-2 mt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          key={i}
        >
          <div className="w-10 h-10 rounded-full bg-gray-700/50" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-700/50 rounded w-3/4" />
            <div className="h-2 bg-gray-700/30 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingUsers;
