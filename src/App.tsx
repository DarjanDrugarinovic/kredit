const GLAVNICA = 100000;
const UKUPNO_GODINA = 40;
const SUBVENCIJA_GODINA = 6;
const SUBVENCIJA_MESECI = 72;
const PRVA_KAMATA = 1.5;
const DRUGA_KAMATA = 4.06;

function App() {
  const rataPrvih6 = izracunajRatu(GLAVNICA, PRVA_KAMATA, UKUPNO_GODINA);

  const dugPosle6 = izracunajPreostaliDug(
    GLAVNICA,
    PRVA_KAMATA,
    UKUPNO_GODINA,
    SUBVENCIJA_MESECI
  );

  const rataPosle6 = izracunajRatu(
    dugPosle6,
    DRUGA_KAMATA,
    UKUPNO_GODINA - SUBVENCIJA_GODINA
  );

  return (
    <div>
      <p>Rata prvih 6 godina: {rataPrvih6.toFixed(2)} €</p>
      <p>Preostali dug posle 6 godina: {dugPosle6.toFixed(2)} €</p>
      <p>Rata narednih 34 godine: {rataPosle6.toFixed(2)} €</p>
    </div>
  );
}

export default App;

// =====Formula za mesečnu ratu=====
//  faktor = (1+r)^n
//  A = P ⋅ (r * faktor) / (faktor - 1)
//
// A – mesečna rata
// P – preostala glavnica
// r – mesečna kamatna stopa
// n – broj preostalih meseci

function izracunajRatu(
  glavnica: number,
  godisnjaKamata: number,
  brojGodina: number
): number {
  const mesecnaKamata = godisnjaKamata / 100 / 12;
  const brojMeseci = brojGodina * 12;

  if (mesecnaKamata === 0) {
    return glavnica / brojMeseci;
  }

  return (
    (glavnica * mesecnaKamata * Math.pow(1 + mesecnaKamata, brojMeseci)) /
    (Math.pow(1 + mesecnaKamata, brojMeseci) - 1)
  );
}

function izracunajPreostaliDug(
  glavnica: number,
  godisnjaKamata: number,
  ukupnoGodina: number,
  posleMeseci: number
) {
  const mesecnaKamata = godisnjaKamata / 100 / 12;
  const ukupnoMeseci = ukupnoGodina * 12;

  const faktor = Math.pow(1 + mesecnaKamata, ukupnoMeseci);
  const faktorK = Math.pow(1 + mesecnaKamata, posleMeseci);

  return glavnica * ((faktor - faktorK) / (faktor - 1));
}
