import { ItemCard } from "./ItemCard";

export function TierSection({ points, items }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold">
          {points.toLocaleString()} pts
        </div>
        <h3 className="text-2xl font-semibold">Tier Recommendations</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            type={item.type}
            offeringName={item.offeringName}
            items={item.items}
            value={item.value}
            valuePer1k={item.valuePer1k}
          />
        ))}
      </div>
    </div>
  );
}