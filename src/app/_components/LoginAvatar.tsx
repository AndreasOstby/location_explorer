import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export async function LoginAvatar() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className=" bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-lightGray h-full rounded-sm"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}
