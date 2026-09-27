import * as mockApi from './mockApi'
import * as httpApi from './httpApi'

const useMockApi =
  import.meta.env.VITE_USE_MOCK_API !== 'false'

const api = useMockApi
  ? mockApi
  : httpApi

export const {
  listPasta,
  getPasta,
  createPasta,
  updatePastaTime,
  resetPastaTime,
  updatePasta,
  deletePasta,
} = api