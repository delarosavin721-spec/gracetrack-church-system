export default function AppLoading({ message = 'Loading…' }) {
  return (
    <div className="page-content flex items-center justify-center min-h-[min(70vh,32rem)]">
      <div className="app-loading">
        <div className="app-loading__spinner" />
        <p className="app-loading__text">{message}</p>
      </div>
    </div>
  )
}
