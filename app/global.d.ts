// global.d.ts
export {};

declare global {
  interface Window {
    onloadTurnstileCallback?: () => void;
    turnstile?: {
      render: (
        selector: string,
        options: {
          sitekey: string,
          callback: (token: string) => void
        }
      ) => void;
    };
  }
}
