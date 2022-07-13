import axios from 'axios'

export default async (req, res) => {
  let response
  try {
    response = await axios.post(
      'https://sandbox-api.zoodpay.com/v0/configuration',
      {
        market_code: 'UZ',
      },
      {
        auth: {
          username: 'Fr@telli_C@sa',
          password: 'QpN*y#0CSkwDadt[',
        },
      }
    )
    res.end(JSON.stringify(response.data))
  } catch (e) {
    res.end(JSON.stringify(e))
    return
  }
}
