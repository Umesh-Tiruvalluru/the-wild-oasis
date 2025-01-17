import LoginForm from "@/components/authentication/LoginForm";
import Logo from "@/components/ui/Logo";

function Login() {
  return (
    <div className="w-screen h-screen font-figtree flex flex-col gap-5 items-center justify-center">
      <div className="">
        <Logo />
      </div>
      <h3 className="font-semibold text-gray-800 text-2xl">
        Log in to your account
      </h3>
      <LoginForm />
    </div>
  );
}

export default Login;
