



export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#09090b">

      <div className="w-16 h-16 border-4 border-t-red-700 border-gray-300 rounded-full animate-spin"></div>

      <h1 className="mt-6 text-3xl font-bold text-white">Loading...</h1>
      <p className="mt-2 text-lg text-gray-400 font-bold">
        Please wait while we load your content.
      </p>
    </div>
  );
}

