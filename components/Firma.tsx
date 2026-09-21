/**
 * La firma FUTURE AI del piè di pagina.
 *
 * Presa da `FUTURE_AI/_azienda/firma/Firma.jsx`, che è la versione ufficiale:
 * il tracciato non si ridisegna a mano e non si ritocca. È un `path` unico,
 * senza font da caricare e senza richieste di rete.
 *
 * Il colore lo prende dal testo attorno (`currentColor`): su questo piè di
 * pagina scuro esce chiara, e se un domani diventasse chiaro si invertirebbe
 * da sola. Per lo stesso motivo non va colorata a mano né col gradiente del
 * logo: è una firma, non il marchio.
 */
export default function Firma({
  testo = "Sito realizzato da",
  destra = false,
  className = "",
}: {
  /** L'occhiello sopra: "Sito", "Gestionale", "App", "Automazione" realizzata da. */
  testo?: string;
  /** Allineata a destra, per i piè di pagina a colonne. */
  destra?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`fai-firma${destra ? " fai-firma--destra" : ""} ${className}`}
      href="https://www.futureai.it"
      target="_blank"
      rel="noopener"
      aria-label={`${testo} FUTURE AI`}
    >
      <span className="fai-firma__occhiello">{testo}</span>
      <svg
        className="fai-firma__segno"
        viewBox="-10.6 -48.0 392.7 156.0"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M211.9 100V0H242.58Q250.25 0 254.18 3.49Q258.1 6.99 259.43 13.27Q260.77 19.55 260.77 28.01Q260.77 36.19 258.69 41.08Q256.62 45.97 250.88 47.84Q255.6 48.81 257.5 52.53Q259.4 56.25 259.4 62.16V100H239.69V60.85Q239.69 56.48 237.9 55.43Q236.11 54.38 232.13 54.38V100ZM75.18 100.91Q62.68 100.91 56.77 93.89Q50.86 86.88 50.86 73.24V0H70.29V72.44Q70.29 74.94 70.58 77.24Q70.86 79.55 71.88 81.02Q72.9 82.5 75.18 82.5Q77.51 82.5 78.53 81.05Q79.55 79.6 79.81 77.27Q80.06 74.94 80.06 72.44V0H99.5V73.24Q99.5 86.88 93.59 93.89Q87.68 100.91 75.18 100.91ZM178.71 100.91Q166.21 100.91 160.3 93.89Q154.4 86.88 154.4 73.24V0H173.83V72.44Q173.83 74.94 174.11 77.24Q174.4 79.55 175.42 81.02Q176.44 82.5 178.71 82.5Q181.04 82.5 182.07 81.05Q183.09 79.6 183.34 77.27Q183.6 74.94 183.6 72.44V0H203.03V73.24Q203.03 86.88 197.12 93.89Q191.21 100.91 178.71 100.91ZM268.56 100V0H308.56V19.32H288.9V38.81H307.76V57.61H288.9V80.51H309.86V83.1C309.91 83.1 309.95 83.1 310 83.1C314.64 83.1 318.4 86.86 318.4 91.5C318.4 96.14 314.64 99.9 310 99.9C309.95 99.9 309.91 99.9 309.86 99.9V100ZM324.62 58H375.07C377.83 58 380.07 60.24 380.07 63V101C380.07 103.76 377.83 106 375.07 106H324.62C321.86 106 319.62 103.76 319.62 101V63C319.62 60.24 321.86 58 324.62 58ZM4.43 100V27H12.4V19H4.43V14H15.4V4H23.4V0H44.43V19.49H24.55V35.4H43.41V54.66H24.55V100ZM116.95 100V19.2H105.07V0H148.82V19.2H136.95V100ZM333.2 100H339.81L340.23 94.51H344.33L344.81 100H351.25L348.02 66H336.49ZM360.5 100H367.07V66H360.5ZM232.24 37.05H237.07Q241.22 37.05 241.22 28.01Q241.22 22.16 240.31 20.34Q239.4 18.52 236.9 18.52H232.24ZM6.4 -17H18.4V-5H6.4ZM25.4 -31H34.4V-22H25.4ZM-8.6 -9H-1.6V-2H-8.6ZM38.4 -46H44.4V-40H38.4ZM340.72 89.09 342.01 71.8H342.32L343.81 89.09ZM13.4 0V3H4.43V0Z" />
      </svg>
    </a>
  );
}
