import { useState, useCallback, ChangeEvent } from 'react';
import { ImageFile } from '@shared/types';

interface UseImageUploadReturn {
  image: ImageFile | null;
  isLoading: boolean;
  handleFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  setImageFromFile: (file: File) => void;
  clearImage: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setImageFromFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      setIsLoading(true);
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setImage({ file, preview });
        setIsLoading(false);
      };
      reader.onerror = () => {
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setImageFromFile(file);
    },
    [setImageFromFile],
  );

  const clearImage = useCallback(() => {
    setImage(null);
    setIsLoading(false);
  }, []);

  return {
    image,
    isLoading,
    handleFileSelect,
    setImageFromFile,
    clearImage,
  };
};
