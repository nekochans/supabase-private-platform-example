'use client';

import { SubmitButton } from '@/app/login/submit-button';
import { type FormEvent, useEffect, useState } from 'react';

export const NewPasswordForm = () => {
  const [refreshToken, setRefreshToken] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Remove the leading #
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const extractedRefreshToken = urlParams.get('refresh_token');
      if (extractedRefreshToken != null) {
        setRefreshToken(extractedRefreshToken as string);
      }
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password = new FormData(event.currentTarget).get('password') as string;

    if (password !== '' && refreshToken !== '') {
      const createPasswordResponse = await fetch('http://localhost:24000/auth/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken, password }),
      });

      const createPasswordResponseBody = (await createPasswordResponse.json()) as {
        isSuccess: boolean;
        user?: {
          email: string;
        };
        errorMessage?: string;
      };

      // TODO パスワードリセットに失敗した場合のエラーハンドリングを追加する

      const email = createPasswordResponseBody.user?.email;
      if (email != null && typeof window !== 'undefined') {
        const loginResponse = await fetch('http://localhost:24000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const responseBody = (await loginResponse.json()) as { loginSuccess: boolean; errorMessage?: string };

        if (responseBody.loginSuccess) {
          window.location.href = 'http://localhost:24000/protected';
        }
        // TODO ログイン失敗時のエラーハンドリングを考える
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" onSubmit={onSubmit}>
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="パスワードを設定中..."
        >
          パスワードを設定
        </SubmitButton>
      </form>
    </div>
  );
};
