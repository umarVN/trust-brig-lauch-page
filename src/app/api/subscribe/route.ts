import { NextResponse } from 'next/server';
import { BackendError, graphqlRequest } from '@/lib/backend';
import { subscriberSchema } from '@/lib/subscriber-schema';

const SUBSCRIBE_MUTATION = /* GraphQL */ `
  mutation SubscribeToWaitlist($input: SubscribeInput!) {
    subscribeToWaitlist(input: $input) {
      success
      message
    }
  }
`;

interface SubscribeResult {
  subscribeToWaitlist: { success?: boolean; message: string };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = subscriberSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, company } = parsed.data;

  try {
    const data = await graphqlRequest<SubscribeResult>(SUBSCRIBE_MUTATION, {
      input: { name, email, company: company || null },
    });

    return NextResponse.json(
      { ok: true, message: data.subscribeToWaitlist.message },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof BackendError) {
      // Rate limiting and input rejections are the caller's problem; anything
      // else is ours and must not leak backend detail to the browser.
      const isThrottled = error.code === 'THROTTLED' || /too many/i.test(error.message);

      if (isThrottled) {
        return NextResponse.json(
          { error: 'Too many attempts. Please try again in a minute.' },
          { status: 429 }
        );
      }

      if (error.code === 'BAD_USER_INPUT') {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }

      console.error('[subscribe] backend error:', error.message);
    } else {
      console.error('[subscribe] unexpected error:', error);
    }

    return NextResponse.json(
      { error: 'We could not save your subscription. Please try again.' },
      { status: 502 }
    );
  }
}
