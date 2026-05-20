export default function AuthField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
  icon,
  suffix,
  id,
}) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="auth-field">
      <label htmlFor={inputId} className="auth-field__label">
        {label}
      </label>
      <div className="auth-field__wrap">
        {icon && <span className="auth-field__icon" aria-hidden>{icon}</span>}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`auth-field__input ${icon ? 'auth-field__input--icon' : ''} ${suffix ? 'auth-field__input--suffix' : ''}`}
        />
        {suffix}
      </div>
    </div>
  )
}
