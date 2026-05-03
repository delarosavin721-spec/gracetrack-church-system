export default function LoadingSpinner({ fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gold-500/20 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-gold-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="font-outfit text-gold-400 tracking-widest text-sm font-medium animate-pulse">
        LOADING...
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-navy-900 z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return (
    <div className="w-full py-12 flex justify-center">
      {content}
    </div>
  )
}
