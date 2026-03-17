import { formatCurrency } from "../utils/formatCurrency"


export type RefundItemProps = {
    id: string
    name: string
    category: string
    amount: number
    categoryImg: string
}

type Props = React.ComponentProps<"a"> & {
    data: RefundItemProps
}

export function RefundItem({data, ...rest}:Props){
    return(
        <a href="" {...rest} className="flex items-center gap-3 hover:bg-green-100/5 cursor-pointer rounded-md p-2">
            <img src={data.categoryImg} alt="Ícone da categoria" className="w-8 h-8" />
            
            <div className="flex flex-col flex-1">
                <strong className="text-sm text-gray-100"> {data.name} </strong>
                <span className="text-xs text-gray-200">{data.category}</span>
            </div>

            <span className="text-md text-gray-100 font-semibold">
                <small className="font-semibold text-gray-100 text-sm">{formatCurrency(data.amount)}</small>
            </span>
        </a>
    )
}