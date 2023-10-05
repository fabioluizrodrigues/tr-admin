/*
  Warnings:

  - Added the required column `observacoes` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "observacoes" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL,
    "placa" VARCHAR(7) NOT NULL,
    "renavam" VARCHAR(20) NOT NULL,
    "nr_eixos" INTEGER NOT NULL,
    "ano_fabrica" INTEGER NOT NULL,
    "ano_modelo" INTEGER NOT NULL,
    "ano_exercicio" INTEGER NOT NULL,
    "marca" VARCHAR(150) NOT NULL,
    "modelo" VARCHAR(150) NOT NULL,
    "cor" VARCHAR(100) NOT NULL,
    "observacoes" VARCHAR(255),

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);
