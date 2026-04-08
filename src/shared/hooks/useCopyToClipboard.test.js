import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './useCopyToClipboard.js';

const TEXT = 'hello@leilenmateo.com';

describe('useCopyToClipboard', () => {
  let writeText;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });
  });

  it('expone copy, copied inicial false y error nulo', () => {
    const { result } = renderHook(() => useCopyToClipboard(TEXT));

    expect(typeof result.current.copy).toBe('function');
    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('en éxito llama a clipboard.writeText con el texto y pone copied en true', async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard(TEXT, { copiedResetMs: 1500 })
    );

    await act(async () => {
      await result.current.copy();
    });

    expect(writeText).toHaveBeenCalledWith(TEXT);
    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('tras copiedResetMs vuelve copied a false', async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard(TEXT, { copiedResetMs: 800 })
    );

    await act(async () => {
      await result.current.copy();
    });
    expect(result.current.copied).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(800);
    });

    expect(result.current.copied).toBe(false);
  });

  it('si writeText rechaza, setea error y no lanza', async () => {
    const err = new Error('clipboard denied');
    writeText.mockRejectedValueOnce(err);
    const { result } = renderHook(() => useCopyToClipboard(TEXT));

    await expect(
      act(async () => {
        await result.current.copy();
      })
    ).resolves.toBeUndefined();

    expect(result.current.error).toBe(err);
    expect(result.current.copied).toBe(false);
  });

  it('sin navigator.clipboard no lanza y setea error', async () => {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useCopyToClipboard(TEXT));

    await expect(
      act(async () => {
        await result.current.copy();
      })
    ).resolves.toBeUndefined();

    expect(result.current.error).toBeTruthy();
    expect(result.current.copied).toBe(false);
  });

  it('invoca onSuccess tras copiar bien', async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useCopyToClipboard(TEXT, { onSuccess })
    );

    await act(async () => {
      await result.current.copy();
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('invoca onError cuando falla la API', async () => {
    const err = new Error('fail');
    writeText.mockRejectedValueOnce(err);
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useCopyToClipboard(TEXT, { onError })
    );

    await act(async () => {
      await result.current.copy();
    });

    expect(onError).toHaveBeenCalledWith(err);
  });

  it('opcional: si expone status, idle al inicio y copied tras éxito', async () => {
    const { result } = renderHook(() => useCopyToClipboard(TEXT));

    if (!('status' in result.current)) return;

    expect(result.current.status).toBe('idle');

    await act(async () => {
      await result.current.copy();
    });
    expect(result.current.status).toBe('copied');
  });
});
