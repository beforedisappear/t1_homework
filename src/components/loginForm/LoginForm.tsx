import styles from "./loginForm.module.scss";

import { Input } from "@/ui/input/Input";
import { Button } from "@/ui/button/Button";

import { useLoginMutation } from "@/api/authApi";
import { useForm, FormProvider } from "react-hook-form";

import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils";

import type { LoginForm } from "./loginForm.types";
import type { SubmitHandler } from "react-hook-form";

export function LoginForm() {
  const form = useForm<LoginForm>({ mode: "onSubmit" });
  const { handleSubmit } = form;

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    console.log(data);

    const isPending = toast.loading("Sending data...");

    await login({ ...data, expiresInMins: 5 })
      .unwrap()
      .then(() => {
        toast.update(isPending, {
          render: "Successful login",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.update(isPending, {
          render: getErrorMessage(error),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <FormProvider {...form}>
      <article className={styles.login_container}>
        <h1>Sign in</h1>

        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name={"username"}
            placeholder="Login"
            rules={{ required: true }}
          />

          <Input
            type="password"
            name={"password"}
            placeholder="Password"
            rules={{ required: true }}
          />

          <Button variant="primary" disabled={isLoading}>
            Sign in
          </Button>
        </form>
      </article>
    </FormProvider>
  );
}
