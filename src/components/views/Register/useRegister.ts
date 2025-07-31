import { pre } from "framer-motion/client";
import { useState } from "react";

const useRegister = () => {
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
    return {visiblePasword, handleVisiblePassword};
}

export default useRegister;
