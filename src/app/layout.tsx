import "~/styles/globals.css";

import { Roboto } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { GoogleMapsWrapper } from "./_components/GoogleMapsWrapper";
import { Navbar } from "./_components/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400"
});

export const metadata = {
  title: "Locations",
  description: "Locate your next story",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${roboto.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <GoogleMapsWrapper>
            <Navbar />
            {children}
          </GoogleMapsWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
