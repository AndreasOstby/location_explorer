export function Line({
  className,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) {
  return (
    <div className={"h-[2px] w-full bg-lightGray" + (className || "")}></div>
  );
}
