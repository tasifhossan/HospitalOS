'use client';

export function useDemoMode() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  return {
    isDemoMode,
    toggleUnavailable: true, // read-only property indicating manual toggle is locked
  };
}
