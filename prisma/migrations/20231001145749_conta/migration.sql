-- CreateEnum
CREATE TYPE "ContaTipo" AS ENUM ('CAIXA', 'ADMIN');

-- CreateEnum
CREATE TYPE "ContaHistoricoTipo" AS ENUM ('CREDITO', 'DEBITO');

-- CreateTable
CREATE TABLE "Conta" (
    "id" TEXT NOT NULL,
    "pessoa_id" VARCHAR(100) NOT NULL,
    "tipo" "ContaTipo" NOT NULL DEFAULT 'CAIXA',
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContaHistorico" (
    "id" VARCHAR(100) NOT NULL,
    "conta_id" VARCHAR(100) NOT NULL,
    "tipo" "ContaHistoricoTipo" NOT NULL DEFAULT 'CREDITO',
    "descricao" TEXT,
    "valor_doc" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContaHistorico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContaHistorico" ADD CONSTRAINT "ContaHistorico_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
