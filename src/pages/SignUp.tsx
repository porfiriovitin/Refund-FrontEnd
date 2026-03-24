import { Input } from "../components/Input"
import { Button } from "../components/button"
import { useState } from "react"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"

import { z, ZodError} from "zod"

import { api } from "../services/api"

const signUpSchema = z.object({
    name: z.string().min(1, {message:"Informe o nome"}),
    email: z.email({message:"E-mail inválido"}).min(1, {message:"Informe o email"}),
    password: z.string().min(6, {message:"A senha deve conter no mínimo 6 caracteres"}),
    passwordConfirm: z.string().min(6, {message:"Confirme sua senha"})
}).refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não coincidem",
    path: ["passwordConfirm"]
})

export function SignUp(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function onSubmit(e: React.SubmitEvent){
        e.preventDefault()
        
        try{
            setIsLoading(true)

            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })

            await api.post("/users", data)

            if(confirm("Cadastrado com sucesso. Ir para tela de login?")){
                navigate("/")
            }

        }catch(error){
            if(error instanceof ZodError){
                return alert(error.issues[0].message)
            }

            if(error instanceof AxiosError){
                return alert(error.response?.data.message)
            }

            console.log(error)

            alert("Ocorreu um erro inesperado")
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
            <Input required name="name" legend="Nome" placeholder="Seu nome" onChange={(e)=>{setName(e.target.value)}}/>

            <Input required name="email" legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e)=>{setEmail(e.target.value)}}/>

            <Input required name="password" legend="Senha" type="password" placeholder="123456" onChange={(e)=>{setPassword(e.target.value)}}/>

            <Input required name="confirmPassword" legend="Confirme sua senha" type="password" placeholder="123456" onChange={(e)=>{setPasswordConfirm(e.target.value)}}/>

            <div className="flex justify-center">
                <Button type="submit" isLoading={isLoading}>Criar Conta</Button>
            </div>

            <a href="/" className="text-sm text-center text-gray-100  mb-4 hover:text-green-800 transition ease-linear font-semibold">Já tenho uma conta</a>

        </form>
    )
}