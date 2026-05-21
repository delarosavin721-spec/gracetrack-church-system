export default function PageBackground({ variant = 'app', className = '' }) {
  const isHero = variant === 'hero'
  const isAuth = variant === 'auth'

  return (
    <div
      className={`page-bg page-bg--${variant} ${className}`}
      aria-hidden
    >
      <div
        className="page-bg__image"
        style={{ backgroundImage: "url('/bg-church.jpg')" }}
      />
      <div
        className={`page-bg__overlay ${isHero ? 'page-bg__overlay--hero' : ''} ${isAuth ? 'page-bg__overlay--auth' : ''}`}
      />
      {!isHero && <div className="page-bg__mesh" />}
    </div>
  )
}
