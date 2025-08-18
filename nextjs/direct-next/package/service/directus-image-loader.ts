// Custom loader for Directus images
export const directusImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Extract the asset ID from the full URL
  const assetId = src.split("/assets/")[1];
  if (!assetId) return src;

  // Use Directus transform API for optimization
  const params = new URLSearchParams({
    width: width.toString(),
    quality: (quality || 75).toString(),
    format: "webp",
  });

  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${assetId}?${params}`;
};
