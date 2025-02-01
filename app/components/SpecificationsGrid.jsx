"use client";
import Image from "next/image";

export default function SpecificationsGrid() {
  return (
    <div className="font-sans text-[#868787] mt-20">
      {/* Product Details Section */}
      <div className="mb-16 grid grid-cols-[200px_1fr] gap-6">
        <h2 className="text-lg">Product Details</h2>
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div>420 grams</div>
          <div>Synthetic blend</div>
          <div>High-density natural rubber</div>
          <div>Midnight Black, Arctic White, Graphite Grey</div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mb-12 grid grid-cols-[200px_1fr] gap-6">
        <h2 className="text-lg">Specifications</h2>
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div>
            Breathability Index:
            <span className="block">9/10</span>
          </div>
          <div>
            Flexibility for
            <span className="block">movement</span>
          </div>
          <div>
            Eco-Friendly
            <span className="block">Production</span>
          </div>
          <div>
            Tested for 1,000+
            <span className="block">kilometers of wear</span>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="relative aspect-square">
          <Image
            src="/textfill1.webp"
            alt="Product Detail 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-square">
          <Image
            src="/textfill2.webp"
            alt="Product Detail 2"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
