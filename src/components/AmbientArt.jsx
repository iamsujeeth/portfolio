function Star({ className = '' }) {
  return (
    <g className={className}>
      <path d="M0-9 2-2 9 0 2 2 0 9-2 2-9 0-2-2Z" />
    </g>
  )
}

export default function AmbientArt() {
  return (
    <svg className="ambient-art" viewBox="0 0 200 100" aria-hidden="true" focusable="false">
      <g className="shooting-star moving-star">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path="M50 72 C82 61 126 37 181 18"
        />
        <path className="shooting-star-tail" d="M-7 2 -38 12" />
        <Star />
      </g>
      <g className="shooting-star still-star" transform="translate(181 18)">
        <path className="shooting-star-tail" d="M-7 2 -38 12" />
        <Star />
      </g>
    </svg>
  )
}
