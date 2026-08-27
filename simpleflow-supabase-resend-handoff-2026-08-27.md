# Simple Flow – Supabase és Resend handoff

**Állapot:** 2026. augusztus 27.  
**Projekt:** React + Vite + Docker  
**Környezet:** localhost / helyi hálózat; Vercel még nincs beállítva

## 1. Elkészült rendszer

A kapcsolatfelvételi űrlap teljes folyamata működik és tesztelve van:

```text
ContactForm.jsx
  → Supabase Edge Function: contact-notification
  → public.contact_messages tábla
  → Resend értesítés
  → info@simpleflow.hu
  → Forpsi továbbítás a központi Gmail-fiókba
```

- A látogató csak a weboldali sikerüzenetet kapja; automatikus visszaigazoló e-mail nem megy neki.
- Az Edge Function először elmenti az üzenetet, majd megpróbálja elküldeni az értesítést.
- Resend-hiba esetén az adatbázisrekord megmarad.
- Az értesítő levél `Reply-To` címe az érdeklődő e-mail-címe, ezért a válasz közvetlenül neki küldhető.

## 2. Supabase-projekt

- Szervezet: `Flow wolf Kft`
- Projekt: `simpleflow.hu`
- Régió: Central EU (Frankfurt)
- Csomag: Free
- Data API: bekapcsolva
- Új táblák automatikus publikálása: kikapcsolva
- Automatikus RLS: bekapcsolva

### Tábla

`public.contact_messages`

Mezők:

- `id uuid primary key default gen_random_uuid()`
- `name text not null`
- `company text`
- `email text not null`
- `phone text`
- `message text not null`
- `gdpr boolean not null check (gdpr = true)`
- `created_at timestamptz not null default now()`

### Végleges jogosultságok

- RLS aktív.
- `anon` és `authenticated` nem olvashatja a táblát.
- A frontend közvetlen anonim `INSERT` joga megszűnt.
- A korábbi `Anonymous visitors can submit contact messages` policy törölve lett.
- `service_role` kapott `INSERT` jogot; ezt a szerveroldali Edge Function használja.

## 3. Resend

- Fiók GitHub-belépéssel készült.
- A `simpleflow.hu` domain ellenőrzött (`Verified`).
- Régió: Ireland (`eu-west-1`).
- A DNS-rekordok a Forpsinál vannak beállítva.
- API-kulcs neve: `simpleflow-supabase`
- Jogosultság: Sending access
- Domainkorlátozás: `simpleflow.hu`
- Feladó: `Simple Flow weboldal <weboldal@simpleflow.hu>`
- Értesítési cím: `info@simpleflow.hu`
- A Forpsi az `info@simpleflow.hu` leveleit a központi Gmail-fiókba továbbítja.

## 4. Edge Function

Név:

```text
contact-notification
```

Supabase secretek:

- `RESEND_API_KEY`
- `CONTACT_NOTIFICATION_EMAIL`
- `CONTACT_FROM_EMAIL`

Alapértelmezett Supabase secretek:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` vagy `SUPABASE_SERVICE_ROLE_KEY`

A függvény:

- csak publishable Supabase-hitelesítéssel hívható;
- ellenőrzi a kötelező mezőket, az e-mail formátumát és a mezőhosszakat;
- admin klienssel menti az adatot;
- HTML-escape-et használ az értesítő levél tartalmán;
- a mentés után hívja a Resend API-t;
- e-mail-hiba esetén naplóz, de sikeres választ ad, mert az adat már megmaradt.

## 5. Database Webhook eltérés

Az eredeti terv Database Webhook → Edge Function volt. A webhook létrehozása Supabase-platformhibával leállt:

```text
schema "supabase_functions" does not exist
```

Ez 2026 augusztusában ismert Supabase-probléma. A hiányzó belső sémát nem hoztuk létre kézzel. Helyette a frontend közvetlenül hívja az Edge Functiont, amely egy tranzakciós sorrendben ment és értesít.

## 6. Frontend

Telepített csomag:

```text
@supabase/supabase-js
```

Új fájl:

```text
src/lib/supabase.js
```

Használt környezeti változók:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

- A helyi fájl neve pontosan `.env.local`.
- A `.gitignore` tartalmazza a `.env.local` kizárását.
- Titkos vagy service-role kulcs nincs a frontendben és GitHubon.

### ContactForm.jsx

- A `submit` függvény `async`.
- Küldés közben `isSubmitting` tiltja a gombot és `Küldés...` feliratot mutat.
- Kötelező mezők és e-mail-formátum ellenőrzése megtörténik.
- A form `supabase.functions.invoke("contact-notification")` hívást használ.
- Siker után ürül az űrlap.
- Felhasználóbarát siker- és hibaüzenet van.

## 7. Docker-megjegyzés

A weboldal a másik gépen Dockerben fut, szolgáltatásnév:

```text
vite-app
```

A Supabase csomag telepítése a futó konténerben:

```bash
docker compose exec vite-app npm install
docker compose restart vite-app
```

A laptopon nem volt elérhető a Docker CLI; a projekt meghajtója viszont elérhető volt.

## 8. Projektbe mentett Supabase-források

```text
supabase/
├── functions/
│   └── contact-notification/
│       └── index.ts
├── migrations/
│   └── 20260827_contact_messages.sql
└── README.md
```

A migration fájl dokumentálja a végleges adatbázis-állapotot. A jelenlegi adatbázison nem kell újra futtatni.

## 9. Git

Tervezett / használt commitüzenet:

```text
feat: connect contact form to Supabase and Resend
```

A commitban szerepeljen:

- `src/components/ContactForm.jsx`
- `src/lib/supabase.js`
- `src/styles.css` (két CSS-takarítás)
- `package.json`
- `package-lock.json`
- a teljes `supabase/` mappa

A `.env.local` nem szerepelhet a commitban.

## 10. Teszteredmény

A teljes folyamat sikeresen tesztelve:

- weboldali sikerüzenet megjelenik;
- új rekord létrejön a `contact_messages` táblában;
- Resend értesítés megérkezik az `info@simpleflow.hu` címre;
- Forpsi továbbítja a levelet a Gmail-fiókba;
- a levél tartalmazza az összes űrlapmezőt.

## 11. Következő feladatok

1. Logó további finomítása és azonos fájlnévvel történő cseréje.
2. Vercel deploy csak később.
3. Vercelben majd beállítandó:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Éles domainen teljes űrlapteszt.

