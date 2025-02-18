import React from "react";
import MedicineCard from "./MedicineCard";
import { MedicineCardProps } from "@/types/medicine";

interface MedicineCardListProps {
  medicines: MedicineCardProps[];
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
