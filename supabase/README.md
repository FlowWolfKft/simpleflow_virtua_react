# Simple Flow – Supabase

## Adatút

`ContactForm.jsx` → `contact-notification` Edge Function → `contact_messages` tábla → Resend → `info@simpleflow.hu`

Az Edge Function először elmenti az üzenetet, és csak utána kísérli meg az értesítő e-mail küldését. Resend-hiba esetén az adatbázisrekord megmarad.

## Edge Function secrets

A Supabase Dashboardban beállítandó saját secretek:

- `RESEND_API_KEY`
- `CONTACT_NOTIFICATION_EMAIL`
- `CONTACT_FROM_EMAIL`

A Supabase által biztosított alapértelmezett secretek:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` vagy `SUPABASE_SERVICE_ROLE_KEY`

Titkos kulcs nem kerülhet a React frontendbe vagy a Git-re.

## Frontend környezeti változók

A helyi `.env.local` fájlban:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

A `.env.local` fájlt a `.gitignore` kizárja.

## Biztonság

- Az `anon` és `authenticated` szerepkör nem olvashatja a táblát.
- A frontend közvetlenül nem szúrhat be rekordot.
- Csak a szerveroldali Edge Function kap `INSERT` jogosultságot a `service_role` szerepkörön keresztül.
- A GDPR-elfogadás kötelező adatbázis-korlát.
- Az Edge Function ellenőrzi a kötelező mezőket, az e-mail formátumát és a mezőhosszakat.

## Megjegyzés

A Database Webhook helyett közvetlen Edge Function-hívás működik, mert a Supabase webhook-létrehozása a beállításkor `schema "supabase_functions" does not exist` platformhibával leállt.
