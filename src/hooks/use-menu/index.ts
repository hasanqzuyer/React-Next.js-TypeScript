import { useEffect, useRef, useState } from 'react';

const useMenu = (initialState: boolean): any => {
  const menuRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);

  const [open, setOpen] = useState<boolean>(initialState);

  const [position, setPosition] = useState<{ right: number; bottom: number }>({
    right: 0,
    bottom: 0,
  });
  const openRef = useRef<boolean>(open);

  useEffect(() => {
    openRef.current = open;
    if (open && buttonRef.current && typeof window !== 'undefined') {
      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        right: window.innerWidth - rect.left,
        bottom: window.innerHeight - rect.bottom,
      });
    }

    const overflowHiddenElement = Array.from(
      document.getElementsByClassName(
        'overflow-y-hidden'
        // eslint-disable-next-line no-undef
      ) as HTMLCollectionOf<HTMLElement>
    );

    if (overflowHiddenElement.length > 0) {
      // if (open) {
      //   overflowHiddenElement[0].style.overflowY = 'hidden';
      //   overflowHiddenElement[0].style.paddingRight = '10px';
      // } else {
      //   overflowHiddenElement[0].style.overflowY = 'auto';
      //   overflowHiddenElement[0].style.paddingRight = '0px';
      // }

      const handleScrollEvent = (e) => {
        setOpen(false);
      };

      overflowHiddenElement[0].addEventListener('scroll', handleScrollEvent);

      return () =>
        overflowHiddenElement[0].removeEventListener(
          'scroll',
          handleScrollEvent
        );
    }
  }, [open]);

  useEffect(() => {
    const trackClick = (e: MouseEvent) => {
      if (!menuRef.current || !openRef.current) return;

      if (
        e.target !== menuRef.current &&
        !menuRef.current.contains(e.target) &&
        openRef.current
      ) {
        e.stopPropagation();
        setOpen(false);
      }
    };

    window.addEventListener('click', trackClick, true);

    return () => {
      window.removeEventListener('click', trackClick);
    };
  }, []);

  return [menuRef, open, setOpen, buttonRef, position];
};

export default useMenu;
