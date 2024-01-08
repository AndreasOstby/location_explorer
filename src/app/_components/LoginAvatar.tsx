import { AvatarImage } from "./AvatarImage";

export type Props = {
  name?: string | null;
  image?: string | null;
};

export function LoginAvatar({ name, image }: Props) {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <span className=" text-secondaryBlack">{name || "Guest"}</span>
      <AvatarImage image={image} />
    </div>
  );
}
