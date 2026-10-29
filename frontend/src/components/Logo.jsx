export default function Logo({ className = "" }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="stackGrad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="stackGrad2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
        <linearGradient id="stackGrad3" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      {/* 3D Stack Layer 1 (Bottom Layer) */}
      <path
        d="M5 22L16 16L27 22L16 28L5 22Z"
        fill="url(#stackGrad1)"
        opacity="0.4"
      />

      {/* 3D Stack Layer 2 (Middle Layer) */}
      <path
        d="M5 16L16 10L27 16L16 22L5 16Z"
        fill="url(#stackGrad2)"
        opacity="0.75"
      />

      {/* 3D Stack Layer 3 (Top Layer) */}
      <path
        d="M5 10L16 4L27 10L16 16L5 10Z"
        fill="url(#stackGrad3)"
      />
    </svg>
  );
}
