import CollapsableTextDiv from "./CollapsableTextDiv";

const LONG_TEXT =
  "Ameba és una associació cultural sense ànim de lucre dedicada a la música electrònica a Barcelona. Organitzem festivals, tallers i xerrades per apropar la cultura electrònica a tothom. Consulta més informació a https://ameba.cat i segueix-nos a les xarxes socials per no perdre't cap novetat.";

export default {
  title: "Components/CollapsableTextDiv",
  component: CollapsableTextDiv,
};

export const ShortText = {
  args: { text: "Un text curt que no es col·lapsa." },
};

export const LongTextCollapsed = {
  args: { text: LONG_TEXT },
};
