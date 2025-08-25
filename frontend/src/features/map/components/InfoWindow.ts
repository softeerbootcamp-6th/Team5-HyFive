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
  const statusTag = createStatusTagHTML(status, "탑승자");

  return `
    <style>
      .info-window {
        width: 200px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 12px;
        border-radius: 12px;
        background: white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.25);
        font: 400 16px/22px 'Pretendard', sans-serif;
        transform: translateY(-90%);
        z-index: 5;
      }
      .info-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }
      .info-title {
        font: 400 18px/28px 'Pretendard', sans-serif;
      }
      .info-time {
        font: 400 18px/28px 'Pretendard', sans-serif;
        color: #939393;
      }
      .info-arrow {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid white;
      }
    </style>

    <div data-testid="map-infowindow" class="info-window">
      <div class="info-header">
        ${statusTag}
        <p class="info-title">${name}</p>
      </div>
      <div>
        <p class="info-time">: ${time.startTime} ~ ${time.endTime}</p>
      </div>
      <div class="info-arrow"></div>
    </div>
  `;
};

export default createInfoWindowHTML;

const createStatusTagHTML = (type: string, label: string) => {
  let background = "";
  let color = "";

  switch (type) {
    case "PASSENGER":
      background = "rgba(255, 119, 0, 0.10)";
      color = "#FF7700";
      break;
    case "SUCCESS":
      background = "rgba(51, 111, 250, 0.10)";
      color = "#336FFA";
      break;
    case "INFO":
      background = "rgba(24, 191, 129, 0.10)";
      color = "#18BF81";
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
