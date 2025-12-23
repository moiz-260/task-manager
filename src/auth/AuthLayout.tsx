import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-zinc-400 text-sm">{subtitle}</p>}
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
