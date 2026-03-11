import { useState } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/button";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { useNavigate } from "react-router";

export function Refund() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<File | null>(null);

  const navigate = useNavigate();

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setIsLoading(true)
    navigate("/confirm", { state: { fromSubmit: true } });
  }

  return (
    <form
      className="bg-gray-500 w-4/5 md:w-1/2 rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg mx-auto"
      onSubmit={onSubmit}
    >
      <header>
        <h1 className="text-sm font-bold text-gray-100 md:text-lg">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso.
        </p>
      </header>

      <Input
        required
        legend="Nome da solicitação"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES_KEYS.map((c) => (
            <option key={c} value={c}>
              {" "}
              {CATEGORIES[c].name}{" "}
            </option>
          ))}
        </Select>

        <Input
          legend="Valor"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Upload
        filename={fileName && fileName.name}
        onChange={(e) => e.target.files && setFileName(e.target.files[0])}
      />

      <div className="flex justify-center">
        <Button type="submit" className="items-center" isLoading={isLoading}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
