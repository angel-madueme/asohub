import { getDb } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch (error) {
      console.error('Could not read fitting request JSON.', error);
      return Response.json(
        { error: 'Send a valid JSON request.' },
        { status: 400 },
      );
    }

    if (typeof body !== 'object' || body === null) {
      return Response.json(
        { error: 'Send full name, phone and outfit type as text.' },
        { status: 400 },
      );
    }

    const { full_name, phone, outfit_type } = body as Record<string, unknown>;

    if (
      typeof full_name !== 'string' ||
      typeof phone !== 'string' ||
      typeof outfit_type !== 'string'
    ) {
      return Response.json(
        { error: 'Send full name, phone and outfit type as text.' },
        { status: 400 },
      );
    }

    const saved = await getDb().fittingRequest.create({
      data: { full_name, phone, outfit_type },
      select: { id: true, created_at: true },
    });

    return Response.json(saved, { status: 201 });
  } catch (error) {
    console.error('Could not save fitting request.', error);
    return Response.json(
      { error: 'Your fitting request could not be saved. Please try again.' },
      { status: 500 },
    );
  }
}
