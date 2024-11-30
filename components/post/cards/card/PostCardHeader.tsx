import { ImageWithDefault } from "@/components/ImageWithDefault";
import { PropsWithChildren } from "react";

interface PostCardHeaderProps {
  imageUrl?: string;
  title: string;
  description?: string;
}

export const PostCardHeader = ({
  imageUrl,
  title,
  description,
}: PropsWithChildren<PostCardHeaderProps>) => {
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
}: PropsWithChildren<TitleAndDescriptionProps>) => {
  return (
    <div className={`flex flex-col gap-2 overflow-hidden`}>
      <h1 className="text-2xl font-extrabold truncate ">{title}</h1>
      <p className="line-clamp-3">{description}</p>
    </div>
  );
};
