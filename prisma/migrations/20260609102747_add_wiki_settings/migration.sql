-- CreateTable
CREATE TABLE "WikiSettings" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "featuredTitle" TEXT NOT NULL,
    "featuredContent" TEXT NOT NULL,
    "announcementTitle" TEXT NOT NULL,
    "announcementContent" TEXT NOT NULL,
    "communityTitle" TEXT NOT NULL,
    "communityContent" TEXT NOT NULL,
    "linksTitle" TEXT NOT NULL,
    "linksContent" TEXT NOT NULL,
    "backgroundUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WikiSettings_pkey" PRIMARY KEY ("id")
);
