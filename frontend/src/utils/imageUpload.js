export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File not found");

  if (file.size > 1024 * 1024)
    //size file is 1mb
    err = "The largest file size is 1MB";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image format is not supported";
  return err;
};

export const imageUpload = async(images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    
    formData.append("upload_preset", 'awtyxoqq');
    formData.append("cloud_name", 'cotchi666');

    const res = await fetch('https://api.cloudinary.com/v1_1/cotchi666/image/upload', 
    {
        method: 'POST',
        body: formData
    })

    const data = await res.json()
    imgArr.push({public_id: data.public_id, url: data.secure_url})
  }
  return imgArr
};
