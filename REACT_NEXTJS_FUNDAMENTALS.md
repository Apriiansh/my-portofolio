# Panduan Fundamental React.js & Next.js (Interview Cheat Sheet)

Dokumen ini merangkum konsep-konsep kunci yang sering ditanyakan dalam interview Frontend Engineer (React/Next.js).

---

## 1. React.js Fundamentals

### A. Core Concepts
*   **Component**: Blok bangunan UI. Di era modern, kita menggunakan *Functional Components*.
*   **JSX (JavaScript XML)**: Syntax extension yang memungkinkan kita menulis HTML di dalam JavaScript.
*   **Virtual DOM**: Representasi ringan dari DOM asli di memori. React membandingkan Virtual DOM dng DOM asli ("Diffing") dan hanya mengupdate bagian yang berubah (Reconciliation) -> *Performance efficiency*.

### B. Props vs State
| Fitur | Deskripsi | Sifat |
| :--- | :--- | :--- |
| **Props** | Data yang dikirim dari Parent ke Child. | **Read-only (Immutable)** bagi si Child. |
| **State** | Data internal yang dikelola oleh komponen itu sendiri. | **Mutable** (bisa berubah), memicu re-render. |

### C. React Hooks Penting
Hanya bisa dipanggil di top-level fungsi komponen atau custom hooks.

1.  **`useState`**
    *   Menangani state lokal.
    *   `const [count, setCount] = useState(0);`

2.  **`useEffect`**
    *   Menangani "Side Effects" (Fetch API, DOM manipulation, timers/subscriptions).
    *   **Dependency Array (`[]`)**:
        *   Kosong `[]`: Jalan sekali saat mount (mirip `componentDidMount`).
        *   Ada isi `[propA]`: Jalan saat mount DAN saat `propA` berubah.
        *   Tidak ada array: Jalan setiap kali re-render (bahaya loop).
    *   **Cleanup Function**: `return () => { ... }` untuk membersihkan timer/listener (mirip `componentWillUnmount`).

3.  **`useContext`**
    *   Berbagi value (theme, user auth) ke seluruh *tree* komponen tanpa "Prop Drilling" (oper props manual tiap level).

4.  **`useRef`**
    *   Menyimpan akses ke DOM element secara langsung.
    *   Menyimpan nilai yang "persist" antar render tapi **tidak memicu re-render** saat berubah.

5.  **`useMemo` & `useCallback`** (Performance)
    *   `useMemo`: Cache **hasil perhitungan** berat.
    *   `useCallback`: Cache **definisi fungsi** agar tidak dibuat ulang tiap render (penting saat passing function ke child component).

---

## 2. Next.js Fundamentals (App Router Focus)

Karena lowongan menyebutkan Next.js, kemungkinan besar akan membahas fitur-fitur ini.

### A. Routing
*   **File-system Based Routing**: Struktur folder menentukan URL.
    *   `app/page.tsx` -> `/`
    *   `app/dashboard/page.tsx` -> `/dashboard`
*   **Dynamic Routes**: Menggunakan kurung siku `[]`.
    *   `app/blog/[slug]/page.tsx` -> `/blog/belajar-nextjs`
    *   Akses parameter via props: `params` (di Server Component) atau hooks `useParams` (di Client Component).

### B. Rendering Strategy (Sangat Penting!)
Next.js memiliki beberapa metode rendering:

| Strategi | Kapan Terjadi? | Use Case | Cara di Next.js (App Router) |
| :--- | :--- | :--- | :--- |
| **SSR (Server-Side Rendering)** | Saat **Request** (Setiap user buka/refresh). | Data harus live/real-time (Dashboard saham, Akun User). | Fetch data dengan `cache: 'no-store'` atau akses dynamic function (cookies/headers). |
| **SSG (Static Site Generation)** | Saat **Build Time**. | Konten jarang berubah (Blog, Dokumentasi). Paling cepat. | Default behavior. Fetch data tanpa opsi cache khusus (default force-cache). |
| **ISR (Incremental Static Regeneration)** | Build time + Update berkala di background. | Ingin statis tapi data perlu update tiap X detik (Berita, E-commerce listing). | Fetch dengan `next: { revalidate: 3600 }` (tiap 1 jam). |
| **CSR (Client-Side Rendering)** | Di Browser User. | Interaksi berat, data user private yang tidak butuh SEO. | Gunakan `useEffect` untuk fetch data di Client Component. |

### C. Server Components (RSC) vs Client Components
Ini konsep terbesar di Next.js 13+.

*   **Server Components (Default)**
    *   Dirender di server. Kode tidak dikirim ke browser (bundle size kecil).
    *   Bisa akses database/fs langsung.
    *   **Tidak bisa** pakai Hooks (`useState`, `useEffect`) atau event listeners (`onClick`).
*   **Client Components**
    *   Ditandai dengan `'use client'` di baris paling atas.
    *   Mencakup interaktivitas browser.
    *   Hydration terjadi di sini.

**Kapan pakai `'use client'`?**
*   Butuh `useState`, `useEffect`.
*   Butuh event listener (`onClick`, `onChange`).
*   Butuh browser API (`window`, `localStorage`, `navigator.geolocation`).

### D. Image Optimization (`next/image`)
Mengapa tidak pakai `<img>` biasa?
*   `<Image />` otomatis resize gambar sesuai device user.
*   Lazy loading otomatis (hanya load saat discroll).
*   Mencegah *Layout Shift* (CLS) yang buruk buat SEO & UX.

---

## 3. TailwindCSS Basics

Karena lowongan juga menekankan Tailwind.

*   **Utility-First**: Style ditulis langsung di class HTML (`flex`, `text-center`, `p-4`).
*   **Responsive Prefixes**: Mobile-first approach.
    *   `w-full`: lebar penuh di semua layar.
    *   `md:w-1/2`: lebar setengah HANYA di layar medium ke atas (tablet/laptop).
*   **Hover & States**: `hover:bg-blue-500`, `focus:ring-2`.

---

## 4. Pertanyaan Interview Umum & Jawaban Cerdas

**Q: "Apa bedanya Next.js dengan React biasa (CRA/Vite)?"**
> **A:** "**React** adalah library untuk UI. **Next.js** adalah framework diatas React yang menyediakan fitur production-ready seperti Server-Side Rendering (SEO Friendly), Routing otomatis, Image Optimization, dan Backend API routes. Kalau pakai React biasa, kita harus config routing dan SSR sendiri secara manual."

**Q: "Apa itu Hydration?"**
> **A:** "Proses di mana JavaScript di browser 'mengambil alih' HTML statis yang dikirim server, lalu menempelkan event listeners agar halaman menjadi interaktif."

**Q: "Kenapa performa website penting (Core Web Vitals)?"**
> **A:** "Mempengaruhi User Experience (user kabur kalau load > 3 detik) dan Ranking SEO Google."

---

## 5. Cheat Sheet Code Snippet

### Fetch Data di Server Component (Next.js 14/15)
```tsx
// app/users/page.tsx
// Ini Server Component by default
async function getUsers() {
  // SSR (No Cache) -> tambahkan { cache: 'no-store' }
  // ISR (Revalidate) -> tambahkan { next: { revalidate: 60 } }
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function Page() {
  const users = await getUsers();
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

### Client Component Pattern
```tsx
'use client'; // Wajib jika pakai hooks

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white p-2 rounded">
      Count: {count}
    </button>
  );
}
```
