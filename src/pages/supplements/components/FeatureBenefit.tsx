import CheckCircle from '@public/svgs/check-circle.svg';


interface FeatureBenefitProps {
    features: string[];
    benefits: string[];
}

export default function FeatureBenefit({ features, benefits }: FeatureBenefitProps) {
    return (
        <div className="flex gap-16 mt-10">
          {/* 특징 */}
          <div>
            <h3 className="text-xl font-bold">특징</h3>
            <ul className="mt-4 space-y-2">
                {features?.map((feature, idx) => (
                    <li key={idx} className="text-base text-gray-400">
                        <CheckCircle />
                        {feature}
                    </li>
                ))}
            </ul>
          </div>
    
          {/* 효능 */}
          <div>
            <h3 className="text-xl font-bold">다양한 효능</h3>
            <ul className="mt-4 space-y-2">
              {benefits?.map((benefit, idx) => (
                <li key={idx} className="text-base text-gray-400">
                    <CheckCircle />
                    {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
}