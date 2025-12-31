import { Card } from "@/components";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-slate-900">Wishlist</h1>
        <p className="text-lg text-slate-600">Courses you&apos;ve saved for later</p>
      </div>

      <Card>
        <div>
          <div className="flex h-96 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <Heart className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <p className="text-slate-600">Your wishlist is empty</p>
              <p className="text-sm text-slate-500">Save courses to view them later</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
