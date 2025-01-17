import { ImageWithDefault } from "@/components/ImageWithDefault";

interface PostCardHeaderProps {
  imageUrl?: string;
  title: string;
  description?: string;
}

export const PostCardHeader = ({
  imageUrl,
  title,
  description,
}: PostCardHeaderProps) => {
  return (
    <div className="flex flex-row gap-4">
      <ImageWithDefault alt={title} imageUrl={imageUrl} />
      <TitleAndDescription title={title} description={description} />
    </div>
  );
};

interface TitleAndDescriptionProps {
  title: string;
  description?: string;
}

const TitleAndDescription = ({
  title,
  description,
}: TitleAndDescriptionProps) => {
  return (
    <div className={`flex flex-col gap-2 overflow-hidden`}>
      <h1 className="truncate text-2xl font-extrabold">{title}</h1>
      <p className="line-clamp-3">{description}</p>
    </div>
  );
};
