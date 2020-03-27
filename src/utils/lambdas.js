import axios from 'axios'

export const getLocationData = async (ipAddress) => {
  if (ipAddress) {
    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`)
    const {
      data: { city, region, country },
    } = response

    return { city, region, country }
  }

  return {}
}
