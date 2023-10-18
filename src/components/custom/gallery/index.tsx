import React, { useState } from 'react';
import { TGalleryProps } from 'components/custom/gallery/types';
import {
  SGallery,
  SFullScreenGallery,
  SExit,
  SplideItem,
  SplideMain,
  ImageContainer,
  FImageContainer,
} from 'components/custom/gallery/styles';
import Image from 'next/image';

// import { Image } from 'components/custom';
import '@splidejs/react-splide/dist/css/splide.min.css';
import { CancelIcon } from 'components/svg';
import Project from 'constants/project';

const Gallery = ({ thumbnail, images, ...props }: TGalleryProps) => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleFullScreen = () => {
    setFullscreen(!fullscreen);
  };
  const [startIndex, setStartIndex] = useState(0);

  const handleStartIndex = (value: any) => {
    setStartIndex(value);
  };

  const handleClickThumbnail = () => {
    const thumbnailIndex = images.findIndex(
      (img) => img.key === thumbnail?.key
    );
    handleFullScreen();
    handleStartIndex(thumbnailIndex == -1 ? 0 : thumbnailIndex);
  };

  return (
    <SGallery fullscreen={fullscreen}>
      <ImageContainer>
        <Image
          alt="House thumbnail"
          src={`${Project.apis.v1}/public/images/${thumbnail?.key}`}
          layout='fill'
          object-fit="cover"
          priority={true}
          width={0}
          height={0}
          onClick={handleClickThumbnail}
          style={{
            borderRadius: '8px',
            width: '100%',
            cursor: "pointer"
          }}
        />
      </ImageContainer>
      {fullscreen && (
        <SFullScreenGallery>
          <SExit onClick={handleFullScreen}>
            <CancelIcon />
          </SExit>
          <SplideMain
            options={{
              type: 'loop',
              perPage: 1,
              drag: true,
              width: '100vw',
              height: '100vh',
              start: startIndex,
            }}
            aria-label="My Favorite Images"
            fullscreen={fullscreen}
          >
            {images.map((image: any, index: number) => (
              <SplideItem key={image + index}>
                <FImageContainer>
                  <Image
                    alt="house photo"
                    src={`${Project.apis.v1}/public/images/${image?.key}`}
                    width={0}
                    height={0}
                    priority={true}
                    object-fit="cover"
                    layout='fill'
                    style={{
                      borderRadius: '8px',
                      width: '100%',

                    }}
                  />
                </FImageContainer>
              </SplideItem>
            ))}
          </SplideMain>
        </SFullScreenGallery>
      )}
      <SplideMain
        options={{
          type: 'loop',
          perPage: 3,
          perMove: 1,
          drag: true,
          pagination: false,
          gap: '4%',
          height: '1200px',
          cover: true,
          // height: '10rem',
          lazyLoad: 'nearby',
          direction: 'ttb',
          breakpoints: {
            9999: {
              height: '800px',
              gap: '1rem',
            },
            1920: {
              height: '600px',
              gap: '1rem',
            },
            1650: {
              height: '500px',
              gap: '1rem',
              perPage: 3,
            },
            1400: {
              height: '450px',
              gap: '1rem',
              perPage: 3,
            },
            800: {
              height: '400px',
              gap: '1rem',
              perPage: 2,
            },
            649: {
              height: '430px',
              direction: 'ltr',
              gap: '1rem',
              perPage: 1,
            },
            419: {
              gap: 0,
              height: '220px'
            },
          },
        }}
        aria-label="My Favorite Images"
      >
        {images.map((image: any, index: any) => (
          <SplideItem
            key={image + index + index}
            onClick={() => {
              handleFullScreen();
              handleStartIndex(index);
            }}
          >
            <Image
              alt="house photo"
              src={`${Project.apis.v1}/public/images/${image?.key}`}
              layout='fill'
              object-fit="cover"
              width={0}
              height={0}
              priority={true}
              style={{
                borderRadius: '8px',
                width: '100%',
              }}
            />
          </SplideItem>
        ))}
      </SplideMain>
    </SGallery>
  );
};

export default Gallery;