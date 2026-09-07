'use client';

const HANDOFF_EVENT = 'tb:signup-handoff';

export function handOffEmail(email: string) {
  window.dispatchEvent(new CustomEvent<string>(HANDOFF_EVENT, { detail: email }));
}

export function onEmailHandoff(handler: (email: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
  window.addEventListener(HANDOFF_EVENT, listener);
  return () => window.removeEventListener(HANDOFF_EVENT, listener);
}
