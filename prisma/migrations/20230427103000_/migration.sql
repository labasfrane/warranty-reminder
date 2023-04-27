/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - Added the required column `date` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "period" INTEGER NOT NULL,
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "store" TEXT,
ADD COLUMN     "value" TEXT;
