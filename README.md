# Publisher Media CMS ~GtSBK~

Project Magang Fullstack Developer  
Stack: Next.js, TypeScript, PostgreSQL, Prisma

---

## Deskripsi Project

Publisher Media CMS adalah sistem manajemen konten (Content Management System) yang dirancang untuk mendukung workflow media digital dengan Role-Based Access Control (RBAC), sistem publikasi bertahap, serta manajemen artikel terstruktur.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- PostgreSQL
- Prisma ORM

---

# Progress Mingguan

---

## Week 1 – Project Proposal
- Penyusunan proposal
- Perencanaan arsitektur sistem
- Penyusunan roadmap 16 minggu
- Penentuan teknologi

Status: Selesai

---

## Week 2 – Core Database Setup
- Setup Prisma dan PostgreSQL
- Desain schema database
- Implementasi Role (ADMIN, EDITOR, WRITER)
- Implementasi workflow Article (DRAFT, REVIEW, PUBLISHED, REJECTED)
- Relasi User dan Article
- Struktur ActivityLog
- Migration database berhasil

Status: Selesai

---

## Week 3 – System Architecture Finalization
- Finalisasi ERD
- Penyusunan RBAC Matrix
- Penyusunan Use Case Diagram
- Penguncian struktur database dan workflow

Status: Selesai

---

## Week 4 – UI/UX Design
- Pembuatan wireframe desktop dashboard
- Penyusunan visual hierarchy CMS
- Implementasi desain editorial dark theme
- Finalisasi desain halaman utama CMS

Status: Selesai

---

## Week 5 – Authentication & Middleware Protection
- Implementasi register API
- Implementasi login API
- Password hashing menggunakan bcrypt
- JWT token generation
- Middleware route protection
- Protected route testing

Status: Selesai

---

## Week 6 – Article CRUD System
- Implementasi Create Article API
- Implementasi Get Article API
- Implementasi Update Article API
- Implementasi Delete Article API
- Integrasi Prisma ORM dengan Article model
- Implementasi JWT authorization pada Article API
- Implementasi ownership validation pada Update dan Delete
- Implementasi dynamic route `[id]`
- Implementasi slug generation menggunakan slugify
- Pengujian CRUD article menggunakan protected API
- Integrasi article workflow dengan status DRAFT
- Pengujian koneksi database PostgreSQL secara real-time

Status: Selesai

---

## Week 7 – RBAC & Editorial Workflow
- Implementasi Role-Based Access Control (RBAC)
- Implementasi helper authorization (`verifyToken`)
- Implementasi helper role validation (`requireRole`)
- Implementasi editorial workflow system
- Implementasi publish article endpoint
- Implementasi review article endpoint
- Implementasi reject article endpoint
- Implementasi nested dynamic route `[id]/publish`
- Implementasi role restriction pada endpoint editorial
- Pengujian role WRITER terhadap akses publish
- Pengujian role ADMIN terhadap akses publish
- Implementasi status transition DRAFT → PUBLISHED
- Implementasi otomatisasi `publishedAt`
- Pengujian editorial workflow menggunakan protected API

Status: Selesai

---

## Week 8 – Dashboard Statistics & Activity Logging
- Implementasi dashboard analytics endpoint
- Implementasi total article counter
- Implementasi published article counter
- Implementasi draft article counter
- Implementasi total user counter
- Implementasi recent activity endpoint
- Implementasi ActivityLog helper (`logActivity`)
- Integrasi logging pada Create Article API
- Integrasi logging pada Update Article API
- Integrasi logging pada Delete Article API
- Integrasi logging pada Publish Article API
- Implementasi audit trail system
- Implementasi monitoring foundation untuk CMS
- Implementasi activity tracking berbasis database
- Implementasi dashboard statistics menggunakan Prisma aggregate query
- Pengujian realtime dashboard statistics
- Pengujian activity tracking pada workflow article
- Validasi audit trail menggunakan protected API

Status: Selesai

---

## Week 9 – Scheduled Publishing (Cron Setup)
- Implementasi scheduled publishing article
- Penambahan field `scheduledAt` pada article
- Implementasi endpoint cron publish otomatis
- Implementasi auto publish berdasarkan waktu terjadwal
- Implementasi otomatisasi perubahan status article menjadi PUBLISHED
- Pengujian scheduled publishing menggunakan protected API
- Pengujian cron automation dan validasi database PostgreSQL

Status: Selesai

---

## Week 10 – SEO Meta Field Implementation
- Implementasi field SEO metadata pada Article schema
- Implementasi `seoTitle`, `seoDescription`, dan `seoKeywords`
- Integrasi SEO metadata pada Create Article API
- Integrasi SEO metadata pada Update Article API
- Implementasi automatic SEO fallback system
- Implementasi otomatisasi `seoTitle` menggunakan title article
- Implementasi otomatisasi `seoDescription` dari potongan content
- Pengujian SEO metadata menggunakan protected API
- Validasi penyimpanan SEO metadata pada PostgreSQL
- Pengujian automatic SEO fallback system

Status: Selesai

---

## Week 11 – Content Health Score Logic
- Implementasi field `healthScore` pada Article schema
- Implementasi Content Health Score system
- Implementasi helper `calculateHealthScore`
- Implementasi automatic content quality scoring
- Implementasi health score calculation pada Create Article API
- Implementasi health score recalculation pada Update Article API
- Implementasi penilaian kualitas content berdasarkan panjang article
- Implementasi penilaian kualitas SEO metadata
- Implementasi dynamic scoring untuk SEO Title
- Implementasi dynamic scoring untuk SEO Description
- Implementasi dynamic scoring untuk SEO Keywords
- Implementasi article quality assessment foundation
- Implementasi content intelligence foundation untuk CMS
- Pengujian low-quality article scoring
- Pengujian high-quality article scoring
- Validasi realtime health score menggunakan protected API
- Validasi persistence health score pada PostgreSQL

Status: Selesai

---

## Week 12 – UI Refinement & UX Improvement
- 
- 
- 

Status: 

---

## Week 13 – Performance Optimization
- 
- 
- 

Status: 

---

## Week 14 – Security Hardening
- 
- 
- 

Status: 

---

## Week 15 – Testing & Bug Fixing
- 
- 
- 

Status: 

---

## Week 16 – Final Stabilization & Documentation
- 
- 
- 

Status: 

---

## Database Structure

- User
- Article
- Category
- Tag
- ActivityLog

---

## Developer

Narendra Putra Arianto  
Fullstack Developer Intern
