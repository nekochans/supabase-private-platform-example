import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type RequestBody = {
  refreshToken: string;
  password: string;
};

type ResponseBody = {
  isSuccess: boolean;
  user?: {
    email: string;
  };
  errorMessage?: string;
};

export async function POST(request: Request) {
  const requestBody = (await request.json()) as RequestBody;

  const supabase = createClient();

  await supabase.auth.refreshSession({ refresh_token: requestBody.refreshToken });

  const { data, error } = await supabase.auth.updateUser({
    password: requestBody.password,
  });

  const email = data.user?.email;
  if (email && error == null) {
    const status = 200;

    const responseBody = {
      isSuccess: true,
      user: {
        email,
      },
    } as const satisfies ResponseBody;

    return NextResponse.json(responseBody, { status });
  }

  const status = 500;

  const responseBody = {
    isSuccess: false,
    errorMessage: 'failed to set password',
  } as const satisfies ResponseBody;

  return NextResponse.json(responseBody, { status });
}
