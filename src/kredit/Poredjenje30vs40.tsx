// Poređenje: kredit na 30 godina vs kredit na 40 godina (sa prevremenom otplatom)

const GLAVNICA = 80_000;
const MESECI_SUBVENCIJE = 72;

const GODISNJA_KAMATA_SUBVENCIJA = 1.5;
const GODISNJA_KAMATA_POSLE = 4.06;

function Poredjenje30vs40() {
  // ======== SCENARIO 1: Kredit na 30 godina (360 meseci) ========
  const kredit30 = simulirajKreditPotpuno({
    glavnica: GLAVNICA,
    ukupnoMeseci: 360,
    meseciSubvencije: MESECI_SUBVENCIJE,
    kamataSubvencija: GODISNJA_KAMATA_SUBVENCIJA,
    kamataNakon: GODISNJA_KAMATA_POSLE,
    dodatnaUplata: 0,
  });

  // ======== SCENARIO 2: Kredit na 40 godina (480 meseci) ========
  const kredit40 = simulirajKreditPotpuno({
    glavnica: GLAVNICA,
    ukupnoMeseci: 480,
    meseciSubvencije: MESECI_SUBVENCIJE,
    kamataSubvencija: GODISNJA_KAMATA_SUBVENCIJA,
    kamataNakon: GODISNJA_KAMATA_POSLE,
    dodatnaUplata: 0,
  });

  // ======== SCENARIO 3: Kredit na 40 godina + prevremena otplata ========
  // Dodatna uplata = razlika između rate 30god i rate 40god
  const dodatnaUplataFaza1 =
    kredit30.rataSaSubvencijom - kredit40.rataSaSubvencijom;
  const dodatnaUplataFaza2 =
    kredit30.rataBezSubvencije - kredit40.rataBezSubvencije;

  const kredit40prevremena = simulirajKreditPotpunoPrevremena({
    glavnica: GLAVNICA,
    ukupnoMeseci: 480,
    meseciSubvencije: MESECI_SUBVENCIJE,
    kamataSubvencija: GODISNJA_KAMATA_SUBVENCIJA,
    kamataNakon: GODISNJA_KAMATA_POSLE,
    dodatnaUplataFaza1,
    dodatnaUplataFaza2,
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 1200 }}>
      <h1>Poređenje: Kredit na 30 vs 40 godina</h1>
      <p>
        <strong>Glavnica:</strong> {GLAVNICA.toLocaleString()} €
      </p>

      <hr />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}
      >
        {/* SCENARIO 1 */}
        <div
          style={{ border: "2px solid #4CAF50", padding: 16, borderRadius: 8 }}
        >
          <h2 style={{ color: "#4CAF50" }}>📊 Kredit na 30 godina</h2>

          <h3>Subvencija (6 godina)</h3>
          <p>
            Rata: <strong>{kredit30.rataSaSubvencijom.toFixed(2)} €</strong>
          </p>

          <h3>Nakon subvencije</h3>
          <p>
            Rata: <strong>{kredit30.rataBezSubvencije.toFixed(2)} €</strong>
          </p>

          <hr />

          <h3>Ukupno</h3>
          <p>
            Trajanje: <strong>{kredit30.ukupnoMeseci} meseci</strong>
          </p>
          <p>
            Plaćeno: <strong>{kredit30.ukupnoPlaceno.toFixed(2)} €</strong>
          </p>
          <p>
            Kamata: <strong>{kredit30.ukupnaKamata.toFixed(2)} €</strong>
          </p>
        </div>

        {/* SCENARIO 2 */}
        <div
          style={{ border: "2px solid #FF9800", padding: 16, borderRadius: 8 }}
        >
          <h2 style={{ color: "#FF9800" }}>📊 Kredit na 40 godina</h2>

          <h3>Subvencija (6 godina)</h3>
          <p>
            Rata: <strong>{kredit40.rataSaSubvencijom.toFixed(2)} €</strong>
          </p>

          <h3>Nakon subvencije</h3>
          <p>
            Rata: <strong>{kredit40.rataBezSubvencije.toFixed(2)} €</strong>
          </p>

          <hr />

          <h3>Ukupno</h3>
          <p>
            Trajanje: <strong>{kredit40.ukupnoMeseci} meseci</strong>
          </p>
          <p>
            Plaćeno: <strong>{kredit40.ukupnoPlaceno.toFixed(2)} €</strong>
          </p>
          <p>
            Kamata: <strong>{kredit40.ukupnaKamata.toFixed(2)} €</strong>
          </p>
        </div>

        {/* SCENARIO 3 */}
        <div
          style={{ border: "2px solid #2196F3", padding: 16, borderRadius: 8 }}
        >
          <h2 style={{ color: "#2196F3" }}>
            📊 Kredit na 40 godina + prevremena otplata
          </h2>

          <h3>Subvencija (6 godina)</h3>
          <p>
            Rata: <strong>{kredit40.rataSaSubvencijom.toFixed(2)} €</strong>
          </p>
          <p>
            + prevremeno: <strong>{dodatnaUplataFaza1.toFixed(2)} €</strong>
          </p>
          <p>
            ={" "}
            <strong>
              {(kredit40.rataSaSubvencijom + dodatnaUplataFaza1).toFixed(2)} €
            </strong>
          </p>

          <h3>Nakon subvencije</h3>
          <p>
            Rata:{" "}
            <strong>{kredit40prevremena.rataBezSubvencije.toFixed(2)} €</strong>
          </p>
          <p>
            + prevremeno: <strong>{dodatnaUplataFaza2.toFixed(2)} €</strong>
          </p>
          <p>
            ={" "}
            <strong>
              {(
                kredit40prevremena.rataBezSubvencije + dodatnaUplataFaza2
              ).toFixed(2)}{" "}
              €
            </strong>
          </p>

          <hr />

          <h3>Ukupno</h3>
          <p>
            Trajanje: <strong>{kredit40prevremena.ukupnoMeseci} meseci</strong>
          </p>
          <p>
            Plaćeno:{" "}
            <strong>{kredit40prevremena.ukupnoPlaceno.toFixed(2)} €</strong>
          </p>
          <p>
            Kamata:{" "}
            <strong>{kredit40prevremena.ukupnaKamata.toFixed(2)} €</strong>
          </p>
        </div>
      </div>

      <hr />

      <h2 style={{ color: "#F44336" }}>🎯 Analiza i odgovor na pitanje:</h2>

      <div style={{ background: "#f0f0f0", padding: 20, borderRadius: 8 }}>
        <h3>Da li je efekat isti?</h3>

        <p>
          <strong
            style={{
              color:
                kredit40prevremena.ukupnoPlaceno < kredit30.ukupnoPlaceno
                  ? "green"
                  : "red",
            }}
          >
            {kredit40prevremena.ukupnoPlaceno < kredit30.ukupnoPlaceno
              ? "✅ NE - čak je BOLJE!"
              : "❌ NE - malo gore"}
          </strong>
        </p>

        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}
        >
          <thead>
            <tr style={{ background: "#333", color: "white" }}>
              <th style={{ padding: 8, textAlign: "left" }}>Metrika</th>
              <th style={{ padding: 8, textAlign: "right" }}>30 godina</th>
              <th style={{ padding: 8, textAlign: "right" }}>
                40 god + prevremena
              </th>
              <th style={{ padding: 8, textAlign: "right" }}>Razlika</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: "#fff" }}>
              <td style={{ padding: 8 }}>Trajanje (meseci)</td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {kredit30.ukupnoMeseci}
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {kredit40prevremena.ukupnoMeseci}
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {(
                  kredit40prevremena.ukupnoMeseci - kredit30.ukupnoMeseci
                ).toFixed(0)}
              </td>
            </tr>
            <tr style={{ background: "#f9f9f9" }}>
              <td style={{ padding: 8 }}>Ukupno plaćeno</td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {kredit30.ukupnoPlaceno.toFixed(2)} €
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {kredit40prevremena.ukupnoPlaceno.toFixed(2)} €
              </td>
              <td
                style={{
                  padding: 8,
                  textAlign: "right",
                  color:
                    kredit40prevremena.ukupnoPlaceno < kredit30.ukupnoPlaceno
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {(
                  kredit40prevremena.ukupnoPlaceno - kredit30.ukupnoPlaceno
                ).toFixed(2)}{" "}
                €
              </td>
            </tr>
            <tr style={{ background: "#fff" }}>
              <td style={{ padding: 8 }}>Ukupna kamata</td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {kredit30.ukupnaKamata.toFixed(2)} €
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {kredit40prevremena.ukupnaKamata.toFixed(2)} €
              </td>
              <td
                style={{
                  padding: 8,
                  textAlign: "right",
                  color:
                    kredit40prevremena.ukupnaKamata < kredit30.ukupnaKamata
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {(
                  kredit40prevremena.ukupnaKamata - kredit30.ukupnaKamata
                ).toFixed(2)}{" "}
                €
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "#fff3cd",
            borderRadius: 8,
          }}
        >
          <h4>💡 Objašnjenje:</h4>
          <p>
            <strong>Kratak odgovor:</strong> Neće biti potpuno isto, ali će biti veoma blizu – 
            i u praksi često čak malo povoljnije za tebe ako banka ne naplaćuje penale 
            za prevremenu otplatu.
          </p>
          
          <p>
            Kada uzmeš kredit na 40 godina i plaćaš više (kao da je 30 godina),
            <strong> ta dodatna uplata ide 100% na glavnicu</strong>, dok kod
            normalnog kredita na 30 godina, deo rate ide na kamatu.
          </p>
          
          <p>
            To znači da <strong>prevremenom otplatom brže smanjuješ dug</strong>{" "}
            nego sa normalnim kreditom na 30 godina, što rezultira sa{" "}
            {kredit40prevremena.ukupnoPlaceno < kredit30.ukupnoPlaceno
              ? "MANJIM"
              : "sličnim"}{" "}
            ukupnim troškovima.
          </p>

          <p>
            <strong>Kako to funkcioniše?</strong> Ako imaš istu kamatnu stopu i uplaćuješ 
            isti ili veći iznos svakog meseca, kamata se obračunava na preostali dug i 
            dug se smanjuje istim ili bržim tempom. To znači da će se rok otplate 
            automatski skraćivati i da matematički <strong>ne može biti nepovoljnije</strong> u 
            odnosu na kredit na 30 godina.
          </p>

          <p>
            <strong>Dodatna prednost:</strong> Kredit na 40 godina uz ponašanje kao da je 
            na 30 godina daje skoro isti efekat, često uz <strong>dodatnu fleksibilnost</strong> jer 
            u slučaju potrebe možeš privremeno plaćati nižu ugovorenu ratu.
          </p>

          <p style={{ fontSize: "0.9em", color: "#666", marginTop: 12 }}>
            ⚠️ Napomena: Razlika postoji samo u tehničkim detaljima kao što su način 
            preračunavanja rate i mesečna zaokruživanja, što u praksi može značiti 
            razliku od jednog do dva meseca ili nekoliko evra.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Poredjenje30vs40;

// ======================================================
// ===================== POMOĆNE FUNKCIJE ===============
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

function simulirajKreditPotpuno({
  glavnica,
  ukupnoMeseci,
  meseciSubvencije,
  kamataSubvencija,
  kamataNakon,
  dodatnaUplata,
}: {
  glavnica: number;
  ukupnoMeseci: number;
  meseciSubvencije: number;
  kamataSubvencija: number;
  kamataNakon: number;
  dodatnaUplata: number;
}) {
  const rataSaSubvencijom = izracunajRatu(
    glavnica,
    kamataSubvencija,
    ukupnoMeseci
  );

  let dug = glavnica;
  let mesec = 0;
  let ukupnoPlaceno = 0;
  let ukupnaKamata = 0;

  // Faza 1: Subvencija
  while (dug > 0 && mesec < meseciSubvencije) {
    mesec++;

    const mesecnaKamata = kamataSubvencija / 100 / 12;
    const kamata = dug * mesecnaKamata;
    ukupnaKamata += kamata;

    let uplata = rataSaSubvencijom + dodatnaUplata;
    let otplataGlavnice = uplata - kamata;

    if (otplataGlavnice > dug) {
      otplataGlavnice = dug;
      uplata = kamata + dug;
    }

    dug -= otplataGlavnice;
    ukupnoPlaceno += uplata;
  }

  // Faza 2: Posle subvencije
  const preostaliMeseci = ukupnoMeseci - meseciSubvencije;
  const rataBezSubvencije = izracunajRatu(dug, kamataNakon, preostaliMeseci);

  while (dug > 0.01) {
    mesec++;

    const mesecnaKamata = kamataNakon / 100 / 12;
    const kamata = dug * mesecnaKamata;
    ukupnaKamata += kamata;

    let uplata = rataBezSubvencije + dodatnaUplata;
    let otplataGlavnice = uplata - kamata;

    if (otplataGlavnice > dug) {
      otplataGlavnice = dug;
      uplata = kamata + dug;
    }

    dug -= otplataGlavnice;
    ukupnoPlaceno += uplata;
  }

  return {
    rataSaSubvencijom,
    rataBezSubvencije,
    ukupnoMeseci: mesec,
    ukupnoPlaceno,
    ukupnaKamata,
  };
}

function simulirajKreditPotpunoPrevremena({
  glavnica,
  ukupnoMeseci,
  meseciSubvencije,
  kamataSubvencija,
  kamataNakon,
  dodatnaUplataFaza1,
  dodatnaUplataFaza2,
}: {
  glavnica: number;
  ukupnoMeseci: number;
  meseciSubvencije: number;
  kamataSubvencija: number;
  kamataNakon: number;
  dodatnaUplataFaza1: number;
  dodatnaUplataFaza2: number;
}) {
  const rataSaSubvencijom = izracunajRatu(
    glavnica,
    kamataSubvencija,
    ukupnoMeseci
  );

  let dug = glavnica;
  let mesec = 0;
  let ukupnoPlaceno = 0;
  let ukupnaKamata = 0;

  // Faza 1: Subvencija
  while (dug > 0 && mesec < meseciSubvencije) {
    mesec++;

    const mesecnaKamata = kamataSubvencija / 100 / 12;
    const kamata = dug * mesecnaKamata;
    ukupnaKamata += kamata;

    let uplata = rataSaSubvencijom + dodatnaUplataFaza1;
    let otplataGlavnice = uplata - kamata;

    if (otplataGlavnice > dug) {
      otplataGlavnice = dug;
      uplata = kamata + dug;
    }

    dug -= otplataGlavnice;
    ukupnoPlaceno += uplata;
  }

  // Faza 2: Posle subvencije - preračunavanje rate na osnovu preostalog duga
  const preostaliMeseci = ukupnoMeseci - meseciSubvencije;
  const rataBezSubvencije = izracunajRatu(dug, kamataNakon, preostaliMeseci);

  while (dug > 0.01) {
    mesec++;

    const mesecnaKamata = kamataNakon / 100 / 12;
    const kamata = dug * mesecnaKamata;
    ukupnaKamata += kamata;

    let uplata = rataBezSubvencije + dodatnaUplataFaza2;
    let otplataGlavnice = uplata - kamata;

    if (otplataGlavnice > dug) {
      otplataGlavnice = dug;
      uplata = kamata + dug;
    }

    dug -= otplataGlavnice;
    ukupnoPlaceno += uplata;
  }

  return {
    rataSaSubvencijom,
    rataBezSubvencije,
    ukupnoMeseci: mesec,
    ukupnoPlaceno,
    ukupnaKamata,
  };
}
