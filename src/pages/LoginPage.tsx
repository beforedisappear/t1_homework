import { LoginForm } from "@/components/loginForm/LoginForm";
import { Helmet } from "react-helmet-async";

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
      </Helmet>

      <LoginForm />
    </>
  );
}
