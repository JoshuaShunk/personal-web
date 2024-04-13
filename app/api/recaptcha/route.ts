// app/verify-turnstile.ts
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

export const runtime = 'experimental-edge';

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

    //console.log("Token received:", token)
    //console.log("Using secret key:", Boolean(process.env.SECRET_KEY));  // Should log true if key exists

    // Your verification logic here
    const verification = await verifyTurnstile(token, process.env.SECRET_KEY!, req.geo?.city);
    //console.log("Verification successful:", verification.success);
    //console.log("Verification response:", verification);
    if (verification.success) {
        //console.log("Verification successful!!!!!!");
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