import { cn } from "~/@/lib/utils";

type TagProps = {
  text: string;
  icon: JSX.Element;
  borderless?: boolean;
};
export default function Tag({ text, icon, borderless }: TagProps) {
  return (
    <div
      className={cn(
        "flex h-min w-min items-center gap-1 border-secondaryBlack px-2 py-0.5",
        !borderless && "rounded-full border-[1px] border-solid",
      )}
    >
      {icon}
      <span className="text-xs">{text}</span>
    </div>
  );
}
