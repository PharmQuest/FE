export interface MedicineCardProps {
  medicineTableId: number;
  brandName: string;
  genericName: string;
  splSetId: string;
  imgUrl: string;
  category: string;
  country: string;
  scrapped: boolean;
  onBookmarkToggle?: (id: number) => void;
}
