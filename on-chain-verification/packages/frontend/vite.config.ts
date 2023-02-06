import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Additional configuration done to vitejs to expose non-VITE-prefixed env vars
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VARS': {
        ETHERSCAN_API_KEY: env.ETHERSCAN_API_KEY,
        RPC_MUMBAI_URL: env.RPC_MUMBAI_URL,
        CONTRACT_ADDRESS: env.CONTRACT_ADDRESS,
        METHOD_ID: env.METHOD_ID,
        CHAIN_ID: env.CHAIN_ID,
        NETWORK: env.NETWORK,
        ALLOWED_ISSUERS: env.ALLOWED_ISSUERS,
        REQ_ATTRIBUTE: env.REQ_ATTRIBUTE,
        REQ_OPERATOR: env.REQ_OPERATOR,
        REQ_VALUE: env.REQ_VALUE,
        SCHEMA_URL: env.SCHEMA_URL,
        SCHEMA_TYPE: env.SCHEMA_TYPE,
      }
    }
  };
})
