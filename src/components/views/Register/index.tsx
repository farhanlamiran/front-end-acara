import { Button, Card, CardBody, Input, Spinner, user } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import { object } from "yup";

const Register = () => {
  const { visiblePasword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors } = useRegister();
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
            <Link href="/auth/login" className="font-semibold text-danger-400"> Login here</Link>
        </p>
        {errors.root && (
          <p className="mb-2 font-medium text-danger">{errors?.root?.message}</p>
        )}
        <form 
        className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-5")} 
        onSubmit={handleSubmit(handleRegister)}>
            <Controller name="fullName" control={control} render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="fullname"
                variant="bordered"
                autoComplete="off"
                isInvalid={errors.fullName !== undefined}
                errorMessage={errors.fullName?.message}
              />
            )}
            />
            <Controller name="username" control={control} render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="username"
                variant="bordered"
                autoComplete="off"
                isInvalid={errors.username !== undefined}
                errorMessage={errors.username?.message}
              />
            )}
            />
            <Controller name="email" control={control} render={({ field }) => (
              <Input
                {...field}
                type="email"
                label="email"
                variant="bordered"
                autoComplete="off"
                isInvalid={errors.email !== undefined}
                errorMessage={errors.email?.message}
              />
            )}
            />
            <Controller name="password" control={control} render={({ field }) => (
              <Input
                {...field}
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
                isInvalid={errors.password !== undefined}
                errorMessage={errors.password?.message}
              />
            )}
            />
            <Controller name="confirmPassword" control={control} render={({ field }) => (
              <Input
                {...field}
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
                isInvalid={errors.confirmPassword !== undefined}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
            />

            <Button color="danger" size="lg" type="submit">{isPendingRegister? <Spinner color="white" size="sm"/> : 'Register'}</Button>
        </form>
        </CardBody>
        </Card>
    </div>
  )
}

export default Register