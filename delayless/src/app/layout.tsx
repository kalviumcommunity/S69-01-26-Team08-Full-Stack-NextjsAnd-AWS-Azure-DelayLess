// app/layout.tsx
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN - this enables all Tailwind classes in your app */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Optional: Add a tiny custom config for animations (like pulse-slow) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    animation: {
                      'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    },
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}