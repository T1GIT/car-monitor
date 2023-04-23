import Axios from 'axios'
import { OMNICOMM_URL } from '@/omnicomm/constants/omnicom-url'
import { useOmnicommAuth } from '@/omnicomm/stores/omnicomm-auth'

export const axiosOmnicommBasic = Axios.create({
  baseURL: OMNICOMM_URL,
})

export const axiosOmnicommAuth = Axios.create({
  baseURL: OMNICOMM_URL,
})

axiosOmnicommAuth.interceptors.request.use(async (request) => {
  const { wait, jwt } = useOmnicommAuth()
  await wait()

  if (jwt.value)
    request.headers.setAuthorization(`JWT ${jwt.value}`)

  return request
})
