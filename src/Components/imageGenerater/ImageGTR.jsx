import React, { useRef, useState } from "react";
import "./imageGTR.css";
import AIImage from "../Assets/default_image.svg";

const ImageGTR = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imageGenration = async () => {
    if (inputRef.current.value === "") {
      return null;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512*512",
        }),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      // Now you can use the data
      console.log(data);
      let data_array = data.data;
      setImage_url(data_array[0].url);
      setLoading(false);
    }
    // let data = await response.json();
  };
  return (
    <div className="AI-image-genereter">
      <div className="header">
        {" "}
        AI Image<span>Generater</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? AIImage : image_url} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading_bar-full" : "loading_bar"}></div>
          <div className={loading ? "loading_text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search_box">
        <input
          type="text"
          ref={inputRef}
          className="Search_input"
          placeholder="Describe What You Want To See"
        />
        <div
          className="generate_btn"
          onClick={() => {
            imageGenration();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGTR;
