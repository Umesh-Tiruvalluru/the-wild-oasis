import { Card } from "@/components/ui/card";

interface StatProps {
  icon: React.ReactNode; // For rendering React elements/icons
  title: string;
  value: string | number; // Accepts both strings and numbers
  color: "blue" | "green" | "indigo" | "yellow"; // Restricts to specific color keys
}

function Stat({ icon, title, value, color }: StatProps) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    indigo: "bg-indigo-100 text-indigo-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <Card className="p-6 grid grid-cols-[64px_1fr] grid-rows-[auto_auto] gap-x-6 gap-y-1">
      <div
        className={`row-span-2 aspect-square rounded-full flex items-center justify-center ${colorMap[color]}`}
      >
        <div className="">{icon}</div>
      </div>
      <h5 className="self-end text-sm uppercase tracking-wide font-semibold text-gray-500">
        {title}
      </h5>
      <p className="text-2xl font-medium leading-none">{value}</p>
    </Card>
  );
}

export default Stat;
