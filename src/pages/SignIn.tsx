import { Input } from "../components/Input"
import { Button } from "../components/button"
import { useState } from "react"

export function SignIn(){
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    function onSubmit(e: React.FormEvent){
        e.preventDefault()
        console.log(email, password)
        setIsLoading(true)
    }

    return(
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
            <Input required name="email" legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e)=>{setEmail(e.target.value)}}/>

            <Input required name="password" legend="Senha" type="password" placeholder="123456" onChange={(e)=>{setPassword(e.target.value)}}/>

            <div className="flex justify-center">
                <Button type="submit" isLoading={isLoading}>Entrar</Button>
            </div>

            <a href="/signup" className="text-sm text-center text-gray-100  mb-4 hover:text-green-800 transition ease-linear font-semibold">Criar conta</a>

        </form>
    )
}