// https://banking.raiffeisenbank.rs/stambeni-kredit-za-mlade/

const GLAVNICA = 80_000;
const UKUPNO_MESECI = 480;
const MESECI_SUBVENCIJE = 72;

const MESECI_NAKON_SUBVENCIJE = UKUPNO_MESECI - MESECI_SUBVENCIJE;
const PROSLO_MESECI_DO_10_GODINE = 4 * 12;

function BezPrevremeneOtplate() {
  // =============PRVIH 6 GODINA=============
  let preostali_meseci = UKUPNO_MESECI;
  const rataSaSubvencijom = izracunajRatu(GLAVNICA, 1.5, preostali_meseci);
  const dugPosleSubvencije = izracunajPreostaliDug(
    rataSaSubvencijom,
    1.5,
    preostali_meseci,
    MESECI_SUBVENCIJE
  );

  // =============NAKON 6 GODINE=============
  preostali_meseci = MESECI_NAKON_SUBVENCIJE;
  const rataBezSubvencije = izracunajRatu(
    dugPosleSubvencije,
    4.06,
    preostali_meseci
  );
  const dugPosle10Godina = izracunajPreostaliDug(
    rataBezSubvencije,
    4.06,
    preostali_meseci,
    PROSLO_MESECI_DO_10_GODINE
  );

  // =============UKUPNO PLACENO=============
  const ukupnoPlacenoSaSubvencijom = rataSaSubvencijom * MESECI_SUBVENCIJE;
  const ukupnoPlacanoBezSubvencije =
    rataBezSubvencije * MESECI_NAKON_SUBVENCIJE;
  const ukupnoPlaceno = ukupnoPlacenoSaSubvencijom + ukupnoPlacanoBezSubvencije;
  const ukupnaKamata = ukupnoPlaceno - GLAVNICA;

  return (
    <div>
      <p>Rata prvih 6 godina: {rataSaSubvencijom.toFixed(2)} €</p>
      <p>Rata nakon 6 godine: {rataBezSubvencije.toFixed(2)} €</p>
      <br />
      <p>Preostali dug posle 6 godina: {dugPosleSubvencije.toFixed(2)} €</p>
      <p>Preostali dug posle 10 godina: {dugPosle10Godina.toFixed(2)} €</p>
      <br />
      <p>Ukupno plaćeno (dug + kamata): {ukupnoPlaceno.toFixed(2)} €</p>
      <p>Ukupna kamata: {ukupnaKamata.toFixed(2)} €</p>
    </div>
  );
}

export default BezPrevremeneOtplate;

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

function izracunajPreostaliDug(
  mesecnaRata: number,
  godisnjaKamata: number,
  ukupnoMeseci: number,
  prosloMeseci: number
) {
  const mesecnaKamata = godisnjaKamata / 100 / 12;
  const preostaloMeseci = ukupnoMeseci - prosloMeseci;

  if (mesecnaKamata === 0) {
    return mesecnaRata * preostaloMeseci;
  }

  return (
    mesecnaRata *
    ((1 - Math.pow(1 + mesecnaKamata, -preostaloMeseci)) / mesecnaKamata)
  );
}
