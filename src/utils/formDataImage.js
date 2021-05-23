import { dataURLtoFile, blobToFile } from './toFileoFile';

export const uploadFile = async (file, type) => {
  const formData = new FormData()
  if (type && type.toLowerCase() === 'base64') {
    const f = dataURLtoFile(file, 'img.png')
    formData.append('file', f)
  } else if (type && type.toLowerCase() === 'blob') {
    const f = blobToFile(file, 'img.png')
    formData.append('file', f)
  } else {
    formData.append('file', file)
  }
  // const response = await uploadEvidencia(formData)
  // return response
}
