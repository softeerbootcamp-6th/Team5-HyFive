import { useNavigate } from "react-router";
import OriginalCarImg from "@/assets/images/OriginalCarImg.png";

const CenterPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    void navigate("/center/edit", {
      state: {
        carImage: OriginalCarImg,
        carModel: "람보르기니",
        carNumber: "12가1234",
        maxPassenger: "8",
        isLowFloor: true,
      },
    });
  };

  return (
    <>
      <button onClick={handleNavigate}>navigate to edit</button>
    </>
  );
};

export default CenterPage;
