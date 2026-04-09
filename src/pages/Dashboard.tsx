import { useEffect, useState } from "react"

import {api} from "../services/api"
import {AxiosError} from "axios"

import searchSvg from "../assets/search.svg"
import { CATEGORIES } from "../utils/categories"

import { Input } from "../components/Input"
import { Button } from "../components/button"
import { RefundItem } from "../components/RefundItem"
import type { RefundItemProps } from "../components/RefundItem"
import { Pagination } from "../components/Pagination"

const REFUND_EXAMPLE = {
    id: "123",
    name: "Victor",
    category: "Alimentação",
    amount: 60.00,
    categoryImg: CATEGORIES["food"].icon
}

const PER_PAGE = 5

export function Dashboard() {
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [refunds, setRefunds] = useState<RefundItemProps[]>([])

    async function fetchRefunds() {
        try {
            const response = await api.get(`/refunds?name=${name.trim()}&page=${page}&per_page=${PER_PAGE}`)

            const formattedRefunds = response.data.refunds.map((refund: any) => {
                const key = refund.category as keyof typeof CATEGORIES
                const categoryData = CATEGORIES[key] ?? CATEGORIES.others

                return {
                ...refund,
                category: categoryData.name,
                categoryImg: categoryData.icon,
                }
            })

            setRefunds(formattedRefunds)
            setTotalPages(response.data.pagination.totalPages)

            console.log(response.data)
        } catch (error) {
            console.error("Error fetching refunds:", error)

            if(error instanceof AxiosError && error.response) {
                alert(`Error: ${error.response?.data.message}`)
            }

            alert("Ocorreu um erro ao buscar as solicitações. Por favor, tente novamente mais tarde.")
        }
    }

    function handlePagination(action: "next" | "previous") {

        setPage((prevPage) => {
            if(action === "next" && prevPage < totalPages ){
                return prevPage + 1
            }

            if(action === "previous" && prevPage > 1){
                return prevPage - 1
            }

            return prevPage
        })
    }

    useEffect(() => {
        fetchRefunds()
    }, [page])

    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-3xl w-5xl mx-auto">
            <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações:</h1>

            <form onSubmit={fetchRefunds} className="flex flex-1 items-center justify-between pb-6 border-b border-gray-400 md:flex-row gap-2 mt-6">
                <Input placeholder="Pesquisar pelo nome" onChange={(e) => setName(e.target.value)} />

                <Button variant="icon"><img src={searchSvg} alt="Pesquisar" className="w-5" /></Button>
            </form>

            <div className="my-5 flex flex-col gap-4 max-h-85.5 overflow-y-scroll p-3">
                {
                    refunds.map((item) => <RefundItem key={item.id} data={item} href={`/refund/${item.id}`}/> )
                }
                
            </div>

            <Pagination current={page} total={totalPages} onNext={() => handlePagination("next")} onPrevious={()=> handlePagination("previous")} />

        </div>
    )
}