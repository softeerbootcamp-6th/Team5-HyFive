import { useNavigate } from "react-router";
import OriginalCarImg from "@/assets/images/OriginalCarImg.png";

const CenterPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/center/edit", {
      state: {
        carImage: OriginalCarImg, // 이미지 경로를 state에 전달
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
