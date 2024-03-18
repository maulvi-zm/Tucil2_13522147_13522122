# Tugas Kecil Strategi Algoritma IF2211

## Membangun Kurva Bézier dengan Algoritma Titik Tengah berbasis Divide and Conquer

## Table of Contents

- [Table of Contents](#table-of-contents)
- [General Information](#general-information)
- [Contributor](#contributor)
- [Structure](#structure)
- [Dependencies](#dependencies)
- [How to Use](#how-to-use)

## General Information

Algoritma divide and conquer adalah pendekatan dalam pemrograman dan matematika yang menguraikan masalah besar menjadi masalah yang lebih kecil, kemudian menyelesaikan setiap masalah kecil secara terpisah. Proses ini terus berlanjut hingga masalah yang tersisa cukup sederhana untuk dipecahkan dengan mudah.

Kurva Bezier adalah salah satu jenis kurva matematis yang digunakan dalam bidang desain komputer grafis dan animasi. Kurva ini didefinisikan dengan sejumlah titik kontrol yang menentukan jalannya kurva, yang disebut sebagai titik awal, titik akhir, dan titik-titik kontrol. Titik-titik kontrol ini adalah titik yang mengatur bentuk kurva diantara titik awal dan titik akhir.

## Contributor

| Name                    | NIM      |
| ----------------------- | -------- |
| Maulvi Ziadinda Maulana | 13522122 |
| Ikhwan Al Hakim         | 13522147 |

## Structure

```
├── bin
│   ├── assets
│   │   ├── index-B99V_zzr.css
│   │   └── index-CROXDigA.js
│   ├── curved-arrow.png
│   ├── index.html
│   └── vite.svg
├── package-lock.json
├── readme.md
└── src
    ├── components.json
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── public
    │   ├── curved-arrow.png
    │   └── vite.svg
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.tsx
    │   ├── assets
    │   │   ├── curved-arrow.png
    │   │   └── react.svg
    │   ├── components
    │   │   ├── header.tsx
    │   │   ├── input
    │   │   │   ├── algorithm-switch-submit.tsx
    │   │   │   ├── input-tabs.tsx
    │   │   │   ├── iteration-slider.tsx
    │   │   │   ├── n-inputs.tsx
    │   │   │   ├── npoint-selector.tsx
    │   │   │   └── three-input.tsx
    │   │   ├── output
    │   │   │   ├── bezier-canvas.tsx
    │   │   │   └── process-time.tsx
    │   │   └── ui
    │   │       ├── button.tsx
    │   │       ├── card.tsx
    │   │       ├── input.tsx
    │   │       ├── label.tsx
    │   │       ├── select.tsx
    │   │       ├── slider.tsx
    │   │       ├── switch.tsx
    │   │       ├── tabs.tsx
    │   │       ├── toaster.tsx
    │   │       ├── toast.tsx
    │   │       └── use-toast.ts
    │   ├── hooks
    │   │   ├── usePointContext.tsx
    │   │   └── useWindowSize.ts
    │   ├── index.css
    │   ├── lib
    │   │   └── utils.ts
    │   ├── main.tsx
    │   ├── utils
    │   │   ├── bf.ts
    │   │   ├── data-structure.ts
    │   │   ├── dnc.ts
    │   │   └── makeMatrixAnimation.ts
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Dependencies

Node Package Manager

## How to Use

1. Clone repository ini
   ```
   git clone https://github.com/Nerggg/Tucil2_13522147_13522122
   ```
2. Lakukan navigasi ke direktori `Tucil2_13522147_13522122/src` dan unduh dependencies dari program
   ```
   cd Tucil2_13522147_13522122/src
   npm install
   ```
3. Jalankan program
   ```
   npm run dev
   ```
4. Atau kunjungi
   ```
   https://maulvi-zm.github.io/Tucil2_13522147_13522122
   ```
