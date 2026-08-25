export default function Brand({ light = false, className = '' }) {
  return (
    <img
      className={`brand-lockup ${light ? 'brand-lockup-light' : ''} ${className}`.trim()}
      src="/assets/simpleflow-logo.svg"
      alt="Simple Flow – online vállalkozástámogatás"
    />
  )
}
