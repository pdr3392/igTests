//A DEFINIÇÃO DO PRISMIC_ENDPOINT COMO VARIÁVEL AMBIENTE, POR ALGUM MOTIVO, QUEBROU A APLICAÇÃO.
//UM POST NO FÓRUM DA ROCKETSEAT DIZIA QUE A DECLARAÇÃO "ESTÁTICA" DO ENDPOINT+
//DA FORMA FEITA ABAIXO "DEU CONTA". NESTA APLICAÇÃO, OBSERVOU-SE O MESMO.
import Prismic from "@prismicio/client";

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client("https://pdr3392ignews.prismic.io/api/v2", {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismic;
}
