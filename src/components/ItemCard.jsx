import { Star, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ItemCard({ type, offeringName, items, value, valuePer1k }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isBest = type === "best";
  
  return (
    <div className={`rounded-xl p-5 border-2 transition-all hover:shadow-lg ${isBest ? 'border-green-200 bg-white hover:border-green-300' : 'border-red-200 bg-white hover:border-red-300'}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isBest ? 'bg-green-50' : 'bg-red-50'}`}>
          {isBest ? (
            <Star className={`w-5 h-5 ${isBest ? 'text-green-600' : 'text-red-600'}`} />
          ) : (
            <AlertCircle className={`w-5 h-5 ${isBest ? 'text-green-600' : 'text-red-600'}`} />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{offeringName}</h4>
          
          {/* Expandable Items List */}
          {items.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-2 transition-colors"
            >
              <span>
                {items.length} item{items.length > 1 ? 's' : ''}
              </span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
          
          {isExpanded && items.length > 0 && (
            <ul className="mb-2 space-y-0.5 text-xs text-gray-600 bg-gray-50 rounded p-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          
          <p className="text-sm text-gray-600 mb-2">Value: {value}</p>
          <div className={`inline-block text-sm px-2 py-1 rounded ${isBest ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {valuePer1k}/1k pts
          </div>
        </div>
      </div>
    </div>
  );
}