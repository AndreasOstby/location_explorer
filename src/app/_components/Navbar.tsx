import { LoginAvatar } from "./LoginAvatar";
import { Logo } from "./Logo";

export function Navbar() {
    return (
        <div className="w-full h-[64px] flex bg-slate-100 items-center justify-between px-5 sticky top-0">
            <div className="flex gap-4 h-full items-center">
                <Logo />
                <SplitNavItem />
            </div>

            <LoginAvatar />
        </div>
    );
}

function SplitNavItem() {
    return (
        <div className="flex items-center justify-center gap-4 h-full">
            <NavItem>Explore</NavItem>
            <div className="w-[2px] h-4/6 bg-[#b8b8b8] rounded"></div>
            <NavItem>Trending</NavItem>
        </div>
    )
}

function NavItem({ children }: { children: React.ReactNode }) {
    return (
        <button type="button" className=" hover:bg-lightGray h-4/6 px-4 rounded-sm">
            <span>{children}</span>
        </button>
    )
}