
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ListNav } from "./ListNavBtn"

export default function NavigationListButton() {
  return (
    <div className="p-4 flex justify-between items-center">
      <Carousel className="flex justify-between items-center w-full max-w-xl" slidesToShow={4}>
        {ListNav.map(({ name, link }) => (
            <CarouselContent className="-ml-1 w-full">

          <CarouselItem key={name} className="pl-1 md:basis-1/2 lg:basis-1/3 basis-1/4">
            <Link className={buttonVariants({ variant: "outline" })} href={link}>
              {name}
            </Link>
          </CarouselItem>
            </CarouselContent>
        ))}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
