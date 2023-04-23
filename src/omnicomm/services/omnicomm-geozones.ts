import { axiosOmnicommAuth } from '@/omnicomm/utils/axios'
import type { Paginated } from '@/omnicomm/dto/paginated'
import type { Geozone } from '@/omnicomm/dto/geozone'

export const omnicommGeozonesService = {
  geozones: (page?: number, pageSize?: number) =>
    axiosOmnicommAuth.get<Paginated<Geozone>>(
      'api/service/geozones/geozones',
      { params: { page, pageSize } },
    ),
}
