type RecommendationItemProps = {
  text: string;
  icon: JSX.Element;
};
export default function RecommendationItem({ text, icon }: RecommendationItemProps) {

  return (
    <div className="flex h-min items-center gap-1 px-2 p-2">
      {icon}
      <span className="text-xs">{text}</span>
    </div>
  );
}
