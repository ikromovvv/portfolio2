import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import "./carusel.css"; // CSS alohida faylga yozilgan

const ImageCarousel = ({ item } : { item: any}) => {
    if (!item || !item.image || item.image.length === 0) return null;

    return (
        <Carousel
            arrows
            infinite={false}
            autoplay
            autoplaySpeed={5000}
            className="custom-carousel"
            prevArrow={<LeftOutlined className="custom-arrow left" />}
            nextArrow={<RightOutlined className="custom-arrow right" />}
        >
            {item.image.map((img : string, index : any) =>
                img ? (
                    <div key={index} className="carousel-slide">
                        <img src={img} alt={`slide-${index}`} className="carousel-image" />
                    </div>
                ) : null
            )}
        </Carousel>
    );
};

export default ImageCarousel;
