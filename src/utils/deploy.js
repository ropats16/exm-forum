import { Exm, ContractType } from '@execution-machine/sdk';
import fs from 'fs';

const APIKEY = process.env.EXM_PK;
export const exmInstance = new Exm({ token: APIKEY });

const contractSource = fs.readFileSync('./src/utils/handler.js');
const data = await exmInstance.functions.deploy(
  contractSource,
  {
    "discussions": {}
  },
  ContractType.JS);

console.log({ data });

/* after the contract is deployed, write the function id to a local file */
fs.writeFileSync('./src/utils/functionId.js', `export const functionId = "${data.id}"`);
