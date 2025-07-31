import { Button, Card, CardBody, Input } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { visiblePasword, handleVisiblePassword } = useRegister();
  return (
    <div className="flex w-full flex-col  items-center justify-center gap-10 lg:gap-20 lg:flex-row">
      <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
        <Image 
        src="/images/general/logo.svg" 
        alt="logo"
        width={180}
        height={180}
        />
        <Image
          src="/images/illustration/login.svg"
          alt="login"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8">
        <h2 className="text-xl font-bold text-danger-500">Create Account</h2>
        <p className="text-small mb-4">Have an account?&nbsp;
          <Link href="/login" className="font-semibold text-danger-400"> Login here</Link>
        </p>
        <form className="flex w-80 flex-col gap-4">
          <Input 
          type="text"
          label="fullname"
          variant="bordered"
          autoComplete="off"
          />
            <Input
              type="text"
              label="username"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type="text"
              label="email"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type={visiblePasword.password ? "text" : "password"}
              label="Password"
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  type="button"
                  onClick={() => handleVisiblePassword('password')}
                  className="focus:outline-none"
                >
                  {visiblePasword.password ? <FaEye className="pointer-events-none text-xl text-default-400" /> : <FaEyeSlash className="text-xl text-default-400" />}
                </button>
              }
            />
            <Input
              type={visiblePasword.confirmPassword ? "text" : "password"}
              label="Confirm Password"
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  type="button"
                  onClick={() => handleVisiblePassword('confirmPassword')}
                  className="focus:outline-none"
                >
                  {visiblePasword.confirmPassword ? <FaEye className="pointer-events-none text-xl text-default-400" /> : <FaEyeSlash className="text-xl text-default-400" />}
                </button>
              }
            />
            <Button color="danger" size="lg" type="submit">Register</Button>
        </form>
        </CardBody>
        </Card>
    </div>
  )
}

export default Register