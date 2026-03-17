import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/button";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import fileSvg from "../assets/file.svg"

export function Refund() {
  const [name, setName] = useState("Teste");
  const [amount, setAmount] = useState("35");
  const [category, setCategory] = useState("transport");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<File | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>()

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1)
    }

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
        disabled={!!params.id}
      />

      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
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
          disabled={!!params.id}
        />
      </div>

      {
        params.id ?
          (<a href="https://github.com/" target="blank" className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear">
            <img src={fileSvg} alt="Ícone de arquivo" />
            Abrir Comprovante </a>) :
          <Upload
            filename={fileName && fileName.name}
            onChange={(e) => e.target.files && setFileName(e.target.files[0])}
            disabled={!!params.id}
          />

      }

      <div className="flex justify-center">
        <Button type="submit" className="items-center" isLoading={isLoading}>
          {params.id ? "Voltar" : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
