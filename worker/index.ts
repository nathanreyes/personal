const CONTACT_PATH = '/api/contact';
const CONTACT_TO = 'nathanreyes.me@gmail.com';
const CONTACT_FROM = 'website@nathanreyes.com';
const MAX_BODY_BYTES = 16_384;

type Contact = {
  name: string;
  email: string;
  message: string;
};

function text(form: FormData, field: string): string {
  const value = form.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Strips CR/LF and other control characters so a name cannot forge a header. */
function cleanHeader(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function parseContact(form: FormData): Contact | null {
  const contact = {
    name: text(form, 'name'),
    email: text(form, 'email'),
    message: text(form, 'message'),
  };

  if (
    contact.name.length < 2 ||
    contact.name.length > 80 ||
    !isEmail(contact.email) ||
    contact.message.length < 10 ||
    contact.message.length > 4000
  ) {
    return null;
  }

  return contact;
}

/**
 * The site ships no JavaScript, so the form is a plain POST and the reply is a
 * redirect the browser can follow on its own.
 */
function redirect(request: Request, path: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL(path, request.url).toString(),
      'Cache-Control': 'no-store',
    },
  });
}

function contactEmail(contact: Contact) {
  return {
    to: CONTACT_TO,
    from: { email: CONTACT_FROM, name: 'nathanreyes.com' },
    replyTo: contact.email,
    subject: `Website inquiry from ${cleanHeader(contact.name)}`,
    text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`,
    html:
      `<p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>` +
      `<p><strong>Message:</strong></p>` +
      `<p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>`,
  };
}

export async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'POST', 'Cache-Control': 'no-store' },
    });
  }

  const contentType = request.headers.get('Content-Type') ?? '';
  const contentLength = Number(request.headers.get('Content-Length'));
  if (
    (!contentType.startsWith('multipart/form-data') &&
      !contentType.startsWith('application/x-www-form-urlencoded')) ||
    !Number.isFinite(contentLength) ||
    contentLength <= 0 ||
    contentLength > MAX_BODY_BYTES
  ) {
    return redirect(request, '/contact/?error=invalid');
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect(request, '/contact/?error=invalid');
  }

  // Honeypot: bots fill every field, people never see this one.
  if (text(form, 'website')) return redirect(request, '/contact/success/');

  const contact = parseContact(form);
  if (!contact) return redirect(request, '/contact/?error=invalid');

  const clientIp = request.headers.get('CF-Connecting-IP') ?? '';
  const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: clientIp });
  if (!success) return redirect(request, '/contact/?error=rate');

  try {
    const result = await env.CONTACT_EMAIL.send(contactEmail(contact));
    console.log(
      JSON.stringify({ message: 'Contact email sent', messageId: result.messageId }),
    );
    return redirect(request, '/contact/success/');
  } catch (error) {
    console.error(
      JSON.stringify({
        message: 'Contact email failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    );
    return redirect(request, '/contact/?error=send');
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== CONTACT_PATH) {
      return new Response('Not found', { status: 404 });
    }

    return handleContact(request, env);
  },
} satisfies ExportedHandler<Env>;
