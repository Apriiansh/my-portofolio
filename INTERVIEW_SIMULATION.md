# Simulasi Interview - Frontend Engineer (Next.js / React.js + Tailwind)
**Posisi:** Frontend Engineer at PT Cipta Usaha Anak Negri (Altonium)  
**Kandidat:** Muhammad Apriyansah  
**Waktu:** Jumat, 9 Januari 2026, 13.00 WIB

---

## 1. Pembukaan (Introduction)

**Interviewer (HR/Lead):**
"Selamat siang, Mas Apriyansah. Terima kasih sudah hadir tepat waktu. Bagaimana kabarnya hari ini?
Selamat juga karena sudah lolos ke tahap interview user ini. Seperti yang diinfokan di email, hari ini kita akan fokus membahas pengalaman teknis kamu dan melihat demo portofolio kamu."

**Kandidat (Anda):**
"Selamat siang, Pak/Bu. Kabar saya baik, terima kasih. Saya juga sangat antusias untuk kesempatan ini dan siap untuk mempresentasikan portofolio saya."

**Interviewer:**
"Baik, bisa ceritakan sedikit tentang diri kamu dan latar belakang teknis kamu secara singkat sebelum kita masuk ke portofolio?"

**(Siapkan jawaban singkat 1-2 menit mengenai background IT/CS kamu dan fokusmu di Frontend Engineering).**

---

## 2. Presentasi Portofolio

**Interviewer:**
"Oke, silakan share screen dan tunjukkan portofolio yang sudah kamu siapkan, lalu pilih project yang paling membanggakan atau relevan dengan stack kami (Next.js & Tailwind)."

### A. Landing Page Portofolio (`my-portofolio`)
*Share screen website `my-portofolio` kamu.*
**Anda:**
"Ini adalah landing page portofolio saya yang saya bangun menggunakan **Next.js** dan **TailwindCSS**. Di sini merangkum semua proyek yang pernah saya kerjakan."

### B. Project Highlight 1: Teknik Kimia Polsri (`teknikkimia.polsri.ac.id`)
**Poin Presentasi:**
*   **Deskripsi:** Sistem Informasi Akademik & Website Profil Jurusan.
*   **Tech Stack:** Next.js (App Router), TailwindCSS, Supabase (Database & Auth), Radix UI (Components).
*   **Relevansi Job:**
    *   Implementasi **UI/UX design** menjadi kode yang *pixel-perfect*.
    *   Integrasi **Supabase** untuk backendless architecture (menunjukkan pemahaman API & Database).
    *   Deploy di **Vercel** (Frontend) dan manajemen domain via **cPanel**.
*   **Action:** Tunjukkan halaman depan, fitur login, atau dashboard admin jika ada screenshot-nya. Highlight performa dan SEO.

### C. Project Highlight 2: Coral Ops (`coral-ops`)
**Poin Presentasi:**
*   **Deskripsi:** Sistem Operasional Lapangan untuk tracking teknisi real-time.
*   **Tech Stack:** **Next.js 15 (React 19)**, TailwindCSS, Supabase, **Leaflet (Maps)**, jsPDF.
*   **Relevansi Job:**
    *   Penggunaan **React 19** & Next.js terbaru menunjukkan Anda *up-to-date*.
    *   Fitur kompleks (**Geolocation/Maps**) dan **PDF Generation**.
    *   Struktur komponen yang rapi menggunakan `shadcn/ui` (Radix + Tailwind).
*   **Action:** Demo fitur peta atau form laporan teknisi.

### D. Project Highlight 3: SPI Polsri (`spi-polsri`)
**Poin Presentasi:**
*   **Deskripsi:** Website Satuan Pengawasan Internal untuk pelaporan audit.
*   **Tech Stack:** **CodeIgniter 4 (PHP)**, TailwindCSS, MySQL.
*   **Relevansi Job:**
    *   Walaupun job-nya Frontend, ini mindset **Fullstack/Backend** (PHP, MVC concept).
    *   Menunjukkan fleksibilitas belajar framework lain (CI4) selain ekosistem JS.
    *   Kemampuan integrasi dengan library pihak ketiga (PHPSpreadsheet).

### E. Continuous Learning (`next-learn`)
**Anda:**
"Selain proyek produksi, saya juga konsisten belajar fundamental. Saat ini saya sedang memperdalam best-practice Next.js melalui dokumentasi resmi di repo `next-learn` saya, mempelajari topik seperti SSR vs CSR secara mendalam."

---

## 3. Sesi Tanya Jawab Teknis (Technical Q&A)

**Interviewer:**
"Menarik sekali demo-nya. Saya lihat kamu banyak menggunakan Next.js dan Tailwind. Ada beberapa pertanyaan teknis:"

**Q1: Next.js & Rendering**
*   **Pertanyaan:** "Di project `teknikkimia` atau `coral-ops`, bagaimana kamu menentukan kapan menggunakan Server Component (SSR) dan Client Component? Kenapa tidak pakai React biasa (CRA/Vite) saja?"
*   **Jawaban Ideal:**
    *   Jelaskan **SEO** (penting untuk website kampus/publik).
    *   **Performance**: Initial load lebih cepat dengan SSR.
    *   **Client Component** (`use client`): Hanya dipakai saat butuh interaktivitas (onClick, useState, useEffect), seperti di Navbar atau Form. Sisanya default Server Component untuk data fetching langsung di server (seperti di `page.tsx`).

**Q2: Styling & TailwindCSS**
*   **Pertanyaan:** "Kamu pakai TailwindCSS. Bagaimana caramu menjaga kode HTML tidak berantakan dengan class yang terlalu panjang? Apakah kamu punya strategi khusus?"
*   **Jawaban Ideal:**
    *   "Saya menggunakan pendekatan **Component-based**. Komponen UI (Button, Card, Input) saya ekstrak (seperti pola `shadcn/ui` di folder `components/ui`). Jadi di `page.tsx` kodenya tetap bersih."
    *   "Saya juga menggunakan `clsx` atau `tailwind-merge` untuk menghandle conditional class."

**Q3: State Management**
*   **Pertanyaan:** "Di lowongan kami tertulis 'Bonus Point: Zustand/Redux'. Bagaimana kamu memanage state di aplikasi kompleks seperti Coral Ops?"
*   **Jawaban Ideal:**
    *   "Untuk state global yang sederhana (seperti User Session), saya mengandalkan **Context API** atau manajemen session dari library Auth (Supabase Auth)."
    *   "Untuk state lokal (form inputs), saya menggunakan **React Hook Form** untuk performa (uncontrolled components) agar tidak re-render seluruh halaman tiap ketik huruf."
    *   "Jika butuh state global kompleks di masa depan, saya siap belajar Zustand."

**Q4: API & Data Fetching**
*   **Pertanyaan:** "Bagaimana cara kamu handle error saat fetch data dari backend/Supabase? Apa yang user lihat jika internet mati?"
*   **Jawaban Ideal:**
    *   "Saya menggunakan `try-catch` block."
    *   "Saya menampilkan **Loading State** (Skeleton UI) saat data sedang diambil."
    *   "Jika error, saya menampilkan **Toast Notification** (seperti `sonner` / `react-hot-toast`) atau halaman Error Boundary jika halamannya crash."

---

## 4. Pertanyaan Cultural & Job Fit

**Interviewer:**
"Oke, teknikal cukup solid. Sekarang pertanyaan non-teknis."

**Q5: Pertanyaan "Sensitif" (Alcoholic Beverage Projects)**
*   **Pertanyaan:** *"Seperti yang ada di form aplikasi, klien kami beragam, termasuk brand minuman beralkohol. Apakah kamu bersedia jika ditempatkan di proyek tersebut?"*
*   **Saran Jawaban:**
    *   Jawab dengan **jujur** sesuai prinsip Anda.
    *   Jika **Bersedia:** "Ya, saya bersedia bekerja secara profesional sesuai kebutuhan klien perusahaan."
    *   Jika **Tidak Bersedia:** "Mohon maaf Pak/Bu, karena alasan prinsip pribadi, saya belum bisa memegang proyek yang mempromosikan produk tersebut secara langsung. Namun saya sangat terbuka untuk proyek tech/industri lainnya (F&B umum, banking, startup, dll)."
    *   *(Info: Jawaban "Tidak" mungkin mempengaruhi hasil jika proyek utamanya adalah itu, tapi kejujuran lebih dihargai daripada mundur di tengah jalan).*

**Q6: Remote vs WFO & Teamwork**
*   **Pertanyaan:** "Posisi ini WFO di Serpong. Kamu dari [Lokasi Anda], apakah ada kendala komuter? Dan bagaimana gaya kerjamu dalam tim?"
*   **Jawaban Ideal:**
    *   Konfirmasi kesanggupan WFO (jika Anda sanggup pindah/komuter).
    *   "Saya terbiasa menggunakan Git/GitHub untuk kolaborasi (Pull Request, Code Review)."
    *   "Saya komunikatif dan tidak ragu bertanya jika ada requirement yang ambigu dari tim Product/Desain."

---

## 5. Penutup

**Interviewer:**
"Baik, terima kasih Mas Apriyansah. Cukup komprehensif. Apakah ada pertanyaan untuk kami?"

**Saran Pertanyaan Balik (Wajib tanya!):**
1.  "Di Altonium, stack Next.js-nya apakah sudah full App Router atau masih migrasi dari Pages Router?"
2.  "Berapa jumlah frontend engineer di tim saat ini dan bagaimana pembagian tugasnya?"
3.  "Bagaimana flow delivery-nya? Apakah ada tim QA khusus atau dev test sendiri?"

**Interviewer:**
"Terima kasih. Kami akan diskusikan hasilnya dan kabari dalam 1-2 minggu. *Good luck!*"

---
