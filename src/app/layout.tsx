import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.scss";

const manrope = Manrope({
    weight: ["400", "500", "700"],
    subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
    title: "ToDo",
    description: "Create your ToDo list",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={manrope.className}>{children}</body>
        </html>
    );
}
