import Image from "next/image";
import Button from "../ui/Button";
import { db } from "@/lib/db";

export default async function Home() {

  return (
    <div className="text-red-400">
      Test
      <Button>Test</Button>
    </div>
  );
}
