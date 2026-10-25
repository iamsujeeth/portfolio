export default function AmbientArt() {
  return (
    <svg className="ambient-art" viewBox="0 0 220 180" aria-hidden="true" focusable="false">
      <circle className="ambient-art-orbit" cx="126" cy="86" r="54" />
      <circle className="ambient-art-orbit ambient-art-orbit-inner" cx="126" cy="86" r="35" />
      <path
        id="ambient-art-path"
        className="ambient-art-trace"
        d="M18 148 C48 148 52 116 82 123 S123 142 145 101 S177 83 202 34"
      />
      <path
        className="ambient-art-trace ambient-art-trace-dash"
        d="M18 148 C48 148 52 116 82 123 S123 142 145 101 S177 83 202 34"
      />
      <circle className="ambient-art-node" cx="18" cy="148" r="4" />
      <circle className="ambient-art-node ambient-art-node-delay" cx="82" cy="123" r="4" />
      <circle className="ambient-art-node ambient-art-node-delay-long" cx="145" cy="101" r="4" />
      <circle className="ambient-art-packet" cx="18" cy="148" r="3.5">
        <animateMotion dur="9s" repeatCount="indefinite" path="M18 148 C48 148 52 116 82 123 S123 142 145 101 S177 83 202 34" />
      </circle>
      <path className="ambient-art-spark" d="M177 119v14m-7-7h14m-12-5 10 10m0-10-10 10" />
      <circle className="ambient-art-dot" cx="44" cy="51" r="2" />
      <circle className="ambient-art-dot ambient-art-dot-delay" cx="185" cy="65" r="2" />
    </svg>
  )
}
