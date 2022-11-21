import client from "@lib/util/request"

export const socialLogin = (data: any) => {
  return client.request({
    method: "POST",
    url: "/store/social-login",
    data,
  })
}

export const addArtwork = (data: any) => {
  return client.request({
    method: "POST",
    url: "/store/artwork",
    data,
  })
}

export const uploads = (files: any) => {
  const formData = new FormData()
  for (const f of files) {
    formData.append("files", f)
  }
  return client.request({
    method: "POST",
    url: "/store/upload",
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  })
}
