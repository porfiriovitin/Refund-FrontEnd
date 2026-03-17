import { classMerge } from "../utils/classMerge"

type Props= React.ComponentProps<"button"> & {
    isLoading?:boolean
     variant?: "base" | "icon" | "smallIcon"
}

const variants = {
    button:{
        base: "h-12",
        icon: "h-12 w-12",
        smallIcon: "h-6 w-6"
    }
}

export function Button({children, isLoading, className, type="button",variant="base", ...rest}:Props){
    return(
        <button type={type} disabled={isLoading} {...rest} className={
            classMerge([ "w-100 flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50",
                variants.button[variant], className, isLoading && "disabled:cursor-progress"
            ])} 
            {...rest}>{children}</button>
    )
}