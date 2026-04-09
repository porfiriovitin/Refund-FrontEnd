import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ZodError, set, z } from "zod";
import fileSvg from "../assets/file.svg";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/button";
import type { RefundAPIResponse } from "../dtos/refunds";
import { formatCurrency } from "../utils/formatCurrency";

const refundSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Informe um nome claro para sua solicitação" }),
  category: z.string().min(1, { message: "Informe a categoria" }),
  amount: z.coerce
    .number({ message: "Informe um valor válido" })
    .positive({ message: "Informe um valor válido e superior a zero" }),
});

export function Refund() {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);

      if(!file){
        return alert("Envie um comprovante para solicitar o reembolso")
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", file);

      const response = await api.post("/uploads", fileUploadForm)

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      });

      await api.post("/refunds", {...data, filename: response.data.filename });
      
      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues.map((i) => i.message).join("\n"));
      }

      if (error instanceof AxiosError) {
        return alert(
          error.response?.data.message || "Ocorreu um erro na solicitação",
        );
      }

      alert(
        "Ocorreu um erro ao enviar a solicitação, tente novamente mais tarde",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRefund(id: string) {
    try{

      const {data} = await api.get<RefundAPIResponse>(`/refunds/${id}`)

      setName(data.name)
      setAmount(formatCurrency(data.amount))
      setCategory(data.category)
      setFileUrl(data.filename ? URL.createObjectURL(new File([], data.filename)) : null)

    }catch(error){
      console.log(error)
      
      if (error instanceof AxiosError) {
        return alert(
          error.response?.data.message || "Ocorreu um erro na solicitação",
        );
      }

    }
  }

  useEffect(() => {
    if(params.id){
      fetchRefund(params.id)
    }
  }, [params.id])

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

      {params.id && fileUrl? (
        <a
          href={`http://localhost:3333/uploads/${fileUrl.split("/").pop()}`} // Extrai o nome do arquivo da URL
          target="blank"
          className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="Ícone de arquivo" />
          Abrir Comprovante{" "}
        </a>
      ) : (
        <Upload
          filename={file && file.name}
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          disabled={!!params.id}
        />
      )}

      <div className="flex justify-center">
        <Button type="submit" className="items-center" isLoading={isLoading}>
          {params.id ? "Voltar" : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
