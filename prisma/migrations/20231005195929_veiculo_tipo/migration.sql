/*
  Warnings:

  - Changed the type of `ativo` on the `Conta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `ativo` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ativo` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FLAG_SIM_NAO" AS ENUM ('SIM', 'NAO');

-- CreateEnum
CREATE TYPE "VeiculoTipo" AS ENUM ('CAMINHAO', 'CARRETA', 'CARRO');

-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "ativo",
ADD COLUMN     "ativo" "FLAG_SIM_NAO" NOT NULL;

-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "ativo" "FLAG_SIM_NAO" NOT NULL;

-- AlterTable
ALTER TABLE "Veiculo" ADD COLUMN     "ativo" "FLAG_SIM_NAO" NOT NULL,
ADD COLUMN     "tipo" "VeiculoTipo" NOT NULL;

-- CreateTable
CREATE TABLE "Frete" (
    "id" VARCHAR(100) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Frete_pkey" PRIMARY KEY ("id")
);
