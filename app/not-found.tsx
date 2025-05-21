import Link from "next/link";
import NotFound from "./components/ui/text/not_found";

export default function NotFoundPage() {
  return (
    <div>
      <NotFound message="Упс! Кажется, мы не нашли то, что вы искали." />
    </div>
  );
}
