interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded p-6 border border-gray-100">{children}</div>
  );
}
