import { useState } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

export function Refund() {
    const [category, setCategory] = useState("")

  return (
    <form className="bg-gray-500 w-4/5 md:w-1/2 rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg mx-auto">
      <header>
        <h1 className="text-sm font-bold text-gray-100 md:text-lg">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso.
        </p>
      </header>

      <Input required legend="Nome da solicitação" />

      <Select required legend="Categoria" value={category} onChange={(e)=> setCategory(e.target.value)}>
        {CATEGORIES_KEYS.map((c) => (
          <option key={c} value={c}> {CATEGORIES[c].name} </option>
        ))}
      </Select>
    </form>
  );
}
