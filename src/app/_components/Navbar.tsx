import { getServerAuthSession } from "~/server/auth";
import { LoginDropdown } from "./LoginDropdown";
import { Logo } from "./Logo";
import { Button } from "~/@/components/ui/button";

export async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="sticky top-0 flex h-[64px] w-full items-center justify-between bg-slate-100 px-5">
      <div className="flex h-full items-center gap-4">
        <Logo />
        <SplitNavItem />
      </div>

      {/* <Button variant="secondary">Sign in</Button> */}

      <LoginDropdown session={session} />
    </div>
  );
}

function SplitNavItem() {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <NavItem>Explore</NavItem>
      <div className="h-4/6 w-[2px] rounded bg-[#b8b8b8]"></div>
      <NavItem>Trending</NavItem>
    </div>
  );
}

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className=" h-4/6 rounded-sm px-4 hover:bg-lightGray">
      <span>{children}</span>
    </button>
  );
}
