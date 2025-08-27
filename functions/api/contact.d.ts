declare module 'functions/api/contact' {
  interface ContactFormData {
    name: string;
    email: string;
    company: string;
    message: string;
    stack: string;
    regions: string;
    languages: string;
    preferredCmp: string;
    integrations: string;
    locale: string;
    timestamp: string;
    userAgent: string;
  }

  interface CloudflareContext {
    request: Request;
    env: any;
    ctx: any;
  }

  export function onRequestPost(context: CloudflareContext): Promise<Response>;
  export function onRequestOptions(context: CloudflareContext): Promise<Response>;
}
