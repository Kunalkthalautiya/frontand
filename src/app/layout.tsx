import "./styles/globals.css";
import Providers from "../context/Providers";

export const metadata = {
  title: "TaskFlow",
  description: "Team Task Management - Demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
