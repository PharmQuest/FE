import React from "react";
import MedicineCard from "./MedicineCard";

interface Medicine {
  medicineTableId: number;
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
        <MedicineCard key={medicine.medicineTableId} {...medicine} />
      ))}
    </div>
  );
};

export default MedicineCardList;
