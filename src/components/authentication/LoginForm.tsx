import { Label } from "@radix-ui/react-label";
import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useLogin from "./useLogin";
import useUser from "./useUser";
import { Navigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();

  const { isAuthenticated } = useUser();

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ email, password });
    setEmail("");
    setPassword("");
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <form
      className=" p-5 w-[450px] space-y-6 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 justify-center">
        <Label htmlFor="email" className="font-medium">
          Email address
        </Label>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <Label htmlFor="password" className="font-medium">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
