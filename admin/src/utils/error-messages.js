export const getErrorMessage = (error) => {
  let msg = error?.response?.data?.message
  if (msg[0].message) {
    msg = msg[0].message
  }
  if (!msg) {
    msg = "出了点问题，请重试。"
  }
  return msg
}
