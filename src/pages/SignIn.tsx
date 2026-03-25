import { Input } from "../components/Input"
import { Button } from "../components/button"
import { useActionState } from "react"
import { z, ZodError} from "zod"
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"

import { AxiosError } from "axios"

const signInSchema = z.object({
    email: z.email({message:"E-mail inválido"}).min(1, {message:"Informe o email"}),
    password: z.string().min(6, {message:"A senha deve conter no mínimo 6 caracteres"})
})

export function SignIn(){
    const [state, formAction, isLoading] = useActionState(signIn, null)

    const auth = useAuth()

    async function signIn(_:any, formData: FormData){
        try{
            const data = signInSchema.parse({
                email: formData.get("email")?.toString().toLowerCase(),
                password: formData.get("password")
            })
    
            const response = await api.post("/sessions", data)

            auth.save(response.data)

        }catch(error){
            console.log(error)

            if(error instanceof ZodError){
                return { message:error.issues[0].message }
            }

            if (error instanceof AxiosError){
                return {message: error.response?.data.message}
            }

            return { message: "Não foi possível entrar" }
        }
    }

    return(
        <form action={formAction} className="w-full flex flex-col gap-6">
            <Input required name="email" legend="E-mail" type="email" placeholder="seu@email.com" />

            <Input required name="password" legend="Senha" type="password" placeholder="123456" />

            <p className="text-sm text-red-600 text-center my-4 font-medium">
                {state?.message}
            </p>

            <div className="flex justify-center">
                <Button type="submit" isLoading={isLoading}>Entrar</Button>
            </div>

            <a href="/signup" className="text-sm text-center text-gray-100  mb-4 hover:text-green-800 transition ease-linear font-semibold">Criar conta</a>

        </form>
    )
}