import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-start justify-between">
      <div>
        <h2 className="text-2xl">Already have an account?</h2>
        <p className="text-xl text-gray-700 mt-2">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <a className="hover:underline text-2xl">Sign in</a>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
