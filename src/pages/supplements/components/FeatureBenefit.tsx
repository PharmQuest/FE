import { CheckCircleIcon } from '@public/svgs';

interface FeatureBenefitProps {
    features?: string[];
    benefits?: string[];
}

export default function FeatureBenefit({ features = [], benefits = [] }: FeatureBenefitProps) {
    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mt-10">
          {/* 특징 */}
          <div>
            <h3 className="text-xl font-bold">특징</h3>
            <ul className="mt-4 space-y-2">
                {features.map((feature, idx) => (
                    <li key={idx} className="text-base text-gray-400 flex items-center gap-2">
                        <CheckCircleIcon aria-hidden="true" className="w-5 h-5 text-green-500" />
                        {feature}
                    </li>
                ))}
            </ul>
          </div>
    
          {/* 효능 */}
          <div>
            <h3 className="text-xl font-bold">다양한 효능</h3>
            <ul className="mt-4 space-y-2">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="text-base text-gray-400 flex items-center gap-2">
                    <CheckCircleIcon aria-hidden="true" className="w-5 h-5 text-green-500" />
                    {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
}
