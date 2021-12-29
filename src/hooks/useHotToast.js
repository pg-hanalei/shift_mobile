import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";

export const useHotToast = () =>{

    const successToast = useCallback((text) => {
        toast(
            text,
            {
                icon: '👏',
                style: {
                    background: "#00cc00",
                    color: '#fff',
                },
                duration: 3000,
            }
        )
    },[])

    const errorToast = useCallback((text) => {
        toast(
            text,
            {
                icon: '❌',
                style: {
                    background: "#dc143c",
                    color: '#fff',
                }
            }
        )
    },[])

    return {Toaster, successToast, errorToast}
}