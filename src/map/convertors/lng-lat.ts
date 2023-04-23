export const lngLatConvertor = {
  fromPoint: <P extends {
    latitude: number
    longitude: number
  }>(
    point: P,
  ): [number, number] => [point.longitude, point.latitude],
}
