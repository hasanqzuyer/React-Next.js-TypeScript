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
          width={1000}
          height={1000}
          priority={true}
          onClick={handleClickThumbnail}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
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
          >
            {images.map((image: any, index: number) => (
              <SplideItem key={image + index}>
                <FImageContainer>
                  <Image
                    alt="house photo"
                    src={`${Project.apis.v1}/public/images/${image?.key}`}
                    width={1300}
                    priority={true}
                    height={900}
                    style={{
                      borderRadius: '8px'
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
          gap: '10px',
          height: '660px',
          direction: 'ttb',
          breakpoints: {
            1400: {
              height: '600px',
              perPage: 3,
            },
            800: {
              height: '400px',
              perPage: 2,
            },
            600: {
              direction: 'ltr',
              perPage: 1,
            },
            375: {
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
              width={220}
              height={220}
              priority={true}
            />
          </SplideItem>
        ))}
      </SplideMain>
    </SGallery>
  );
};

export default Gallery;
