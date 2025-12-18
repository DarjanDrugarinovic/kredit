# Kontekst: Anuitetski kredit

Ovo je dokument koji služi kao **brzi referentni kontekst** za rad sa anuitetskim kreditima, posebno u scenarijima sa subvencijom i promenom kamatne stope.

---

## 1. Formula za mesečnu anuitetsku ratu

\[
A = P \cdot \frac{r (1+r)^n}{(1+r)^n - 1}
\]

- **A** – mesečna rata
- **P** – preostala glavnica
- **r** – mesečna kamatna stopa
- **n** – broj preostalih meseci

**Napomena:** Ako je `r = 0`, formula se svodi na:

\[
A = \frac{P}{n}
\]

### 1.1 Eksponencijalni faktor

\[
faktor = (1+r)^n
\]
- Takođe nazvan: faktor kapitalizacije ili faktor rasta.
- Predstavlja koliko će 1 jedinica novca porasti posle `n` perioda sa kamatom `r` po periodu.

---

## 2. Preostali dug posle k meseci

\[
P_k = P \cdot \frac{(1+r)^n - (1+r)^k}{(1+r)^n - 1}
\]

- **P_k** – preostala glavnica posle `k` meseci
- **P** – početna glavnica
- **r** – mesečna kamata
- **n** – ukupni broj meseci kredita
- **k** – broj meseci koji su prošli

---

## 3. Dvostepeni krediti (subvencionisani)

- **Prva faza:** niska kamata (subvencionisana)
  - Primer: 1.5% godišnje, rata se računa na ceo rok
  - Trajanje: npr. 6 godina
- **Druga faza:** puna kamata
  - Primer: 4.06% godišnje, preostali period
  - Glavnica: preostali dug iz prve faze

### Primer obračuna

1. Izračuna se mesečna rata za prvih 6 godina.
2. Izračuna se preostala glavnica posle 72 meseca.
3. Izračuna se nova rata za preostalih 34 godine.

---

## 4. TypeScript funkcije

```ts
const izracunajRatu = (
  glavnica: number,
  godisnjaKamata: number,
  brojGodina: number
): number => {
  const mesecnaKamata = godisnjaKamata / 100 / 12;
  const brojMeseci = brojGodina * 12;

  if (mesecnaKamata === 0) return glavnica / brojMeseci;

  return (
    (glavnica * mesecnaKamata * Math.pow(1 + mesecnaKamata, brojMeseci)) /
    (Math.pow(1 + mesecnaKamata, brojMeseci) - 1)
  );
};

const izracunajPreostaliDug = (
  glavnica: number,
  godisnjaKamata: number,
  ukupnoGodina: number,
  posleMeseci: number
): number => {
  const mesecnaKamata = godisnjaKamata / 100 / 12;
  const ukupnoMeseci = ukupnoGodina * 12;
  const faktor = Math.pow(1 + mesecnaKamata, ukupnoMeseci);
  const faktorK = Math.pow(1 + mesecnaKamata, posleMeseci);
  return glavnica * ((faktor - faktorK) / (faktor - 1));
};
```

---

## 5. Primer scenario

- Kredit: 80.000 €
- Trajanje: 40 godina
- Prvih 6 godina: 1.5% kamata
- Nakon 6 godina: 4.06% kamata

Rezultat aproksimativno:
- Rata prvih 6 godina: 221.74 €
- Preostali dug posle 6 godina: 72.000 €
- Rata narednih 34 godine: 320.42 €

---

## 6. Bilans pri prodaji stana

Ako se stan proda posle X godina:
- Dobija se keš = prodajna cena – preostali dug
- Neto rezultat = keš – ukupno uplaćeno

---

Ovo je dovoljno da se brzo podsetiš **formule, funkcija i principa dvostepenog kredita** pri sledećem razgovoru ili kodiranju.

