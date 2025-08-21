interface TimeType {
  startTime: string;
  endTime: string;
}
const createInfoWindowHTML = ({
  name,
  status,
  time,
}: {
  name: string;
  status: string;
  time: TimeType;
}) => {
  const textTag = `<p style="font:400 18px/28px 'Pretendard', sans-serif;">${name}</p>`;
  const timeTag = `<p style="font:400 18px/28px 'Pretendard', sans-serif; color:#939393">: ${time.startTime} ~ ${time.endTime}</p>`;
  const statusTag = createStatusTagHTML(status, status);

  return `
    <div style="
      width:180px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items:center;
      gap: 6px;
      padding: 12px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 4px 8px rgba(0,0,0,0.25);
      font: 400 16px/22px 'Pretendard', sans-serif;
      transform: translateY(-90%);
    ">
      <div style="
        display:flex;
        flex-direction:row;
        align-items:center;
        gap:10px;
      ">
      ${statusTag}
      ${textTag}
      </div>
      <div>
      ${timeTag}
      </div>
      <div style="
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid white;
      "></div>
    </div>
  `;
};
export default createInfoWindowHTML;

const createStatusTagHTML = (type: string, label: string) => {
  let background = "";
  let color = "";

  switch (type) {
    case "START":
      background = "rgba(255, 119, 0, 0.10)";
      color = "#FF7700"; // theme.Maincolor.primary
      break;
    case "END":
      background = "rgba(51, 111, 250, 0.10)";
      color = "#336FFA"; // theme.Semantic.success
      break;
    case "CENTER":
      background = "rgba(24, 191, 129, 0.10)";
      color = "#18BF81"; // theme.Semantic.information
      break;
  }

  return `<div style="
    display: inline-flex;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: ${background};
    color: ${color};
  ">${label}</div>`;
};
