import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type RequestBody = {
  email: string;
  password: string;
};

type ResponseBody = {
  loginSuccess: boolean;
  errorMessage?: string;
};

export async function POST(request: Request) {
  const requestBody = (await request.json()) as RequestBody;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: requestBody.email,
    password: requestBody.password,
  });

  if (error) {
    const status = 500;

    const responseBody = {
      loginSuccess: false,
      errorMessage: 'failed to login',
    } as const satisfies ResponseBody;

    return NextResponse.json(responseBody, { status });
  }

  const status = 200;

  const responseBody = {
    loginSuccess: true,
  } as const satisfies ResponseBody;

  return NextResponse.json(responseBody, { status });
}
