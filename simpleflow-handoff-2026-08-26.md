# Simple Flow – rövid handoff

**Állapot:** 2026. augusztus 26. délelőtt  
**Technológia:** React + Vite  
**Következő feladat:** kapcsolatfelvételi űrlap bekötése Supabase-re localhoston

## Aktuális forrásfájlok

A felhasználó helyi projektjéből visszatöltött, hiteles verziók:

- `src/pages/HomePage.jsx` – feltöltve `HomePage(1).jsx` néven
- `src/components/ContactForm.jsx` – feltöltve `ContactForm(1).jsx` néven
- `src/components/Footer.jsx` – feltöltve `Footer(1).jsx` néven
- `src/styles.css` – feltöltve `styles(1).css` néven

A további munkában mindig ezekből kell kiindulni. A felhasználó a saját helyi projektjében végzi a módosításokat; az asszisztens pontosan megadja, melyik fájlban mit kell átírni. A felhasználó a munkamenet végén tölti vissza az aktuális fájlokat, hogy ne akadjanak össze a párhuzamos módosítások.

## Elkészült módosítások

- Javítva a `HomePage.jsx` „adminisztrációban” elírása.
- Javítva a `ContactForm.jsx` kötelező mezőkre vonatkozó hibaüzenete.
- A szekciófejlécek egyoszloposak: a cím teljes szélességet használhat, a kiegészítő szöveg `760px` maximális szélességű.
- Az előny- és szolgáltatásikonok középre kerültek.
- Az ikon és a cím között egységesen `2rem` távolság van.
- A szolgáltatáskártyák címei középre igazítottak; a listák balra maradtak.
- A csomagok órakerete, neve, ára és CTA-gombja középre igazított; a leírás és a lista balra maradt.
- Elkészült a diszkrét, fix „vissza a tetejére” nyíl sötétkék, `2px`-es körvonallal.
- A nyíl akkor jelenik meg, amikor a felhasználó eléri a második, `.benefits-section` szekciót.
- Mobilon a konténer oldalsó margója `16px`.
- Mobilon a `h1` mérete: `clamp(2.6rem, 12vw, 3.5rem)`.
- `480px` alatt a hero- és Rólam-kép kitölti a konténer teljes szélességét.
- Mobilon az előnyblokkok címei és bekezdései balra igazítottak; a külön `32px`-es behúzás végül kikerült.
- A footer mobilon teljesen középre rendezett.

## Elfogadott munkamenet

1. A desktop és reszponzív design lezárult.
2. Délután: Supabase-bekötés localhoston.
3. A működő helyi teszt után: Vercel deploy és a környezeti változók beállítása.
4. Következő nap: `flowwolf.hu` folytatása.

## Supabase cél

- A kapcsolatfelvételi űrlap adatai kerüljenek Supabase-táblába.
- Mezők: név, cégnév, e-mail, telefonszám, üzenet, adatkezelési elfogadás és beküldési idő.
- Publikus olvasás nem engedélyezett.
- Az RLS csak a szükséges anonim beszúrást engedje.
- A frontend a projekt URL-jét és publishable kulcsát `.env.local` fájlból kapja.
- Titkos/admin kulcs nem kerülhet a Vite frontendbe vagy GitHubra.
- A `.env.local` szerepeljen a `.gitignore` fájlban.
- A Vercel nem előfeltétel: először localhoston készül el és lesz tesztelve a bekötés.

## Későbbi technikai ellenőrzés

- Az űrlap bekötésekor ellenőrizni kell a küldés alatti állapotot, a duplaküldés tiltását, a sikeres ürítést és a felhasználóbarát hibaüzenetet.
- A `styles.css` fájlban érdemes majd egy rövid technikai takarítást végezni: duplikált `.section-lead` szabály látható, valamint a `backdrop-filter: blur(px)` hibás értékét `blur(18px)`-re kell javítani.
