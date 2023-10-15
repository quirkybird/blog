const Tags = ({ tags }) => {
  const selectColor = (tag) => {
    let color = "";
    switch (tag) {
      case "tailwindcss":
        color = "#62BAF2";
        break;
      case "css":
        color = "#3a65f0";
        break;
      case "node":
        color = "#78a265";
        break;
      case "nodemon":
        color = "#8cce5e";
        break;
      case "react":
        color = "#387ca0";
        break;
      case "vue":
        color = "#62b082";
        break;
      case "axios":
        color = "#5f22d6";
        break;
      default:
        color = "#ea3323";
    }
    return color;
  };
  return (
      <span>{
        tags.map((tag, index) => (
          <span 
            key={index} 
            style={{background: selectColor(tag)}}
            className="inline-block text-white p-0.5 m-1.5 ml-0 rounded-md"
          >{tag}</span>
        ))
      }
      </span>
      );
};

export default Tags;
