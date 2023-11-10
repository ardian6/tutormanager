const FileToData = (file) => {
  const validFileTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];
  const valid = validFileTypes.find((type) => type === file.type);
  // console.log(file.type);
  if (!valid) {
    throw Error("provided file is not a png, jpg, jpeg, pdf file.");
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

export default FileToData;
