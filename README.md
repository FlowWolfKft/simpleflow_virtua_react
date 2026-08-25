# Simple Flow – React verzió

A korábbi Express + EJS weboldal tiszta React + Vite újraépítése, a jóváhagyott porcelánbézs design-upgrade alapján.

Az oldal már a végleges Simple Flow négyszögspirál logót, a Plus Jakarta Sans wordmarkot és a felirat nélküli submark-favicont használja.

## Indítás

```bash
npm install
npm run dev
```

A helyi fejlesztői oldal alapértelmezetten a `http://localhost:5173` címen nyílik meg.

## Ellenőrzés

```bash
npm run lint
npm run build
```

## Kapcsolatfelvételi űrlap

Az űrlap felülete és kliensoldali validációja elkészült. Jelenleg nem küld adatot; a Supabase-integráció külön következő lépés.

## Biztonság

A régi csomagban talált idegen PHP-fájlok és az elavult Express backend nem kerültek át ebbe a projektbe.
