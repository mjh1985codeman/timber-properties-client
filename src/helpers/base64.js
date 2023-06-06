
export const convertToBase64 = (file) => {
 return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const width = 1027;
      const height = 700;
      const image = new Image();
      image.src = fileReader.result;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width
        canvas.height = height
        ctx.drawImage(image, 0, 0, width, height);
        const resizedDataURL = canvas.toDataURL('image/jpeg'); // Adjust the format as needed
        resolve(resizedDataURL);
      };
      image.onerror = (error) => {
        reject(error);
      };
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};