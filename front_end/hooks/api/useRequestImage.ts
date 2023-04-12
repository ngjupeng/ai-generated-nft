import { useMutation } from "@tanstack/react-query";

const requestImage = async (description: string) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(description),
    }
  );
  const result = await response.blob();
  return result;
};

const useRequestImage = (
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  return useMutation({
    mutationFn: requestImage,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export { useRequestImage };
