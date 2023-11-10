const FileToData = (file) => {
  const validFileTypes = ["file/jpeg", "file/png", "file/jpg", "file/pdf"];
  const valid = validFileTypes.find((type) => type === file.type);

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
