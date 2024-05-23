'use client';

import Link from "next/link";
import {useEffect, useState, type FormEvent } from 'react';
import {SubmitButton} from "@/app/login/submit-button";
import { createClient } from "@supabase/supabase-js";

export const NewPasswordForm= () => {
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
  }, [refreshToken])


  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password = new FormData(event.currentTarget).get('password') as string;

    if (password !== '' && refreshToken !== '') {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
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
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

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
