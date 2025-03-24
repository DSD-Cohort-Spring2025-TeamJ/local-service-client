import React from "react";

export default function FeaturedImageGallery() {
  const data = [
    {
      imgelink: "./plumbing3.png",
    },
    {
      imgelink: "./plumbing4.png",
    },
    {
      imgelink: "./plumbing6.png",
    },
    {
      imgelink: "./plumbing7.png",
    },
    {
      imgelink: "./plumbing8.png",
    },
  ];

  const [active, setActive] = React.useState("./plumbing3.png");
  return (
    <div className="grid gap-4 justify-center items-center m-5 ">
      <div>
        <img
          className="h-[300px] w-[690px] rounded-lg object-cover object-center shadow-xl shadow-green-400/40"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-2 w-[700px] ">
        {data.map(({ imgelink }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer shadow-xl shadow-green-400/40"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
