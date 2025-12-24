import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "MadGamers - India's #1 Esports Platform",
    description: "Join daily tournaments, compete in Solo, Duo, and Squad matches with instant cash payouts. Download the MadGamers app now!",
    keywords: ["esports", "free fire", "gaming", "tournaments", "cash prizes", "mobile gaming"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
