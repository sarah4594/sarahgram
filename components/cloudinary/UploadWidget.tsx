import React, { useEffect, useRef } from 'react'

type Props = {
  id: string
  cloudName: string
  uploadPreset: string
  cropping: boolean
  onUpload: (result: any) => {}
}

const UploadWidget = ({
  id,
  cloudName,
  uploadPreset,
  cropping,
  onUpload,
}: Props) => {
  const widget = useRef()
  useEffect(() => {
    // @ts-ignore
    widget.current = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        inlineContainer: `#${id}`,
        cropping: 'server',
        multiple: false,
        croppingAspectRatio: 1,
      },
      // @ts-ignore
      (error, result) => {
        if (!error && result && result.event === 'success') {
          onUpload(result)
        }
      },
    )
    //@ts-ignore
    widget.current.open()
  }, [id, cloudName, uploadPreset])

  return <div id={id}></div>
}

export default UploadWidget
