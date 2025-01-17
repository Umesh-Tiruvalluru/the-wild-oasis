import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="flex items-center justify-center p-20 h-dvh bg-gray-100">
      <div className="text-center p-20  border border-gray-100 rounded-md">
        <h1 className="mb-12">
          The page you are looking for could not be found 😢
        </h1>
        <Button variant="outline" onClick={moveBack}>
          &larr; Go back
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
