export default function Brand({ light = false, className = '' }) {
  return (
    <span className={`brand-lockup ${light ? 'brand-lockup-light' : ''} ${className}`.trim()}>
      <img src="/assets/simpleflow-mark.svg" alt="" aria-hidden="true" />
      <span>Simple Flow</span>
    </span>
  )
}
