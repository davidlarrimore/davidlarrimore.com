import { ReactNode } from 'react';

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50">
      {children}
    </div>
  );
}