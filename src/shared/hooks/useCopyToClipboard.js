import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

/**
 * Copia texto al portapapeles vía navigator.clipboard (API del navegador, sin deps extra).
 */
export function useCopyToClipboard(text, options = {}) {
  const { copiedResetMs, onSuccess, onError } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(async () => {
    setError(null);
    const writeText = globalThis.navigator?.clipboard?.writeText;
    if (typeof writeText !== 'function') {
      const err = new Error('Clipboard API not available');
      flushSync(() => {
        setError(err);
        setCopied(false);
      });
      onError?.(err);
      return;
    }

    try {
      await writeText.call(globalThis.navigator.clipboard, text);
      setCopied(true);
      onSuccess?.();
      if (copiedResetMs != null) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setCopied(false);
          timerRef.current = null;
        }, copiedResetMs);
      }
    } catch (err) {
      flushSync(() => {
        setError(err);
        setCopied(false);
      });
      onError?.(err);
    }
  }, [text, copiedResetMs, onSuccess, onError]);

  return { copy, copied, error };
}
