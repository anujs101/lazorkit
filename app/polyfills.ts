import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window;
  // @ts-ignore
  window.Buffer = Buffer;
}