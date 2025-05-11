import { Text, TouchableOpacity } from "react-native";

const typeButton = {
    loginDefault: "bg-[#155DFC] w-[84%] rounded-lg flex items-center py-[12px] justify-center",
    loginGoogle: "bg-[#F9FAFB] w-[84%] rounded-lg flex items-center py-[12px] justify-center",
    register: "bg-[##00A63E] w-[84%] rounded-lg flex items-center py-[12px] justify-center",
};

interface ButtonProps {
    type?: keyof typeof typeButton;
    className?: string;
    title?: string;
}

export default function Button({ type, className, title }: ButtonProps) {



    return (
        <>
            <TouchableOpacity className={`${type ? typeButton[type] : ''} ${className}`}>
                <Text className={`font-bold text-xl ${type === "loginDefault"
                    ? "text-white"
                    : type === "register"
                        ? "text-white"
                        : "text-[#101828]"
                    }`}>
                    {title}
                </Text>

            </TouchableOpacity>

        </>
    )


}