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
    <SGallery {...props}>
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
                      objectFit: 'contain',
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
          gap: '16px',
          height: '750px',
          direction: 'ttb',
          breakpoints: {
            1536: {
              height: '400px',
              perPage: 2,
              gap: '2rem',
            },
            768: {
              direction: 'ltr',
              height: '200px',
              perPage: 1,
            },
            480: {
              direction: 'ltr',
              height: '200px',
              perPage: 1,
            },
            400: {
              height: '150px',
              arrows: false,
            }
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
              width={250}
              height={250}
              priority={true}
              style={{
                height: `${fullscreen ? '70%' : '200px'}`,
                width: `${fullscreen ? '70%' : '100%'}`,
                objectFit: 'cover',
              }}
            />
          </SplideItem>
        ))}
      </SplideMain>
    </SGallery>
  );
};

export default Gallery;
