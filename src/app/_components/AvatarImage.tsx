import { cn } from "~/@/lib/utils";

type Props = {
  image?: string | null;
  square?: boolean;
};

export function AvatarImage({ image, square }: Props) {
  return (
    <>
      {image ? (
        <img
          src={image}
          alt="avatar"
          className={cn(
            "aspect-square h-full rounded-full",
            square && "rounded-sm",
          )}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="aspect-square h-full rounded-full bg-white/10 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM10 2C14.418 2 18 5.582 18 10C18 14.418 14.418 18 10 18C5.582 18 2 14.418 2 10C2 5.582 5.582 2 10 2ZM10 6C8.346 6 7 7.346 7 9C7 10.654 8.346 12 10 12C11.654 12 13 10.654 13 9C13 7.346 11.654 6 10 6ZM10 8C10.552 8 11 8.448 11 9C11 9.552 10.552 10 10 10C9.448 10 9 9.552 9 9C9 8.448 9.448 8 10 8Z"
            fill="currentColor"
          />
        </svg>
      )}
    </>
  );
}
