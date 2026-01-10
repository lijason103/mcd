import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function RedemptionCard({ type, offeringName, items, points, value, valuePer1k }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isBest = type === "best";
  
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${isBest ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${isBest ? 'bg-green-100' : 'bg-red-100'}`}>
          {isBest ? (
            <TrendingUp className={`w-6 h-6 ${isBest ? 'text-green-600' : 'text-red-600'}`} />
          ) : (
            <TrendingDown className={`w-6 h-6 ${isBest ? 'text-green-600' : 'text-red-600'}`} />
          )}
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${isBest ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {isBest ? 'Best Value' : 'Worst Value'}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-black">{offeringName}</h3>
      
      {/* Expandable Items List */}
      {items.length > 0 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-3 transition-colors"
        >
          <span className="font-medium">
            {items.length} item{items.length > 1 ? 's' : ''} included
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}
      
      {isExpanded && items.length > 0 && (
        <ul className="mb-4 space-y-1 text-sm text-gray-700 bg-white/50 rounded-lg p-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-bold text-black">{points.toLocaleString()}</span>
        <span className="text-gray-600">points</span>
      </div>
      <p className="text-gray-600 mb-3">Menu Value: {value}</p>
      <div className={`inline-block px-3 py-1 rounded-lg text-gray-700 ${isBest ? 'bg-green-200' : 'bg-red-200'}`}>
        <span className="font-semibold">{valuePer1k}</span>
        <span className="text-sm"> per 1k pts</span>
      </div>
    </div>
  );
}