import Compressor from "compressorjs";

export async function compressFile(file) {
  if (file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 1024,
        maxHeight: 1024,
        convertSize: 200000,
        success(compressedImage) {
          const resultFile = new File([compressedImage], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resultFile);
        },
        error(err) {
          reject(err);
        },
      });
    });
  } else {
    return file;
  }
}
