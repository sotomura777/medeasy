import type { Patologia, Abreviatura } from '../schema';
import abreviaturas from './abreviaturas.json';

import amigdalite from './patologias/amigdalite.json';
import anafilaxia from './patologias/anafilaxia.json';
import anemia from './patologias/anemia.json';
import asma from './patologias/asma.json';
import asmaDiag from './patologias/asma-diag.json';
import avc from './patologias/avc.json';
import cefaleia from './patologias/cefaleia.json';
import cetoacidose from './patologias/cetoacidose.json';
import convulsao from './patologias/convulsao.json';
import criseHiper from './patologias/crise-hiper.json';
import delirium from './patologias/delirium.json';
import dpoc from './patologias/dpoc.json';
import edemaPulmonar from './patologias/edema-pulmonar.json';
import espasmoMuscular from './patologias/espasmo-muscular.json';
import fibrilhaoAuricular from './patologias/fibrilhao-auricular.json';
import hemorragiaDigestiva from './patologias/hemorragia-digestiva.json';
import herpesVirus from './patologias/herpes-virus.json';
import hipoglicemia from './patologias/hipoglicemia.json';
import infecoesVaginais from './patologias/infecoes-vaginais.json';
import ist from './patologias/ist.json';
import itu from './patologias/itu.json';
import osteoporose from './patologias/osteoporose.json';
import pancreatite from './patologias/pancreatite.json';
import pneumonia from './patologias/pneumonia.json';
import psoriase from './patologias/psoriase.json';
import riniteCronica from './patologias/rinite-cronica.json';
import sca from './patologias/sca.json';
import sepsis from './patologias/sepsis.json';
import sincope from './patologias/sincope.json';
import tep from './patologias/tep.json';
import vih from './patologias/vih.json';

export const patologias = [
  amigdalite,
  anafilaxia,
  anemia,
  asma,
  asmaDiag,
  avc,
  cefaleia,
  cetoacidose,
  convulsao,
  criseHiper,
  delirium,
  dpoc,
  edemaPulmonar,
  espasmoMuscular,
  fibrilhaoAuricular,
  hemorragiaDigestiva,
  herpesVirus,
  hipoglicemia,
  infecoesVaginais,
  ist,
  itu,
  osteoporose,
  pancreatite,
  pneumonia,
  psoriase,
  riniteCronica,
  sca,
  sepsis,
  sincope,
  tep,
  vih,
] as Patologia[];

export { abreviaturas };
export type { Abreviatura };
