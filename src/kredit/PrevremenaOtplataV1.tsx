// ================= KONSTANTE =================
const GLAVNICA = 80_000;

const KAMATA_SUBVENCIJA = 1.5;
const KAMATA_NAKON = 4.06;

const UKUPNO_MESECI = 480;
const MESECI_SUBVENCIJE = 72;

const PREVREMENA_OTPLATA = 100; // +100€ svaki mesec

// ================= TIPOVI =================
type RezultatSimulacije = {
  ukupnoMeseci: number;
  ukupnoPlaceno: number;
  ukupnaKamata: number;
};

// ================= LOGIKA =================
function izracunajRatu(
  glavnica: number,
  godisnjaKamata: number,
  brojMeseci: number
): number {
  const mesecnaKamata = godisnjaKamata / 100 / 12;

  return (
    (glavnica * mesecnaKamata * Math.pow(1 + mesecnaKamata, brojMeseci)) /
    (Math.pow(1 + mesecnaKamata, brojMeseci) - 1)
  );
}

function simulirajKredit(): RezultatSimulacije {
  let dug = GLAVNICA;
  let mesec = 0;
  let ukupnoPlaceno = 0;

  // početna rata (bez prevremene)
  let rata = izracunajRatu(GLAVNICA, KAMATA_SUBVENCIJA, UKUPNO_MESECI);

  while (dug > 0) {
    mesec++;

    const godisnjaKamata =
      mesec <= MESECI_SUBVENCIJE ? KAMATA_SUBVENCIJA : KAMATA_NAKON;

    // nakon isteka subvencije – preračunavanje rate
    if (mesec === MESECI_SUBVENCIJE + 1) {
      const preostaliMeseci = UKUPNO_MESECI - MESECI_SUBVENCIJE;
      rata = izracunajRatu(dug, KAMATA_NAKON, preostaliMeseci);
    }

    const mesecnaKamata = godisnjaKamata / 100 / 12;
    const kamataZaMesec = dug * mesecnaKamata;

    let uplata = rata + PREVREMENA_OTPLATA;
    let otplataGlavnice = uplata - kamataZaMesec;

    // poslednja rata (da ne ode u minus)
    if (otplataGlavnice > dug) {
      otplataGlavnice = dug;
      uplata = kamataZaMesec + dug;
    }

    dug -= otplataGlavnice;
    ukupnoPlaceno += uplata;
  }

  return {
    ukupnoMeseci: mesec,
    ukupnoPlaceno,
    ukupnaKamata: ukupnoPlaceno - GLAVNICA,
  };
}

// ================= REACT APP =================
export default function PrevremenaOtplataV1() {
  const rezultat = simulirajKredit();

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h2>Stambeni kredit – prevremena otplata</h2>

      <p>
        <strong>Glavnica:</strong> {GLAVNICA.toLocaleString()} €
      </p>
      <p>
        <strong>Prevremena otplata:</strong> +{PREVREMENA_OTPLATA} € / mesec
      </p>

      <hr />

      <p>
        <strong>Ukupno trajanje:</strong> {rezultat.ukupnoMeseci} meseci (
        {(rezultat.ukupnoMeseci / 12).toFixed(2)} godina)
      </p>

      <p>
        <strong>Ukupno plaćeno:</strong> {rezultat.ukupnoPlaceno.toFixed(2)} €
      </p>

      <p>
        <strong>Ukupna kamata:</strong> {rezultat.ukupnaKamata.toFixed(2)} €
      </p>
    </div>
  );
}
