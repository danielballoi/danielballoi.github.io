// Punto d'ingresso della Lambda (handler "index.handler", Node.js 22).
// Qui ci sono solo i client AWS: la logica è in src/pubblica.mjs.
// @aws-sdk/client-s3 e @aws-sdk/client-ssm sono già inclusi nel runtime Lambda.
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
import { creaHandler } from './src/pubblica.mjs'

const s3 = new S3Client({})
const ssm = new SSMClient({})

// Creato all'avvio: se manca una variabile d'ambiente la Lambda fallisce subito con un errore chiaro.
export const handler = creaHandler({
  env: process.env,
  fetch: globalThis.fetch,
  async leggiOggetto(params) {
    const risposta = await s3.send(new GetObjectCommand(params))
    return {
      contentLength: risposta.ContentLength,
      testo: () => risposta.Body.transformToString('utf-8'),
      annulla: () => risposta.Body?.destroy?.(),
    }
  },
  async leggiParametro(nome) {
    const risposta = await ssm.send(new GetParameterCommand({ Name: nome, WithDecryption: true }))
    return risposta.Parameter?.Value
  },
})
