/*
  Warnings:

  - You are about to drop the column `lastContentUpdate` on the `WikiBlock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "lastContentUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WikiBlock" DROP COLUMN "lastContentUpdate";
