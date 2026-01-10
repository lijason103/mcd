import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How is value per point calculated?",
    answer: "We divide the menu price of each item by the points required to redeem it. Higher values mean you're getting more for your points."
  },
  {
    question: "Should I always redeem for the best value items?",
    answer: "Not necessarily! While maximizing value is smart, you should also consider what you actually want to eat. These recommendations help you make informed choices."
  },
  {
    question: "Do McDonald's Rewards points expire?",
    answer: "Yes, points expire after 6 months of inactivity. Make sure to earn or redeem points at least once every 6 months to keep your account active."
  },
  {
    question: "Can I combine points with other offers?",
    answer: "McDonald's Rewards cannot typically be combined with other promotional offers or discounts. Check the app for specific terms."
  },
  {
    question: "How often are menu prices updated?",
    answer: "Menu prices can vary by location and change periodically. Values shown are estimates based on average pricing."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
