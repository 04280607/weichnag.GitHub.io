import crypto from 'crypto'

export default async function handler(req, res) {
  const { text, target } = req.body

  const appid = "20260408002589942"
  const key = "p8vVSXAxIgBIZFxemo6D"
  const salt = Date.now()

  const sign = crypto
    .createHash('md5')
    .update(appid + text + salt + key)
    .digest('hex')

  const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(text)}&from=auto&to=${target}&appid=${appid}&salt=${salt}&sign=${sign}`

  const response = await fetch(url)
  const data = await response.json()

  res.status(200).json({
    translation: data.trans_result ? data.trans_result[0].dst : text
  })
}
