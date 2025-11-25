import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { conexao } from "../firebase/firebaseConexao";
import estacImg from "../assets/MAQUETE.png";

export function Mapa() {
  const db = getDatabase(conexao);

  type VagaKeys =
    | "V1"
    | "V2"
    | "V3"
    | "V4"
    | "V5"
    | "V6"
    | "V7"
    | "V8"
    | "V9"
    | "V10"
    | "V11"
    | "V12";

  const initialVagas: Record<VagaKeys, number> = {
    V1: 0,
    V2: 0,
    V3: 0,
    V4: 0,
    V5: 0,
    V6: 0,
    V7: 0,
    V8: 0,
    V9: 0,
    V10: 0,
    V11: 0,
    V12: 0,
  };

  const [vagas, setVagas] = useState<Record<VagaKeys, number>>(initialVagas);

  useEffect(() => {
    const sensorRef = ref(db, "sensores/current");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVagas((prev) => ({ ...prev, ...data }));
      }
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [db]);

  const linha1 = ["V9", "V7", "V3", "V2", "V5", "V6", "V1", "V8"] as VagaKeys[];
  const linha2 = ["V5", "V4", "V11", "V10"] as VagaKeys[];

  // base image dimensions (used to calculate relative positions)
  const baseW = 800;
  const baseH = 450;

  function pxToPercentX(px: number) {
    return (px / baseW) * 100;
  }

  function pxToPercentY(px: number) {
    return (px / baseH) * 100;
  }

  const markerSizePct = (25 / baseW) * 100; // width/height as % of container

  return (
    <div
      id="mapa"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #1E3C72, #2A5298)",
        borderRadius: "10px",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: `${baseW}px`,
        }}
      >
        {/* Aspect-ratio box to keep the map's proportions */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: `${(baseH / baseW) * 100}%`,
            backgroundImage: `url(${estacImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {linha1.map((vaga, i) => {
            const leftPx = 180 + i * 58;
            const topPx = 28;
            return (
              <div
                key={vaga}
                style={{
                  position: "absolute",
                  left: `${pxToPercentX(leftPx)}%`,
                  top: `${pxToPercentY(topPx)}%`,
                  width: `${markerSizePct}%`,
                  height: `5%`,
                  borderRadius: "50%",
                  backgroundColor: vagas[vaga] === 1 ? "red" : "limegreen",
                  transition: "background-color 0.5s",
                  transform: "translate(-50%, -50%)",
                  marginLeft: "14px",
                }}
              />
            );
          })}

          {linha2.map((vaga, i) => {
            const leftPx = 185 + i * 60;
            const topPx = 165;
            return (
              <div
                key={vaga}
                style={{
                  position: "absolute",
                  left: `${pxToPercentX(leftPx)}%`,
                  top: `${pxToPercentY(topPx)}%`,
                  width: `${markerSizePct}%`,
                  height: `5%`,
                  borderRadius: "50%",
                  backgroundColor: vagas[vaga] === 1 ? "red" : "limegreen",
                  transition: "background-color 0.5s",
                  transform: "translate(-50%, -50%)",
                  marginLeft: "14px",
                  marginTop: "24px",
                }}
              />
            );
          })}
        </div>
      </div>

      <p style={{ marginTop: "15px", fontSize: "clamp(14px, 1.6vw, 18px)" }}>
        {Object.values(vagas).filter((v) => v === 0).length} vagas disponíveis de {Object.keys(vagas).length -1}
      </p>
    </div>
  );
}
