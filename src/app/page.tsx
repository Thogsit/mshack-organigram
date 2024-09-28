import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import G6 from "./g6";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center size-full sm:items-start">
      <div className='flex flex-row gap-8'>
        <Input placeholder='Suche ein Amt, Dezernat, ...'/>
        <Button asChild >
          <Link href="/">Suche</Link>
        </Button>
      </div>
      <G6 />
    </main>
  );
}
