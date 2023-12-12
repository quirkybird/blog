const Tags = ({ tags }) => {
  const selectColor = (tag) => {
    let color = "";
    switch (tag.toLowerCase()) {
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
      case "js":
        color = "#EBD94D";
        break;
      case "ts":
        color = "#3274C0";
        break;
      default:
        color = "#B095DA";
    }
    return color;
  };
  return (
      <span>{
        tags.map((tag, index) => (
          <span 
            key={index} 
            style={{background: selectColor(tag)}}
            className="inline-block text-white p-1 m-1.5 ml-0 rounded-md"
          >{tag}</span>
        ))
      }
      </span>
      );
};

export default Tags;
