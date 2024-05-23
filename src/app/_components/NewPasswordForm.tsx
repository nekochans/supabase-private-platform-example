'use client';

import { SubmitButton } from '@/app/login/submit-button';
import { createClient } from '@supabase/supabase-js';
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
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      );

      await supabase.auth.refreshSession({ refresh_token: refreshToken as string });

      const { data: userData, error: userError } = await supabase.auth.updateUser({
        password: password,
      });

      // TODO パスワード設定後にログインさせる処理を追加する
      // TODO パスワードリセットに失敗した場合のエラーハンドリングを追加する
      console.log(userData);
      console.log(userError);
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
