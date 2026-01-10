import { RedemptionCard } from "./components/RedemptionCard";
import { TierSection } from "./components/TierSection";
import { FAQSection } from "./components/FAQSection";
import { Award, Info } from "lucide-react";
import { useState } from "react";
import bcData from "./data/BC.json";

// Transform JSON data to the format expected by components
function transformData(data) {
  const tierPoints = ["2000", "4000", "6000", "10000", "14000"];

  const tiers = tierPoints.map(points => ({
    points: parseInt(points),
    items: [
      {
        type: "best",
        offeringName: data[points].best.name,
        items: data[points].best.products.map(p => p.name),
        value: `$${data[points].best.products[0].price.toFixed(2)}`,
        valuePer1k: `$${data[points].best.avgPer1k.toFixed(2)}`
      },
      {
        type: "worst",
        offeringName: data[points].worst.name,
        items: data[points].worst.products.map(p => p.name),
        value: `$${data[points].worst.products[0].price.toFixed(2)}`,
        valuePer1k: `$${data[points].worst.avgPer1k.toFixed(2)}`
      }
    ]
  }));

  return {
    hero: {
      best: {
        offeringName: data.best.name,
        items: data.best.products.map(p => p.name),
        points: parseInt(data.best.points),
        value: `$${data.best.products[0].price.toFixed(2)}`,
        valuePer1k: `$${data.best.avgPer1k.toFixed(2)}`
      },
      worst: {
        offeringName: data.worst.name,
        items: data.worst.products.map(p => p.name),
        points: parseInt(data.worst.points),
        value: `$${data.worst.products[0].price.toFixed(2)}`,
        valuePer1k: `$${data.worst.avgPer1k.toFixed(2)}`
      }
    },
    tiers
  };
}

// Transform BC data and use for all regions (Ontario and Calgary will use same data for now)
const bcTransformed = transformData(bcData);

const pricingData = {
  BC: bcTransformed,
  Ontario: bcTransformed,
  Calgary: bcTransformed
};

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState("BC");

  const currentData = pricingData[selectedRegion];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Award className="w-10 h-10" />
            <h1 className="text-5xl font-bold">McDonald's Rewards Value Guide</h1>
          </div>
          <p className="text-xl text-center mb-12 text-white/90 max-w-2xl mx-auto">
            Maximize your points value with smart redemption choices
          </p>

          {/* Region Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <label htmlFor="region-select" className="text-sm font-medium text-white/90">
                Select Region:
              </label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-white text-gray-900 rounded-md px-4 py-2 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="BC">British Columbia</option>
                <option value="Ontario" disabled>Ontario (Coming Soon)</option>
                <option value="Calgary" disabled>Calgary, AB (Coming Soon)</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <RedemptionCard
              type="best"
              offeringName={currentData.hero.best.offeringName}
              items={currentData.hero.best.items}
              points={currentData.hero.best.points}
              value={currentData.hero.best.value}
              valuePer1k={currentData.hero.best.valuePer1k}
            />
            <RedemptionCard
              type="worst"
              offeringName={currentData.hero.worst.offeringName}
              items={currentData.hero.worst.items}
              points={currentData.hero.worst.points}
              value={currentData.hero.worst.value}
              valuePer1k={currentData.hero.worst.valuePer1k}
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-white/80">
            <Info className="w-5 h-5" />
            <p className="text-sm">Based on {selectedRegion} pricing • Values may vary by province and location</p>
          </div>
        </div>
      </section>

      {/* Tier Sections */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Redemption Tiers</h2>
            <p className="text-gray-600 text-lg">Compare best and worst value items at each point level</p>
          </div>

          {currentData.tiers.map((tier) => (
            <TierSection key={tier.points} points={tier.points} items={tier.items} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <Award className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h3 className="text-xl font-semibold mb-2">McDonald's Rewards Value Guide</h3>
            <p className="text-gray-400 text-sm">
              Independent tool for maximizing your McDonald's Rewards value
            </p>
          </div>
          
          <div className="border-t border-gray-800 pt-6 mt-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} McDonald's Rewards Value Guide. Not affiliated with McDonald's Corporation.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Pricing based on {selectedRegion}. Values may vary by province and location.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}