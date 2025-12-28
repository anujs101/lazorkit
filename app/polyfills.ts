import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window;
  // @ts-ignore
  window.Buffer = Buffer;
  // @ts-ignore
  globalThis.global = globalThis;
  // @ts-ignore
  if (!globalThis.process) {
    // @ts-ignore
    globalThis.process = {
      env: {
        NODE_ENV: 'production',
      },
    };
  }
} else if (typeof globalThis !== 'undefined') {
  // @ts-ignore
  globalThis.global = globalThis;
}