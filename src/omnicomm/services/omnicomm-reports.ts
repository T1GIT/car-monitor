import moment from 'moment'
import { axiosOmnicommAuth } from '@/omnicomm/utils/axios'
import type { FuelReport } from '@/omnicomm/dto/fuel-report'
import type { TrackReport } from '@/omnicomm/dto/track-report'

export const omnicommReportsService = {
  fuel: (vehicleId: number, begin: Date, end: Date) =>
    axiosOmnicommAuth.get<FuelReport>(
      'ls/api/v1/reports/fuellevel',
      {
        params: {
          vehicleID: vehicleId,
          timeBegin: moment(begin).utc().unix(),
          timeEnd: moment(end).utc().unix(),
        },
      },
    ),

  track: (vehicleId: number, begin: Date, end: Date) =>
    axiosOmnicommAuth.get<TrackReport>(
      `ls/api/v1/reports/track/${vehicleId}`,
      {
        params: {
          timeBegin: moment(begin).utc().unix(),
          timeEnd: moment(end).utc().unix(),
        },
      },
    ),
}
