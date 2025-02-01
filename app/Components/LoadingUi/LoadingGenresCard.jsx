import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingProductCard() {
  return (
    <Card className="w-full max-w-sm mx-auto bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <Skeleton className="h-48 w-full rounded-lg bg-gray-700" />
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-3/4 bg-gray-700" />
          <Skeleton className="h-4 w-1/2 bg-gray-700" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <Skeleton className="h-6 w-20 bg-gray-700" />
        <Skeleton className="h-10 w-24 rounded-full bg-gray-700" />
      </CardFooter>
    </Card>
  )
}