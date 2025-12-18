// https://banking.raiffeisenbank.rs/stambeni-kredit-za-mlade/

const GLAVNICA = 80_000;
const UKUPNO_MESECI = 480;
const MESECI_SUBVENCIJE = 72;

const GODISNJA_KAMATA_SUBVENCIJA = 1.5;
const GODISNJA_KAMATA_POSLE = 4.06;

const DODATNA_UPLATA = 100; // prevremena otplata po mesecu

function PrevremenaOtplataV2() {
  // ================== SUBVENCIJA ==================
  const rataSaSubvencijom = izracunajRatu(
    GLAVNICA,
    GODISNJA_KAMATA_SUBVENCIJA,
    UKUPNO_MESECI
  );

  const subvencija = simulirajKredit({
    glavnica: GLAVNICA,
    godisnjaKamata: GODISNJA_KAMATA_SUBVENCIJA,
    mesecnaRata: rataSaSubvencijom,
    dodatnaUplata: DODATNA_UPLATA,
    maxMeseci: MESECI_SUBVENCIJE,
  });

  const dugPosleSubvencije = subvencija.preostaliDug;

  // ================== POSLE SUBVENCIJE ==================
  const preostaliMeseci = UKUPNO_MESECI - MESECI_SUBVENCIJE;
  const rataBezSubvencije = izracunajRatu(
    dugPosleSubvencije,
    GODISNJA_KAMATA_POSLE,
    preostaliMeseci
  );

  const bezSubvencije = simulirajKredit({
    glavnica: dugPosleSubvencije,
    godisnjaKamata: GODISNJA_KAMATA_POSLE,
    mesecnaRata: rataBezSubvencije,
    dodatnaUplata: DODATNA_UPLATA,
    maxMeseci: UKUPNO_MESECI,
  });

  const ukupnoMeseci = subvencija.ukupnoMeseci + bezSubvencije.ukupnoMeseci;

  const ukupnoPlaceno = subvencija.ukupnoPlaceno + bezSubvencije.ukupnoPlaceno;

  const ukupnaKamata = subvencija.ukupnaKamata + bezSubvencije.ukupnaKamata;

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Stambeni kredit – simulacija sa prevremenom otplatom</h2>

      <p>📌 Glavnica: {GLAVNICA.toFixed(2)} €</p>
      <p>➕ Prevremena uplata: +{DODATNA_UPLATA} € / mesec</p>

      <hr />

      <h3>Subvencionisani period (1.5%)</h3>
      <p>Rata: {rataSaSubvencijom.toFixed(2)} €</p>
      <p>Meseci: {subvencija.ukupnoMeseci}</p>
      <p>Preostali dug: {dugPosleSubvencije.toFixed(2)} €</p>

      <hr />

      <h3>Nakon subvencije (4.06%)</h3>
      <p>Rata: {rataBezSubvencije.toFixed(2)} €</p>
      <p>Meseci: {bezSubvencije.ukupnoMeseci}</p>

      <hr />

      <h3>Ukupno</h3>
      <p>Ukupno meseci otplate: {ukupnoMeseci}</p>
      <p>Ukupno plaćeno: {ukupnoPlaceno.toFixed(2)} €</p>
      <p>Ukupna kamata: {ukupnaKamata.toFixed(2)} €</p>

      <p>
        ⏱ Skraćenje roka u odnosu na 480 meseci:{" "}
        <strong>{480 - ukupnoMeseci} meseci</strong>
      </p>
    </div>
  );
}

export default PrevremenaOtplataV2;

// ======================================================
// ===================== POMOĆNE FUNKCIJE =================
// ======================================================

function izracunajRatu(
  glavnica: number,
  godisnjaKamata: number,
  brojMeseci: number
): number {
  const mesecnaKamata = godisnjaKamata / 100 / 12;

  if (mesecnaKamata === 0) {
    return glavnica / brojMeseci;
  }

  return (
    (glavnica * mesecnaKamata * Math.pow(1 + mesecnaKamata, brojMeseci)) /
    (Math.pow(1 + mesecnaKamata, brojMeseci) - 1)
  );
}

function simulirajKredit({
  glavnica,
  godisnjaKamata,
  mesecnaRata,
  dodatnaUplata,
  maxMeseci,
}: {
  glavnica: number;
  godisnjaKamata: number;
  mesecnaRata: number;
  dodatnaUplata: number;
  maxMeseci: number;
}) {
  const mesecnaKamata = godisnjaKamata / 100 / 12;

  let dug = glavnica;
  let mesec = 0;
  let ukupnoPlaceno = 0;
  let ukupnaKamata = 0;

  while (dug > 0 && mesec < maxMeseci) {
    mesec++;

    const kamata = dug * mesecnaKamata;
    ukupnaKamata += kamata;

    let uplata = mesecnaRata + dodatnaUplata;
    let otplataGlavnice = uplata - kamata;

    // poslednja rata (da ne ode u minus)
    if (otplataGlavnice > dug) {
      otplataGlavnice = dug;
      uplata = kamata + dug;
    }

    dug -= otplataGlavnice;
    ukupnoPlaceno += uplata;
  }

  return {
    ukupnoMeseci: mesec,
    ukupnoPlaceno,
    ukupnaKamata,
    preostaliDug: dug,
  };
}
