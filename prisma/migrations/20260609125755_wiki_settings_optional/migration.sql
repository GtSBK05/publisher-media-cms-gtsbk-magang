-- AlterTable
ALTER TABLE "WikiSettings" ALTER COLUMN "heroTitle" DROP NOT NULL,
ALTER COLUMN "heroSubtitle" DROP NOT NULL,
ALTER COLUMN "featuredTitle" DROP NOT NULL,
ALTER COLUMN "featuredContent" DROP NOT NULL,
ALTER COLUMN "announcementTitle" DROP NOT NULL,
ALTER COLUMN "announcementContent" DROP NOT NULL,
ALTER COLUMN "communityTitle" DROP NOT NULL,
ALTER COLUMN "communityContent" DROP NOT NULL,
ALTER COLUMN "linksTitle" DROP NOT NULL,
ALTER COLUMN "linksContent" DROP NOT NULL;
