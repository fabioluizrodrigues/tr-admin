-- CreateTable
CREATE TABLE "Pessoa" (
    "id" TEXT NOT NULL,
    "nome_razao" TEXT NOT NULL,
    "cnpj_cpf" TEXT NOT NULL,
    "ie_rg" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cnpj_cpf_key" ON "Pessoa"("cnpj_cpf");
