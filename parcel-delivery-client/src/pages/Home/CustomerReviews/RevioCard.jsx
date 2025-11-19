
const RevioCard = ({ item }) => {
  return (
    
      <div
        className="card bg-[#FFFFFF] shadow-md hover:shadow-xl w-[300px] hover:bg-[#CAEB66] transition duration-300 p-6 rounded-xl flex flex-col "
        
      >
        {/* FIRST DIV → REVIEW TEXT → flex-grow */}
        <div className="flex-grow flex flex-col items-center text-center">
          <p className="mt-3 text-gray-600 text-sm border-dashed border-b pb-3">
            {item.review}
          </p>
        </div>

        {/* SECOND DIV → Image + Name */}
        <div className="flex items-center gap-5 mt-4 ">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src={item.img}
            alt=""
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p>{item.role}</p>
          </div>
        </div>
      </div>
  
  );
};

export default RevioCard;
