const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Đang tải...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
