import React from "react";
import MedicineCard from "./MedicineCard";

interface Medicine {
  brandName: string;
  genericName: string;
  splSetId: string;
  imgUrl: string;
  category: string;
  country: string;
}

interface MedicineCardListProps {
  medicines: Medicine[];
}

const MedicineCardList: React.FC<MedicineCardListProps> = ({
  medicines = [],
}) => {
  return (
    <div
      className={`
            md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] md:gap-4
            grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3`}
    >
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.splSetId}
          brandName={medicine.brandName}
          genericName={medicine.genericName}
          splSetId={medicine.splSetId}
          imgUrl={medicine.imgUrl}
          category={medicine.category}
          country={medicine.country}
        />
      ))}
    </div>
  );
};

export default MedicineCardList;
