import { useRouter } from "next/router";
import MedicineDetail from "../components/MedicineDetail";

const MedicineDetailPage = () => {
  const router = useRouter();
  const { medicineId } = router.query;

  if (!medicineId || typeof medicineId !== "string") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">잘못된 접근입니다.</div>
      </div>
    );
  }

  return <MedicineDetail medicineId={medicineId} />;
};

export default MedicineDetailPage;
