import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { socialLogin } from "@lib/api"
import { FacebookLoginClient } from "@greatsumini/react-facebook-login"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import IconGoogle from "@modules/common/icons/google"
import IconFaceBook from "@modules/common/icons/facebook"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  useEffect(() => {
    loadFB()
  }, [])

  const loadFB = async () => {
    FacebookLoginClient.clear()
    await FacebookLoginClient.loadSdk("en_US")
    FacebookLoginClient.init({ appId: "631318755004386", version: "v9.0" })
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const { data } = await axios(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${res?.access_token}`,
          },
        }
      )
      socialLogin({
        first_name: data.given_name,
        last_name: data.family_name,
        email: data.email,
        metadata: {
          ...data,
          from: "google",
        },
      }).then(() => {
        refetchCustomer()
        router.push("/account")
      })
      // console.log(data)
    },
  })

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-4xl uppercase mb-6">Welcome back</h1>
      <p className="text-center text-xl text-gray-700 mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Password"
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              These credentials do not match our records
            </span>
          </div>
        )}
        <Button className="mt-6">Login</Button>
      </form>
      <div className="my-4">OR</div>
      <div className="w-full">
        <div
          className="relative cursor-pointer mb-4 w-full h-[45px] justify-center text-xl flex items-center rounded-full border border-black"
          onClick={() => googleLogin()}
        >
          <IconGoogle className="w-6 h-6 absolute left-4" />
          <span className="text-gray-900">Sign in with Google</span>
        </div>

        <div
          className="relative cursor-pointer w-full h-[45px] justify-center text-xl flex items-center rounded-full border border-black"
          onClick={() => {
            FacebookLoginClient.login(console.log, {
              scope: "public_profile, email",
            })
          }}
        >
          <IconFaceBook className="w-8 h-8 absolute left-4" />
          <span className="ml-3 text-gray-900">Sign in with Facebook</span>
        </div>
      </div>
      <span className="text-center text-gray-700 text-lg mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
