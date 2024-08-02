import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export function CarouselOrientation({ reviews }: any) {

  if (reviews.length===0){
    return(
      <div>No reviews Yet</div>
    )
  }
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      orientation="horizontal"
      className="w-full max-w-[75%] "
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {reviews.map((review: { id: Key | null | undefined; user: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; rating: number; review: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; date: string | number | Date; }) => (
          <CarouselItem key={review.id} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="font-bold">{review.user}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}{" "}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{review.review}</p>
                  <div className="text-gray-500 text-xs">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
