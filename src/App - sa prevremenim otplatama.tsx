// ================= KONSTANTE =================
const GLAVNICA = 100000;
const UKUPNO_GODINA = 40;
const SUBVENCIJA_GODINA = 6;
const SUBVENCIJA_MESECI = 72;
const PRVA_KAMATA = 1.5;
const DRUGA_KAMATA = 4.06;

// prevremena otplata
const PREVREMENA_OTPLATA = 5000; // €
const PERIOD_PREVREMENE = 12; // na koliko meseci

// ================= TIPOVI =================
type OtplataSnapshot = {
  mesec: number;
  dug: number;
  ukupnoPlaceno: number;
};

// ================= KOMPONENTA =================
export default function App() {
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

  const simulacija = simulirajKreditSaPrevremenimOtplatama({
    pocetniDug: dugPosle6,
    godisnjaKamata: DRUGA_KAMATA,
    mesecnaRata: rataPosle6,
    prevremenaOtplata: PREVREMENA_OTPLATA,
    periodMeseci: PERIOD_PREVREMENE,
  });

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2>Simulacija kredita</h2>

      <p>Rata prvih 6 godina: {rataPrvih6.toFixed(2)} €</p>
      <p>Preostali dug posle 6 godina: {dugPosle6.toFixed(2)} €</p>
      <p>Rata nakon 6 godina: {rataPosle6.toFixed(2)} €</p>

      <hr />

      <h3>Prevremene otplate</h3>
      <p>
        Prevremena otplata: {PREVREMENA_OTPLATA} € svakih {PERIOD_PREVREMENE}{" "}
        meseci
      </p>

      <p>
        Kredit zatvoren za <b>{simulacija.ukupnoMeseci}</b> meseci (
        {(simulacija.ukupnoMeseci / 12).toFixed(1)} godina)
      </p>

      <p>Ukupno plaćeno: {simulacija.ukupnoPlaceno.toFixed(2)} €</p>

      <hr />

      <h3>Prvih 12 meseci (snapshot)</h3>
      <pre style={{ fontSize: 12 }}>
        {JSON.stringify(simulacija.snapshots.slice(0, 12), null, 2)}
      </pre>
    </div>
  );
}

// ================= FUNKCIJE =================

// ===== Formula za mesečnu ratu =====
// faktor = (1 + r)^n
// A = P * (r * faktor) / (faktor - 1)
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

  const faktor = Math.pow(1 + mesecnaKamata, brojMeseci);

  return (glavnica * mesecnaKamata * faktor) / (faktor - 1);
}

function izracunajPreostaliDug(
  glavnica: number,
  godisnjaKamata: number,
  ukupnoGodina: number,
  posleMeseci: number
): number {
  const mesecnaKamata = godisnjaKamata / 100 / 12;
  const ukupnoMeseci = ukupnoGodina * 12;

  const faktorUkupno = Math.pow(1 + mesecnaKamata, ukupnoMeseci);
  const faktorPosle = Math.pow(1 + mesecnaKamata, posleMeseci);

  return glavnica * ((faktorUkupno - faktorPosle) / (faktorUkupno - 1));
}

function simulirajKreditSaPrevremenimOtplatama({
  pocetniDug,
  godisnjaKamata,
  mesecnaRata,
  prevremenaOtplata,
  periodMeseci,
}: {
  pocetniDug: number;
  godisnjaKamata: number;
  mesecnaRata: number;
  prevremenaOtplata: number;
  periodMeseci: number;
}) {
  const mesecnaKamata = godisnjaKamata / 100 / 12;

  let dug = pocetniDug;
  let mesec = 0;
  let ukupnoPlaceno = 0;

  const snapshots: OtplataSnapshot[] = [];

  while (dug > 0) {
    mesec++;

    const kamata = dug * mesecnaKamata;
    const otplataGlavnice = mesecnaRata - kamata;

    if (otplataGlavnice <= 0) {
      throw new Error("Rata je premala za ovu kamatu");
    }

    dug -= otplataGlavnice;
    ukupnoPlaceno += mesecnaRata;

    if (periodMeseci > 0 && mesec % periodMeseci === 0 && dug > 0) {
      const iznos = Math.min(prevremenaOtplata, dug);
      dug -= iznos;
      ukupnoPlaceno += iznos;
    }

    snapshots.push({
      mesec,
      dug: Math.max(dug, 0),
      ukupnoPlaceno,
    });
  }

  return {
    ukupnoMeseci: mesec,
    ukupnoPlaceno,
    snapshots,
  };
}
