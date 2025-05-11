import {
    TextInput
} from "react-native";

interface InputsProps extends React.ComponentProps<typeof TextInput> {
    placeholder: string;
    className?: string;
}

export default function Inputs({ placeholder, className, ...rest }: InputsProps) {

    return (
        <>

            <TextInput
                {...rest}
                placeholder={placeholder}
                className={`bg-[#364153] leading-[20px] pl-5 border border-transparent focus:border-white rounded-lg placeholder:text-[#838C9B] text-white w-[84%] h-14 text-lg ${className}`}
            />
        </>
    )
}