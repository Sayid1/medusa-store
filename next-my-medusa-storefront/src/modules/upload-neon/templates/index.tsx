import React, { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { emailRegex } from "@lib/util/regex"
import Input from "@modules/common/components/input"
import Textarea from "../components/textarea"
import FileUploadField from "@modules/common/components/file-upload-field"
import { useForm, Control, FormProvider, Controller } from "react-hook-form"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { uniqBy } from "lodash"
import { uploads, addArtwork } from "@lib/api"

const CustomTemplate: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formMethods = useForm({
    defaultValues: {
      artworkFiles: [],
      name: "",
      email: "",
      phone: "",
      describe: "",
    },
  })

  const {
    watch,
    control,
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = formMethods

  const submit = async (data: any) => {
    setLoading(true)
    const { artworkFiles, ...rest } = data
    const files = await uploads(artworkFiles.map((file) => file.nativeFile))
    const artwork = await addArtwork({
      ...rest,
      artwork_files: files.uploads.map((file) => file.url).join(","),
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="content-container max-w-[60rem] mt-10 pb-10">
      {loading && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,.25)] z-10 flex flex-col items-center justify-center px-4 py-8 text-gray-900">
          <Spinner size={64} color="#000" />
        </div>
      )}
      {(!submitted && (
        <>
          <div className="my-20 text-center">
            <h1 className="text-[32px]">UPLOAD YOUR ARTWORK/LOGO</h1>
            <p className="text-gray-500 text-lg mt-4">
              We will contact you within 24 hours of your submission
            </p>
          </div>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(submit)}>
              <Controller
                control={control}
                name="artworkFiles"
                render={({ field: { value, onChange } }) => (
                  <>
                    <FileUploadField
                      placeholder={
                        <span className="text-gray-500 text-xl">
                          File Accepted: JPEG, JPG, GIF, PNG, EPS, PDF, PSD, AI,
                          BMP, TIF, TIFF
                        </span>
                      }
                      onFileChosen={(files: any[]) => {
                        const artworkFiles = Array.from(files).map((file) => ({
                          url: URL.createObjectURL(file),
                          name: file.name,
                          size: file.size,
                          nativeFile: file,
                        }))
                        onChange(
                          uniqBy(
                            [...value, ...artworkFiles],
                            (file) => file.name
                          )
                        )
                      }}
                      filetypes={[
                        "JPEG",
                        "JPG",
                        "GIF",
                        "PNG",
                        "EPS",
                        "PDF",
                        "PSD",
                        "AI",
                        "BMP",
                        "TIF",
                        "TIFF",
                      ]}
                      className="py-large"
                    />
                    <div className="divide-y divide-dashed">
                      {watch("artworkFiles").map((file, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center group py-2"
                        >
                          <p className="text-gray-500 text-sm">{file.name}</p>
                          <XMarkIcon
                            onClick={() => {
                              value.splice(index, 1)
                              onChange(value)
                            }}
                            className="w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-700"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              />
              <div className="mt-4">
                <Input
                  immersive={false}
                  label="Your Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  autoComplete="name"
                  required
                  errors={errors}
                  touched={touchedFields}
                />
              </div>
              <div className="mt-4">
                <Input
                  immersive={false}
                  label="Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: emailRegex,
                  })}
                  autoComplete="email"
                  required
                  errors={errors}
                  touched={touchedFields}
                />
              </div>
              <div className="mt-4">
                <Input
                  immersive={false}
                  label="Your Phone"
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  autoComplete="phone"
                  required
                  errors={errors}
                  touched={touchedFields}
                />
              </div>
              <div className="mt-4 flex gap-8">
                <div className="flex-1">
                  <Textarea
                    placeholder="Describe your thoughts as best you can. Or enter nothing and wait for us to contact you"
                    label="Tell us as much as you can about your new Custom Neon sign"
                    {...register("describe")}
                    autoComplete="describe"
                    rows={4}
                    errors={errors}
                    touched={touchedFields}
                  />
                </div>
                {/* <ul className="list-disc mt-6">
              <li>Type the wording or attach an image</li>
              <li>Type the wording or attach an image</li>
              <li>Type the wording or attach an image</li>
              <li>Type the wording or attach an image</li>
            </ul> */}
              </div>
              <Button type="submit" className="mt-8">
                Submit
              </Button>
            </form>
          </FormProvider>
        </>
      )) || (
        <>
          <h1 className="text-[36px] mt-20">
            We have received your customization request and will contact you
            within 24 hours. Please check your email.
          </h1>
        </>
      )}
    </div>
  )
}

export default CustomTemplate
