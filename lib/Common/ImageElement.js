import React from "react";
import PropTypes from "prop-types";
import Image from 'next/image';
import globals from "@/scss/globals.module.scss";

const ImageElement = ({
                          image,
                          className,
                          width,
                          height,
                          title,
                          lazy = true,
                          url = false,
                          nextImage = true,
                          layout = 'intrinsic',
                          objectFit = 'cover'
                      }) => {
    const url_path = typeof image === 'string' ? (url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}` : image) : image;

    return nextImage ?
        layout === "fill" ?
            <Image src={url_path}
                   className={`${className || ''} ${globals.imageContainer} ${globals[objectFit]}`}
                   priority={!lazy}
                   fill
                   sizes="100%"
                   quality={80}
                   alt={title}
                   title={title}/> :
            <Image src={url_path}
                   className={`${className || ''} ${globals.imageContainer} ${globals[objectFit]}`}
                   priority={!lazy}
                   width={width}
                   height={height}
                   quality={80}
                   alt={title}
                   title={title}/> :
        <img src={url_path}
             className={className}
             title={title}
             alt={title}/>
}

ImageElement.propTypes = {
    title: PropTypes.string,
    image: PropTypes.any.isRequired,
    width: PropTypes.any,
    height: PropTypes.any,
    layout: PropTypes.string,
    lazy: PropTypes.bool,
    nextImage: PropTypes.bool,
    props: PropTypes.any,
    objectFit: PropTypes.any
}

export default ImageElement
