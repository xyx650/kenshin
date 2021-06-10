import * as React from 'react';
import SlickCarousel, { Settings } from 'react-slick';
import classNames from 'classnames';
import './carousel.less';
import { prefixCls } from '../config';

export type CarouselEffect = 'scrollx' | 'fade';

// Carousel
export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass'> {
  /**
   * @description 动画效果
   */
  effect?: CarouselEffect;
  style?: React.CSSProperties;
  prefixCls?: string;
  slickGoTo?: number;
  dotPosition?: 'include' | 'outside' | 'vertical';
  children?: React.ReactNode;
  type?: 'default' | 'card';
  showIcon?: boolean;
  dotsType?: 'dot' | 'rectangle';
  dots?:
    | boolean
    | {
        className?: string;
      };
}

export interface CarouselRef {
  goTo: (slide: number, dontAnimate?: boolean) => void;
  next: () => void;
  prev: () => void;
  autoPlay: boolean;
  innerSlider: any;
}

const Carousel = React.forwardRef<CarouselRef, CarouselProps>(
  (
    {
      dots = true,
      arrows = false,
      draggable = false,
      dotPosition = 'include',
      dotsType = 'rectangle',
      ...props
    },
    ref,
  ) => {
    const { showIcon, type, ...newProps } = props;
    const slickRef = React.useRef<any>();

    const goTo = (slide: number, dontAnimate = false) => {
      slickRef.current.slickGoTo(slide, dontAnimate);
    };

    const getSetting = () => {
      if (type == 'card') {
        return {
          slidesToShow: 3,
          className: `${prefixCls}-card`,
          centerMode: true,
        };
      }
      if (dotPosition == 'vertical') {
        return {
          vertical: true,
          verticalSwiping: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        };
      }
    };

    React.useImperativeHandle(
      ref,
      () => ({
        goTo,
        autoPlay: slickRef.current.innerSlider.autoPlay,
        innerSlider: slickRef.current.innerSlider,
        prev: slickRef.current.slickPrev,
        next: slickRef.current.slickNext,
      }),
      [slickRef.current],
    );

    const prevCount = React.useRef(React.Children.count(props.children));

    React.useEffect(() => {
      if (prevCount.current !== React.Children.count(props.children)) {
        goTo(props.initialSlide || 0, false);
        prevCount.current = React.Children.count(props.children);
      }
    }, [props.children]);

    if (newProps.effect === 'fade') {
      newProps.fade = true;
    }

    const dotsClass = 'slick-dots';

    const enableDots = !!dots;
    const dsClass = classNames(
      dotsClass,
      `${dotsClass}-${dotsType}`,
      `${dotsClass}-${dotPosition}`,
      typeof dots === 'boolean' ? false : dots?.className,
    );

    const className = classNames(`${prefixCls}-slick`, `${prefixCls}-${dotPosition}`, {
      [`${prefixCls}-vertical`]: dotPosition == 'vertical',
    });

    const iconsProps = () => {
      let prevIcon = (
        <div className="slick-prev slick-icon" onClick={() => slickRef?.current?.slickPrev()}>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13332"
            width="14"
            height="14"
          >
            <path
              d="M410.39 512l340.14-335.13a63.74 63.74 0 0 0 0-91 65.92 65.92 0 0 0-92.29 0l-384.93 379.3a67.39 67.39 0 0 0 0 93.68l384.93 379.32a66 66 0 0 0 92.29 0 63.74 63.74 0 0 0 0-91z"
              p-id="13333"
              fill="#4389F9"
            ></path>
          </svg>
        </div>
      );
      let nextIcon = (
        <div className="slick-next slick-icon" onClick={() => slickRef?.current?.slickNext()}>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13067"
            width="14"
            height="14"
          >
            <path
              d="M613.61 512L273.47 176.87a63.74 63.74 0 0 1 0-91 65.92 65.92 0 0 1 92.29 0l384.93 379.3a67.39 67.39 0 0 1 0 93.68L365.76 938.17a66 66 0 0 1-92.29 0 63.74 63.74 0 0 1 0-91z"
              p-id="13068"
              fill="#4389F9"
            ></path>
          </svg>
        </div>
      );
      return {
        prevIcon,
        nextIcon,
      };
    };

    return (
      <div className={className}>
        {showIcon && iconsProps().prevIcon}
        <SlickCarousel
          ref={slickRef}
          {...getSetting()}
          {...newProps}
          dots={enableDots}
          dotsClass={dsClass}
          arrows={arrows}
          draggable={draggable}
        />
        {showIcon && iconsProps().nextIcon}
      </div>
    );
  },
);

Carousel.defaultProps = {
  showIcon: true,
  type: 'default',
};

export default Carousel;
