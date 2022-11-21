import client from "@lib/util/request"

export const socialLogin = (data: any) => {
  return client.request({
    method: "POST",
    url: "/store/social-login",
    data,
  })
}
