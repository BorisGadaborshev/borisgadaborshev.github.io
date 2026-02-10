import { useState, useCallback, ChangeEvent } from 'react';
import { ImageFile } from '@shared/types';

interface UseImageUploadReturn {
  image: ImageFile | null;
  handleFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [image, setImage] = useState<ImageFile | null>(null);

  const handleFileSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setImage({ file, preview });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
  }, []);

  return {
    image,
    handleFileSelect,
    clearImage,
  };
};
