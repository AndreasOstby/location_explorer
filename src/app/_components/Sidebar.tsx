export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex h-[100vh] w-[300px] bg-slate-100">{children}</div>
  );
}
