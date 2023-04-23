import { axiosOmnicommBasic } from '@/omnicomm/utils/axios'
import type { LoginResponse } from '@/omnicomm/dto/login-response'

export const omnicommAuthService = {
  login: (login: string, password: string) =>
    axiosOmnicommBasic.post<LoginResponse>(
      'auth/login',
      { login, password },
      { params: { jwt: 1 } },
    ),

  refresh: (refresh: string) =>
    axiosOmnicommBasic.post<LoginResponse>(
      'auth/refresh',
      null,
      { headers: { Authorization: `JWT ${refresh}` } },
    ),
}
