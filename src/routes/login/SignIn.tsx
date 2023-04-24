import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import InputTSX from "./components/Input";
import { login } from "~/redux/slices/auth";
import { useAppDispatch } from "~/redux/store";
import { useNavigate } from "react-router-dom";

type FormDataType = {
  username: string;
  password: string;
};

function SignInPage() {
  const scheme: ZodType<FormDataType> = z.object({
    username: z.string(),
    password: z.string().min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(scheme) });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function onSubmit(data: FormDataType) {
    const username = data.username;
    const password = data.password;
    dispatch(login({ username, password }));
  }

  function signUp() {
    navigate("/auth/signup");
  }

  function forgotPassword() {}

  return (
    <>
      <div className="w-full h-[44rem] flex">
        <div className="md:flex m-auto rounded-lg border drop-shadow-xl w-4/5 md:h-4/5 overflow-hidden">
          <div className="w-full h-full md:w-2/3 max-md:py-4 bg-white center-flex">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-4/5 md:w-2/3 lg:w-1/2 text-center"
            >
              <div className="text-green-500 font-bold text-3xl">
                Sign in to Account
              </div>
              <hr className="w-12 border-4 border-green-500 rounded mx-auto my-6" />
              <InputTSX<FormDataType>
                name="username"
                label="Username or Email"
                errors={errors}
                register={register}
              />
              <br />
              <InputTSX<FormDataType>
                name="password"
                type="password"
                label="Password"
                errors={errors}
                register={register}
              />
              <br />
              <div className="md:flex justify-end font-bold">
                <a onClick={forgotPassword} href="">
                  Forgot Password?
                </a>
              </div>
              <input
                value="Sign In"
                type="submit"
                className="px-12 py-2 bg-green-500 text-white mt-8 rounded-3xl whitespace-nowrap font-bold cursor-pointer"
              />
              <div className="md:hidden">
                <br />
                <a onClick={signUp} className="text-blue-500 font-bold" href="">
                  Don't have an account?
                </a>
              </div>
            </form>
          </div>
          <div className="max-md:hidden w-1/3 bg-green-400 center-flex">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">Hello, Friend!</div>
              <hr className="w-12 border-4 border-white rounded mx-auto my-6" />
              <div>Sign up to join us</div>
              <button
                onClick={signUp}
                className="px-12 py-2 border-2 border-white mt-8 rounded-3xl whitespace-nowrap font-bold"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
