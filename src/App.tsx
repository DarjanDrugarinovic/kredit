import { useState } from "react";

import BezPrevremeneOtplate from "./kredit/BezPrevremeneOtplate";
import PrevremenaOtplataV1 from "./kredit/PrevremenaOtplataV1";
import PrevremenaOtplataV2 from "./kredit/PrevremenaOtplataV2";
import Poredjenje30vs40 from "./kredit/Poredjenje30vs40";

type Opcija = "bez" | "v1" | "v2" | "poredjenje";

const App = () => {
  const [opcija, setOpcija] = useState<Opcija>("bez");

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2>Izbor simulacije kredita</h2>
      <div style={{ display: "flex", gap: 2 }}>
        <label>
          <input
            type="radio"
            name="kredit"
            value="bez"
            checked={opcija === "bez"}
            onChange={() => setOpcija("bez")}
          />
          Bez prevremene otplate
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="kredit"
            value="v1"
            checked={opcija === "v1"}
            onChange={() => setOpcija("v1")}
          />
          Prevremena otplata – V1
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="kredit"
            value="v2"
            checked={opcija === "v2"}
            onChange={() => setOpcija("v2")}
          />
          Prevremena otplata – V2
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="kredit"
            value="poredjenje"
            checked={opcija === "poredjenje"}
            onChange={() => setOpcija("poredjenje")}
          />
          Poređenje 30 vs 40 godina
        </label>
      </div>
      <hr />

      {opcija === "bez" && <BezPrevremeneOtplate />}
      {opcija === "v1" && <PrevremenaOtplataV1 />}
      {opcija === "v2" && <PrevremenaOtplataV2 />}
      {opcija === "poredjenje" && <Poredjenje30vs40 />}
    </div>
  );
};

export default App;
