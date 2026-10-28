import "./FloatingCard.css";

const FloatingCard = ({ icon, text, top, left }) => {
  return (
    <div
      className="floating-card"
      style={{
        top,
        left
      }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default FloatingCard;