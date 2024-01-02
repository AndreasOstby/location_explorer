type TagProps = {
  text: string;
  icon: JSX.Element;
};
export default function Tag({ text, icon }: TagProps) {

  return (
    <div className="flex h-min items-center gap-1 border-secondaryBlack border-solid border-[1px] rounded-full px-2 py-0.5">
      {icon}
      <span className="text-xs">{text}</span>
    </div>
  );
}
