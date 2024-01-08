"use client";

import { Button } from "~/@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";
import { LoginAvatar } from "./LoginAvatar";

type Props = {
  session: Session | null;
};

export function LoginDropdown({ session }: Props) {
  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8">
            <LoginAvatar
              name={session?.user?.name}
              image={session?.user?.image}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={"/api/auth/signout"}
                // className=" hover:bg-lightGray h-full rounded-sm bg-white/10 px-10 py-3 font-semibold no-underline transition"
              >
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="secondary">
          <Link href={"/api/auth/signin"}>Sign in</Link>
        </Button>
      )}
    </>
  );
}
