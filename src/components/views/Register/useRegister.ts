import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authService from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";


const registerSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), ""], "Passwords must match")
        .required("Confirm password is required"),
});

const useRegister = () => {
    const router = useRouter()
    const [visiblePasword, setVisiblePassword] = useState({
        password: false,
        confirmPassword: false
    });

    const handleVisiblePassword = (key: 'password' | 'confirmPassword') => {
        setVisiblePassword({
            ...visiblePasword,
            [key]: !visiblePasword[key],
        })
    }


    const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(registerSchema),
    })

    const registerService = async (payload: IRegister) => {
        const response = await authService.register(payload);
        return response
    }

    const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
        mutationFn: registerService,
        onError(error) {
            setError("root", {
                message: error.message
            })
        },
        onSuccess: () => {
            router.push("/auth/register/success")
            reset()
        }
    })

    const handleRegister = (data:IRegister) => mutateRegister(data)

    return {visiblePasword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors};
}

export default useRegister;
