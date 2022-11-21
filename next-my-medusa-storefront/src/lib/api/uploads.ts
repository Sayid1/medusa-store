import client from "@lib/util/request"

export const uploads = (files: any) => {
  const formData = new FormData()
  for (const f of files) {
    formData.append("files", f)
  }
  return client.request({
    method: "POST",
    url: "/store/upload",
    headers: {
      "content-type": "multipart/form-data",
    },
  })
}
