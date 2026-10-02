import { gsap } from "./gsapSetup";
import { Flip } from "gsap/Flip";

// Flip viu en un mòdul a part de gsapSetup perquè només el fan servir rutes
// lazy (Lab, Festivals, ProductePage). Registrat des de gsapSetup arrossegava
// els seus 48 kB al chunk d'entrada, que es baixa a totes les pàgines.
// ScrollTrigger i SplitText sí que es queden a gsapSetup: la Home s'importa
// de forma estàtica (per l'LCP del hero) i els necessita d'inici.
gsap.registerPlugin(Flip);

export { Flip };
