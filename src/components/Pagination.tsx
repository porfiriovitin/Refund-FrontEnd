import leftSvg from "../assets/left.svg"
import rightSvg from "../assets/right.svg"

import { Button } from "./button"

type Props = {
    current: number
    total: number
    onNext: () => void
    onPrevious: () => void
}

export function Pagination({ current, total, onNext, onPrevious }: Props) {
    return (
        <div className="flex flex-1 justify-center gap-4 items-center">
            <Button variant="smallIcon" onClick={onPrevious} disabled={current === 1}>
                <img src={leftSvg} alt="Ícone de voltar" />
            </Button>

            <span className="text-sm text-gray-200">{current}/{total}</span>

            <Button variant="smallIcon" onClick={onNext} disabled= {current === total}>
                <img src={rightSvg} alt="Ícone de avançar" />
            </Button>
        </div>
    )
}