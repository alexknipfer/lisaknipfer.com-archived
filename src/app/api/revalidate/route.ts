import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

import { appConfig } from '@/config/app-config';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody(
      req,
      appConfig.sanity.revalidateSecret,
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    console.info('REVALIDATE TAG: ', body._type);
    // revalidateTag(body._type);
    if (body.slug) {
      console.info('REVALIDATE TAG: ', `${body._type}:${body.slug}`);
      revalidateTag('testing');
    }

    return NextResponse.json({ body });
  } catch (err) {
    console.error(err);
    return new Response(err instanceof Error ? err.message : 'Unknown Error', {
      status: 500,
    });
  }
}
