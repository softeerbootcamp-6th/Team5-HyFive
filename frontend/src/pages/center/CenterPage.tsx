import { useNavigate } from "react-router";
import OriginalCarImg from "@/assets/images/OriginalCarImg.png";
import { useEffect, useState } from "react";

const CenterPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch(OriginalCarImg)
      .then((res) => res.blob())
      .then((blob) => {
        const originFile = new File([blob], "OriginalCarImg.png", {
          type: blob.type,
        });
        setFile(originFile);
      });
  }, []);

  const handleNavigate = () => {
    navigate("/center/edit", {
      state: {
        carImage: file,
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
