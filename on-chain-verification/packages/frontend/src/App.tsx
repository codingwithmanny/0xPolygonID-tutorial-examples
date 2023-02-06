// Imports
// ========================================================
import { useEffect, useState } from 'react';
import { QRCode } from 'react-qr-svg';
import { AppStore, PlayStore } from "./components/Icons";
import proofRequestSchema from '../config/proofRequestSchema';

// Config
// ========================================================
/**
 * Overriding the proofRequestSchema.ts file
 */
const qrProofRequestJson: any = { ...proofRequestSchema };
qrProofRequestJson.body.transaction_data.contract_address = `${import.meta.env.VARS?.CONTRACT_ADDRESS}`;
qrProofRequestJson.body.transaction_data.method_id = `${import.meta.env.VARS?.METHOD_ID}`;
qrProofRequestJson.body.transaction_data.chain_id = parseInt(import.meta.env.VARS?.CHAIN_ID, 0);
qrProofRequestJson.body.transaction_data.network = `${import.meta.env.VARS?.NETWORK}`;
qrProofRequestJson.body.scope[0].rules.query.allowed_issuers = `${import.meta.env.VARS?.ALLOWED_ISSUERS}`.split(';');
qrProofRequestJson.body.scope[0].rules.query.req = {
  [`${import.meta.env.VARS?.REQ_ATTRIBUTE}`]: {
    [`${import.meta.env.VARS?.REQ_OPERATOR}`]: parseInt(`${import.meta.env.VARS?.REQ_VALUE}`)
  }
}
qrProofRequestJson.body.scope[0].rules.query.schema.url = `${import.meta.env.VARS?.SCHEMA_URL}`;
qrProofRequestJson.body.scope[0].rules.query.schema.type = `${import.meta.env.VARS?.SCHEMA_TYPE}`;

// Main Component
// ========================================================
const App = () => {
  // State / Props
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Render
  return (
    <div className="px-4 md:px-8 py-12 relative">
      <h1 className="text-zinc-100 text-3xl font-semibold md:text-5xl md:font-bold mb-4 text-center">On-Chain Verification Prompt</h1>
      <p className="text-zinc-400 text-lg md:text-2xl text-center mb-8">An example of performing a request for a claim to complete an on-chain-verification.</p>

      <QRCode
        className="w-full max-w-[320px] md:w-[320px] border-[20px] border-zinc-600 rounded mb-8 mx-auto"
        level="Q"
        value={JSON.stringify(qrProofRequestJson)}
      />

      <div className="mb-8">
        <p className="text-zinc-600 text-md md:text-lg text-center mb-4">Deployed Contract Address</p>
        <a target="_blank" title={`${import.meta.env.VARS?.CONTRACT_ADDRESS}`} href={`https://mumbai.polygonscan.com/address/${import.meta.env.VARS?.CONTRACT_ADDRESS}`} className="bg-zinc-400 hover:bg-zinc-100 transition-colors ease-in-out duration-200 overflow-scroll px-4 text-zinc-700 font-mono mx-auto text-center w-full block max-w-[480px] rounded-full h-10 leading-10 text-lg text-ellipsis">{import.meta.env.VARS?.CONTRACT_ADDRESS}</a>
      </div>

      <hr className="border-zinc-700 mb-6 md:mb-8" />

      <section className="flex flex-col">
        <p className="text-zinc-400 md:text-xl text-center mb-4">Download Polygon ID App.</p>
        <div className="flex flex-col items-center md:flex-row justify-center">
          <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank"><AppStore className="w-auto h-16 m-2" /></a>
          <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet&gl=US" target="_blank"><PlayStore className="w-auto h-16 m-2" /></a>
        </div>
      </section>

      <button onClick={() => setIsDebugOpen(!isDebugOpen)} title="Schema Debug" className={`bg-zinc-200 hover:bg-white transition-all ease-in-out duration-300 h-12 w-12 font-semibold rounded-tl-full rounded-bl-full md:rounded-full absolute top-8 ${isDebugOpen ? 'right-0 md:right-[500px]' : 'right-0 md:right-8'} z-10 `}>{isDebugOpen ? <span>&times;</span> : '{ }'}</button>

      <aside className={`fixed transition-all ease-in-out duration-300 overflow-scroll top-0 bottom-0 ${isDebugOpen ? 'right-0' : '-right-full'} w-full md:max-w-[480px] bg-black shadow`}>
        <div className="pt-20 pb-6 px-6">
          <code>
            <pre className="text-zinc-300">
              {JSON.stringify(proofRequestSchema, null, '  ')}
            </pre>
          </code>
        </div>
        <code className="text-zinc-400 bg-zinc-800 lowercase rounded flex items-center h-8 px-2 absolute top-6 left-6">Schema</code>
      </aside>
    </div>
  );
};

// Exports
// ========================================================
export default App;
