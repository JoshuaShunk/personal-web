// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';

const verifyTurnstile = async (token: string, secretKey: string, remoteIp?: string) => {
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    body.append('remoteip', remoteIp);
  }

  const response = await fetch(url, {
    method: 'POST',
    body,
  });

  const data = await response.json();
  return data;
};

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const token = data.token;

    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Missing Turnstile token' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // verification logic 
    const verification = await verifyTurnstile(token, process.env.SECRET_KEY!, req.geo?.city);

    if (verification.success) {
        return new NextResponse(JSON.stringify({ message: 'Verification successful' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        return new NextResponse(JSON.stringify({ message: 'Turnstile verification failed', error: verification.errorCodes }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}