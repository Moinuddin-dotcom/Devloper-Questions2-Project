import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";


export function QuestionTableImagePart({ images }) {
    if (!images?.length) return null;

    return (
        <Carousel className="w-full max-w-md mx-auto my-4">
            <CarouselContent>
                {images?.map((imgUrl, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-2">
                                    <Image
                                        src={imgUrl}
                                        alt={`image-${index}`}
                                        width={400}
                                        height={300}
                                        className="rounded-lg object-contain"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={'bg-black hidden md:flex'} />
            <CarouselNext className={'bg-black hidden md:flex'} />
        </Carousel>
    );
}

