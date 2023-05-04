/*
  Warnings:

  - The `value` column on the `Value` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `Value` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Value` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Value_value_key";

-- AlterTable
ALTER TABLE "Value" ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" INTEGER,
ALTER COLUMN "label" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Value_id_key" ON "Value"("id");
