# Simple Flow – design upgrade handoff

**Állapot:** 2026. augusztus 25.  
**Projekt:** Simple Flow – online vállalkozástámogatás  
**Technológia:** React + Vite  
**Következő lépés:** reszponzív mobilnézet teljes ellenőrzése és finomítása

## A handoff célja

Ez a dokumentum a Simple Flow React-oldal jelenlegi design- és tartalmi állapotát foglalja össze. Új beszélgetésben ezt a fájlt és az alább felsorolt módosított projektfájlokat kell forrásként használni. A felhasználó helyi gépén lévő, most módosított fájlok az aktuális és hiteles verziók.

## Módosított, visszatöltendő fájlok

1. `src/pages/HomePage.jsx`
2. `src/styles.css`
3. `src/components/ContactForm.jsx`
4. `src/components/Footer.jsx`
5. `public/assets/facebook.svg`
6. `public/assets/instagram.svg`

Ezeket kell visszatölteni a következő munkamenethez. A `node_modules` mappát nem kell feltölteni.

## Elfogadott vizuális irány

- Az eredeti design alapkaraktere megmaradt, nem teljes újratervezés történt.
- Háttér: meleg beige–porcelán, enyhén vajas hangulat.
- Fő háttérszín: `#f5f0e7`.
- Fő sötét szövegszín: `#2a3937`.
- Kék főszín: `#6787b6`.
- Sötétkék: `#3f608f`.
- Rózsaszín maradt a CTA-k és kisebb kiemelések színe.
- A design letisztult, komoly, de nem merev; csak funkcionális, visszafogott mozgásokat használunk.
- Nem kerül minden szekcióba külön dinamika vagy CTA.
- A szekciócímek alapvetően balra igazítottak; a korábbi váltakozó középre/balra igazítást egységesítettük.

## Logó és favicon

- A fejléc és a footer ugyanazt a teljes színes logó-SVG-t használja.
- Fő logó: `public/assets/simpleflow-logo.svg`.
- Submark: `public/assets/simpleflow-mark.svg`.
- Favicon: `public/favicon.svg` és `public/favicon.ico`.
- A favicon csak a négyzetes submark, felirat nélkül.
- A logó fő betűtípusa Plus Jakarta Sans.
- A teljes logó egyetlen SVG-eszköz, nem külön HTML-szöveg és kép.
- A logó később még cserélhető/finomítható, de jelenleg használható.

## Hero szekció

### Elfogadott tartalom

- Főcímben a megszólítás nagybetűs: `Te`.
- CTA: **„Konzultációt kérek!”**
- A „Díjmentes” szó kikerült a gombból; a díjmentességet a környező tartalom kommunikálja.
- A „10+ év nagyvállalati tapasztalat” lebegő kártya helye megfelelő.
- A lebegő kártya jobbra tolása: `right: -16px`.

### Nyitókép

- A jelenlegi világos home-office fotó egyelőre marad.
- Illik a porcelános, nyugodt hangulathoz, de kissé általános.
- Később csak akkor cseréljük, ha van egyértelműen jobb, természetes saját üzleti fotó.

### Képstílus

A tartalmi fotók közös, könnyű árnyékot és rózsaszín–kék, elmosott derengést kaptak. A logót és az ikonokat ez a globális képstílus nem érinti.

A közös szelektor:

```css
:is(.image-frame, .about-visual, .contact-image)
```

Fő árnyék:

```css
box-shadow:
  0 2px 6px rgba(42, 57, 55, 0.04),
  0 18px 40px rgba(63, 96, 143, 0.1),
  0 36px 70px rgba(42, 57, 55, 0.07);
```

A kép mögötti glow rózsaszínből kékbe fut, `blur(28px)` értékkel. A Rólam képnél a derengés iránya tükrözött, mert a kép a bal oldalon található.

## Előnyök szekció

Szekciócím: **„Több idő arra, ami igazán számít”**.

- A szekció fejlécéből kikerült az `align="center"`, így balra igazított.
- A három előnyblokk statikus maradt; nem kapott külön hovert vagy animációt.
- Nem került alá új CTA, mert közvetlenül utána kezdődik a szolgáltatások szekció.
- A harmadik szövegben `Te` nagybetűs.
- A „Kiszámítható költségek” malacpersely ikonja helyett `Calculator` ikon került be a `lucide-react` csomagból.

## Szolgáltatások szekció

- A WordPress nincs külön kihangsúlyozva.
- Elfogadott szöveg: **„Weboldaltartalmak kezelése, szövegírás és blogcikkek készítése”**.
- A „szövegek” helyett tudatosan „szövegírás” szerepel.
- Az „Online felületek kezelése” robotikonja helyett `MonitorSmartphone` ikon került be, mert jobban jelzi a többféle online felületet.

## Csomagajánlatok

### Piaci és árazási döntés

A korábbi mindhárom csomagnál azonos, 5 500 Ft + ÁFA effektív óradíjat alacsonynak ítéltük a több mint tízéves nagyvállalati tapasztalat, az önálló munkavégzés és a specializált online/webes tudás mellett.

Elfogadott árak:

| Csomag | Keret | Ár | Effektív óradíj |
|---|---:|---:|---:|
| Esszencia | 12 óra/hó | 84 000 Ft + ÁFA | 7 000 Ft |
| Fókusz | 20 óra/hó | 132 000 Ft + ÁFA | 6 600 Ft |
| Prémium | 40 óra/hó | 252 000 Ft + ÁFA | 6 300 Ft |

A nagyobb csomagok fokozatos óradíjkedvezményt adnak. A webdesign, arculat és React-weboldal nem része automatikusan ennek az óradíjnak; ezek külön projektajánlatot igényelnek.

### Elfogadott csomagtartalom

#### Esszencia

- Leírás: „Ha néhány visszatérő háttérfeladatot szeretnél rendszeresen és megbízhatóan kiszervezni.”
- Havi 12 órás időkeret.
- Előre egyeztetett adminisztratív feladatok.
- Ütemezett munkavégzés az egyeztetett prioritások szerint.

#### Fókusz

- Leírás: „Ha már több területen is szükséged van folyamatos segítségre és kiszámítható háttértámogatásra.”
- Havi 20 órás időkeret.
- Többféle adminisztratív és online feladat.
- Rendszeres egyeztetés és feladattervezés.
- Ez a kiemelt, „Legnépszerűbb” csomag.

#### Prémium

- Leírás: „Ha jelentős mennyiségű háttérfeladatot adnál át, és hosszú távú, szorosabb együttműködést keresel.”
- Havi 40 órás időkeret.
- Összetett és rendszeresen visszatérő feladatok.
- Kiemelt kapacitás és folyamatos kapcsolattartás.

### Csomag CTA és design

- CTA: **„Ajánlatot kérek!”**
- A szekció fejlécéből kikerült az `align="center"`, így balra igazított.
- A középső kártya alapból valamivel nagyobb és kék keretes.
- Minden csomagkártya hoverkor finoman `translateY(-6px)` értékkel emelkedik.
- A hover árnyéka enyhén erősödik.
- A keretszín hoverkor nem változik; a Fókusz kék kerete stabil marad.
- Az effekt nem ugrál és nem zavaró.

## Rólam szekció

### Elfogadott cím

**„Nemcsak elvégzem a feladatot – átlátom a működést is”**

### Elfogadott szöveg

> Több mint tíz év nagyvállalati tapasztalata megtanított arra, hogy rendszerben gondolkodjak, felismerjem a prioritásokat és felelősséget vállaljak a rám bízott feladatokért.
>
> Ha együtt dolgozunk, nem várok minden lépésnél újabb utasításra. Megismerem a vállalkozásod működését, kérdezek, amikor szükséges, önállóan haladok, és időben jelzem, ha valami figyelmet vagy döntést igényel.
>
> Az adminisztrációt, az online felületeket és a webes feladatokat nem egymástól elszigetelt teendőként kezelem. Az összefüggéseket keresem, hogy ne egy újabb ember legyek, akit koordinálnod kell, hanem valódi, megbízható háttértámogatást kapj.

CTA: **„Beszéljük át a feladataidat!”**

A szöveg fő pozicionálása: Mónika nem egyszerű végrehajtó, hanem önálló, proaktív, rendszerben gondolkodó partner. Nem kell noszogatni vagy folyamatosan menedzselni.

A jelenlegi Rólam-fotó egyelőre marad, de később cserélhető.

## Kapcsolat és űrlap

### Elrendezés

- A korábbi kapcsolatfotó kikerült.
- A szöveges blokk és az űrlap egymás alatt helyezkedik el.
- A `.contact-grid` egyoszlopos.
- A korábbi `max-width: 900px` korlátozás kikerült, ezért az űrlap ugyanazt a rendelkezésre álló konténerszélességet használja, mint a többi szekció.
- A bevezető szöveg külön `max-width: 680px` korlátozást kapott, hogy a sorok ne legyenek túl hosszúak.

### Mezők és validáció

- Név – kötelező.
- Cégnév – opcionális.
- E-mail cím – kötelező.
- Telefonszám – opcionális.
- „Miben segíthetek?” – kötelező.
- Adatkezelési checkbox – kötelező.
- Az üzenet placeholder szövege: „Írd le röviden, milyen feladatokat szeretnél kiszervezni.”
- A JavaScript-validáció már az üzenetmezőt is ellenőrzi.
- Hibaüzenet: „Kérlek, töltsd ki a kötelező mezőket, és fogadd el az adatkezelési tájékoztatót.”
- Az adatkezelési checkbox fölött külön segédszöveg szerepel: `* Kötelezően kitöltendő mezők`.
- A segédszöveg `.required-note` osztállyal kisebb, visszafogott formázást kapott.

### Űrlap design

- A mezők enyhén áttetsző porcelános hátteret és nagyon finom belső/külső árnyékot kaptak.
- Fókuszban a mező világosabb lesz, kék fókuszgyűrűvel.
- Az űrlapkártya háttere `rgba(255, 253, 250, 0.55)`.
- Ez a viszonylag erős áttetszőség elfogadott: a kék háttérrel matt, kékes üveghatást ad, miközben az olvashatóság megfelelő.
- `backdrop-filter: blur(18px)` és WebKit-változat használható.
- Az adatkezelési link alapból rózsaszín; hoverkor sötétkékre vált és vastagabb lesz.
- A Supabase-bekötés későbbi feladat. Jelenleg az űrlap csak frontend-validációt és státuszüzenetet használ.

## Footer

### Elfogadott design

- A sötét footer kikerült.
- A footer ugyanazt a porcelános `var(--color-bg)` hátteret használja, mint a fejléc.
- Vékony felső elválasztó kerete van.
- Ugyanaz a teljes színes logó jelenik meg, mint a fejlécben; a `Brand` komponensről kikerült a `light` prop.
- Háromoszlopos desktop elrendezés: logó és leírás / hasznos linkek / közösségi ikonok.
- Mobilon minden footertartalom középre igazított.

### Közösségi ikonok

- Csak Facebook és Instagram maradt.
- LinkedIn kikerült.
- Az ikonok sötétkékek, a kapcsolat szekcióban használt `#3f608f` színnel.
- Az SVG-kben a korábbi `rgb(160,187,228)` kitöltések lettek módosítva.
- Az Instagram SVG több színértéket/réteget tartalmazott, ezért több helyen kellett átszínezni.
- Hoverkor az ikonok finoman felfelé mozdulnak.

### Linkek és copyright

- A footer szöveges linkjei hoverkor sötétkékre váltanak és `font-weight: 600` értékre vastagodnak.
- A copyright végleges szerkezete:

```text
© [aktuális év] Simple Flow – minden jog fenntartva. · Készítette: Pixelliberty
```

- A „Pixelliberty” kattintható, új lapon a `https://pixelliberty.hu` oldalra vezet.
- A Simple Flow az oldal/tartalom márkája, a Pixelliberty külön készítői kreditet kap.

## Következő munkamenet feladatai

1. A felhasználó visszatölti a hat módosított fájlt.
2. Ezek a fájlok felülírják a korábbi, nálunk lévő példányokat.
3. Teljes reszponzív ellenőrzés következik:
   - fejléc és mobilmenü;
   - hero tördelés és képkivágás;
   - lebegő „10+ év” kártya pozíciója;
   - előnyblokkok;
   - szolgáltatáskártyák;
   - csomagkártyák és kiemelt kártya;
   - Rólam kép–szöveg sorrend;
   - kapcsolat űrlap mezői és szélessége;
   - footer középre igazítása;
   - 480 px alatti nézet.
4. A mobil QA után technikai takarítás és build/lint ellenőrzés.
5. Később: kapcsolatfelvételi űrlap Supabase-integrációja.

## Munkamódszer

- A felhasználó helyben, VS Code-ban módosítja a fájlokat.
- Az asszisztens pontos fájlnevet, keresendő szelektort/szöveget és cserét ad meg.
- A designról kritikus, szakmai véleményt kell adni; nem kell minden ötletet automatikusan megerősíteni.
- Egyszerre egy szekción haladunk.
- A meglévő design karakterét megtartjuk, csak korszerűsítjük és egységesítjük.
- A szövegek egyes szám első személyben maradnak.

