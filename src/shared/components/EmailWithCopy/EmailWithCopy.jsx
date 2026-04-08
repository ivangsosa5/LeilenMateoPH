import React from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const DEFAULT_EMAIL = 'hello@leilenmateo.com';

const mailIcon = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" />
  </svg>
);

export default function EmailWithCopy({
  email = DEFAULT_EMAIL,
  variant,
  className = '',
}) {
  const { copy, copied } = useCopyToClipboard(email, { copiedResetMs: 2500 });

  const liveRegion = (
    <span
      aria-live="polite"
      role="status"
      className={`pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white transition-opacity duration-300 ${
        copied ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {copied ? 'Copiado' : ''}
      <span className="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-gray-800" />
    </span>
  );

  if (variant === 'iconOnly') {
    const ariaLabel = `Copiar correo ${email} al portapapeles`;
    return (
      <div className="relative group text-sm inline-block">
        <button
          type="button"
          onClick={async () => {
            await copy();
          }}
          className="p-3 rounded-full hover:bg-gray-200 transition-colors text-current"
          aria-label={ariaLabel}
        >
          {mailIcon}
        </button>
        {/* Tooltip superior – se ve al hacer hover */}
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 text-sm"
        >
          Copiar al portapapeles
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
        {/* Badge inferior – aparece al copiar */}
        {liveRegion}
      </div>
    );
  }

  return (
    <div className={`text-gray-600 text-sm ${className}`.trim()}>
      <div className="relative group mx-28">
        <button
          type="button"
          onClick={async () => {
            await copy();
          }}
          className="inline-flex items-center justify-center rounded p-1 text-gray-600 hover:bg-gray-200/80 transition-colors"
          aria-label={`Copiar correo ${email} al portapapeles`}
        >
          {email}
        </button>

        {/* Tooltip superior – se ve al hacer hover */}
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          Copiar al portapapeles
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>

        {/* Badge inferior – aparece al copiar */}
        {liveRegion}
      </div>
    </div>
  );
}
