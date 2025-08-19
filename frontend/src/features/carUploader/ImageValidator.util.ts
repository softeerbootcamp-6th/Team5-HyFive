const MAX_FILE_SIZE = 1024 * 1024 * 20; //20MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

const ImageValidator = (file: File) => {
  const validateImageSize = () => {
    return file.size <= MAX_FILE_SIZE;
  };
  const validateImageType = () => {
    return ACCEPTED_IMAGE_MIME_TYPES.includes(file.type);
  };
  return {
    validateImageSize,
    validateImageType,
  };
};

export default ImageValidator;
