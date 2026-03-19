import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://scandic-school-api.onrender.com/applications', {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });
    return NextResponse.json({ ok: true, status: res.status, time: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
