"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "../../../lib/constants";
import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 max-w-screen-sm mx-auto">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl text-gray-500">Welcome</h1>
        <h2 className="text-xl text-gray-500">Sign up today.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3 relative">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          required
          errors={state?.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
        />

        <Button text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
