import React from "react";
import styled from "styled-components";

export const StyledSvgElement = styled.div`
  // Default color: darker-blue-grey
  display: flex;
  &:not([disabled]) {
    cursor: pointer;
  }
  #hoverable-cream {
    path {
      fill: var(--color-negro);
    }
    &:hover:not([disabled]) {
      path {
        fill: var(--color-rojo);
      }
    }
  }

  #hoverable-red {
    path {
      fill: var(--color-negro);
    }
    &:hover:not([disabled]) {
      path {
        fill: var(--color-cream);
      }
    }
  }
  #hoverable-black {
    path {
      fill: var(--color-cream);
    }
    &:hover:not([disabled]) {
      path {
        fill: var(--color-negro);
      }
    }
  }

  #hoverable-dark {
    path {
      fill: var(--color-cream);
    }
    &:hover:not([disabled]) {
      path {
        fill: var(--color-rojo);
      }
    }
  }

  #cream {
    path {
      fill: var(--color-cream);
    }
  }

  #orange {
    path {
      fill: var(--color-naranja);
    }
  }

  #yellow {
    path {
      fill: var(--color-amarillo);
    }
  }
`;

const AmebaSvgWrapper = (props) => {
  const {
    children,
    width = "24",
    height = "24",
    stroke,
    type,
    disabled = false,
  } = props;
  return (
    <StyledSvgElement id={type} disabled={disabled}>
      <svg
        viewBox="0 0 24 24"
        width={width}
        height={height}
        stroke={stroke}
        fill="none"
        id={type}
        {...props}
      >
        {children}
      </svg>
    </StyledSvgElement>
  );
};

function Icon(props) {
  const { icon } = props;
  const receipt = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2V22L4.5 20.5L6 22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5ZM5 19.09V4.91H19V19.09H5ZM18 17V15H6V17H18ZM18 11V13H6V11H18ZM18 9V7H6V9H18Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const assist = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 9H14.69L15.64 4.43L15.67 4.11C15.67 3.7 15.5 3.32 15.23 3.05L14.17 2L7.59 8.59C7.22 8.95 7 9.45 7 10V20C7 21.1 7.9 22 9 22H18C18.83 22 19.54 21.5 19.84 20.78L22.86 13.73C22.95 13.5 23 13.26 23 13V11C23 9.9 22.1 9 21 9ZM21 13L18 20H9V10L13.34 5.66L12.23 11H21V13ZM5 10H1V22H5V10Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const free = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 9H14.69L15.64 4.43L15.67 4.11C15.67 3.7 15.5 3.32 15.23 3.05L14.17 2L7.59 8.59C7.22 8.95 7 9.45 7 10V20C7 21.1 7.9 22 9 22H18C18.83 22 19.54 21.5 19.84 20.78L22.86 13.73C22.95 13.5 23 13.26 23 13V11C23 9.9 22.1 9 21 9ZM21 13L18 20H9V10L13.34 5.66L12.23 11H21V13ZM5 10H1V22H5V10Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const cancelled = (
    <AmebaSvgWrapper {...props}>
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />{" "}
    </AmebaSvgWrapper>
  );

  const link = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM13 7H17C19.76 7 22 9.24 22 12C22 14.76 19.76 17 17 17H13V15.1H17C18.71 15.1 20.1 13.71 20.1 12C20.1 10.29 18.71 8.9 17 8.9H13V7Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const clear = (
    <AmebaSvgWrapper {...props}>
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const place = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9ZM9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C12.8932 6.5 13.7185 6.9765 14.1651 7.75C14.6116 8.5235 14.6116 9.4765 14.1651 10.25C13.7185 11.0235 12.8932 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const calendar = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM5 6V8H19V6H5ZM7 12H17V14H7V12ZM14 16H7V18H14V16Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const money = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.97 9.47C9.97 10.2 10.54 10.69 12.31 11.14C14.07 11.6 15.96 12.36 15.97 14.56C15.96 16.17 14.76 17.04 13.24 17.33V19H10.9V17.3C9.4 16.99 8.14 16.03 8.04 14.33H9.76C9.85 15.25 10.48 15.97 12.08 15.97C13.79 15.97 14.18 15.11 14.18 14.58C14.18 13.86 13.79 13.17 11.84 12.71C9.67 12.19 8.18 11.29 8.18 9.5C8.18 7.99 9.39 7.01 10.9 6.69V5H13.23V6.71C14.85 7.11 15.67 8.34 15.72 9.68H14.01C13.97 8.7 13.45 8.04 12.07 8.04C10.76 8.04 9.97 8.63 9.97 9.47Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const people = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM2 17.25C2 14.92 6.66 13.75 9 13.75C11.34 13.75 16 14.92 16 17.25V19H2V17.25ZM9 15.75C7.21 15.75 5.18 16.42 4.34 17H13.66C12.82 16.42 10.79 15.75 9 15.75ZM10.5 8.5C10.5 7.67 9.83 7 9 7C8.17 7 7.5 7.67 7.5 8.5C7.5 9.33 8.17 10 9 10C9.83 10 10.5 9.33 10.5 8.5ZM16.04 13.81C17.2 14.65 18 15.77 18 17.25V19H22V17.25C22 15.23 18.5 14.08 16.04 13.81ZM18.5 8.5C18.5 10.43 16.93 12 15 12C14.46 12 13.96 11.87 13.5 11.65C14.13 10.76 14.5 9.67 14.5 8.5C14.5 7.33 14.13 6.24 13.5 5.35C13.96 5.13 14.46 5 15 5C16.93 5 18.5 6.57 18.5 8.5Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const plus = (
    <AmebaSvgWrapper {...props}>
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="black" />
    </AmebaSvgWrapper>
  );

  const minus = (
    <AmebaSvgWrapper {...props}>
      <path d="M19 13H5V11H19V13Z" fill="black" />
    </AmebaSvgWrapper>
  );

  const shoppingCart = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2963 11.97C17.9563 12.59 17.2963 13 16.5463 13H9.09634L7.99634 15H19.9963V17H7.99634C6.47634 17 5.51634 15.37 6.24634 14.03L7.59634 11.59L3.99634 4H1.99634V2H5.26634L6.20634 4H21.0063C21.7663 4 22.2463 4.82 21.8763 5.48L18.2963 11.97ZM19.3063 6H7.15634L9.52634 11H16.5463L19.3063 6ZM7.99634 18C6.89634 18 6.00634 18.9 6.00634 20C6.00634 21.1 6.89634 22 7.99634 22C9.09634 22 9.99634 21.1 9.99634 20C9.99634 18.9 9.09634 18 7.99634 18ZM16.0063 20C16.0063 18.9 16.8963 18 17.9963 18C19.0963 18 19.9963 18.9 19.9963 20C19.9963 21.1 19.0963 22 17.9963 22C16.8963 22 16.0063 21.1 16.0063 20Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const trash = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM16 9V19H8V9H16ZM6 7H18V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V7Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const replay = (
    <AmebaSvgWrapper {...props}>
      <path
        d="M12 6V2L7 7L12 12V8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20C8.69 20 6 17.31 6 14H4C4 18.42 7.58 22 12 22C16.42 22 20 18.42 20 14C20 9.58 16.42 6 12 6Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const arrowDown = (
    <AmebaSvgWrapper {...props}>
      <path
        d="M7.41 8.29492L12 12.8749L16.59 8.29492L18 9.70492L12 15.7049L6 9.70492L7.41 8.29492Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const arrowUp = (
    <AmebaSvgWrapper {...props}>
      <path
        d="M7.41 15.7049L12 11.1249L16.59 15.7049L18 14.2949L12 8.29492L6 14.2949L7.41 15.7049Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const arrowRight = (
    <AmebaSvgWrapper {...props}>
      <path
        d="M6.16504 20.1301L7.93504 21.9001L17.835 12.0001L7.93504 2.1001L6.16504 3.8701L14.295 12.0001L6.16504 20.1301H6.16504Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const arrowLeft = (
    <AmebaSvgWrapper {...props}>
      <path
        d="M17.835 3.8701L16.055 2.1001L6.16504 12.0001L16.065 21.9001L17.835 20.1301L9.70504 12.0001L17.835 3.8701Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const youtube = (
    <AmebaSvgWrapper {...props}>
      <path d="M15.812.017H4.145C1.855.017 0 1.852 0 4.116v5.768c0 2.264 1.856 4.1 4.145 4.1h11.667c2.29 0 4.145-1.836 4.145-4.1V4.116c0-2.264-1.856-4.1-4.145-4.1zM13.009 7.28L7.552 9.855a.219.219 0 0 1-.314-.196V4.35c0-.161.173-.266.318-.193l5.458 2.735a.216.216 0 0 1-.005.389z" />
    </AmebaSvgWrapper>
  );

  const facebook = (
    <AmebaSvgWrapper {...props}>
      <g clipPath="url(#clip0_2469_9895)">
        <path
          d="M15.9993 8.0493C15.9993 3.6034 12.4178 0 7.99967 0C3.58148 0 0 3.6034 0 8.0493C0 12.0659 2.92545 15.3956 6.74961 15.9993V10.3756H4.71886V8.04863H6.74961V6.27577C6.74961 4.25808 7.94433 3.14392 9.77107 3.14392C10.6464 3.14392 11.5618 3.30088 11.5618 3.30088V5.28168H10.5538C9.5604 5.28168 9.25039 5.90215 9.25039 6.53872V8.0493H11.4691L11.1145 10.3762H9.25039V16C13.0745 15.3963 16 12.0666 16 8.0493H15.9993Z"
          fill="#1877F2"
        />
      </g>
      <defs>
        <clipPath id="clip0_2469_9895">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </AmebaSvgWrapper>
  );

  const twitter = (
    <AmebaSvgWrapper {...props}>
      <g clipPath="url(#clip0_2469_9935)">
        <path
          d="M9.46986 6.77491L15.2857 0H13.9075L8.85764 5.88256L4.82432 0H0.172363L6.27154 8.89547L0.172363 16H1.5506L6.8834 9.78782L11.1429 16H15.7948L9.46952 6.77491H9.46986ZM7.58217 8.97384L6.9642 8.08805L2.0472 1.03974H4.1641L8.13217 6.72795L8.75015 7.61374L13.9082 15.0075H11.7913L7.58217 8.97418V8.97384Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_2469_9935">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </AmebaSvgWrapper>
  );

  const instagram = (
    <AmebaSvgWrapper {...props}>
      <g clipPath="url(#clip0_2469_9897)">
        <path
          d="M11.2335 0H4.76649C2.13823 0 0 2.13823 0 4.76649V11.2335C0 13.8618 2.13823 16 4.76649 16H11.2335C13.8618 16 16 13.8618 16 11.2335V4.76649C16 2.13823 13.8617 0 11.2335 0ZM14.3904 11.2335C14.3904 12.977 12.977 14.3904 11.2335 14.3904H4.76649C3.023 14.3904 1.6096 12.977 1.6096 11.2335V4.76649C1.6096 3.02297 3.023 1.6096 4.76649 1.6096H11.2335C12.977 1.6096 14.3904 3.02297 14.3904 4.76649V11.2335Z"
          fill="url(#paint0_linear_2469_9897)"
        />
        <path
          d="M7.99999 3.86182C5.7182 3.86182 3.86182 5.7182 3.86182 7.99996C3.86182 10.2817 5.7182 12.1381 7.99999 12.1381C10.2818 12.1381 12.1382 10.2817 12.1382 7.99996C12.1382 5.71817 10.2818 3.86182 7.99999 3.86182ZM7.99999 10.5286C6.60348 10.5286 5.47142 9.39649 5.47142 7.99999C5.47142 6.60348 6.60351 5.47142 7.99999 5.47142C9.39649 5.47142 10.5286 6.60348 10.5286 7.99999C10.5286 9.39646 9.39646 10.5286 7.99999 10.5286Z"
          fill="url(#paint1_linear_2469_9897)"
        />
        <path
          d="M12.1461 4.88455C12.6938 4.88455 13.1377 4.4406 13.1377 3.89296C13.1377 3.34532 12.6938 2.90137 12.1461 2.90137C11.5985 2.90137 11.1545 3.34532 11.1545 3.89296C11.1545 4.4406 11.5985 4.88455 12.1461 4.88455Z"
          fill="url(#paint2_linear_2469_9897)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2469_9897"
          x1="8"
          y1="15.9534"
          x2="8"
          y2="0.124275"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E09B3D" />
          <stop offset="0.3" stopColor="#C74C4D" />
          <stop offset="0.6" stopColor="#C21975" />
          <stop offset="1" stopColor="#7024C4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2469_9897"
          x1="7.99999"
          y1="15.9534"
          x2="7.99999"
          y2="0.124261"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E09B3D" />
          <stop offset="0.3" stopColor="#C74C4D" />
          <stop offset="0.6" stopColor="#C21975" />
          <stop offset="1" stopColor="#7024C4" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2469_9897"
          x1="12.1461"
          y1="15.9535"
          x2="12.1461"
          y2="0.124334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E09B3D" />
          <stop offset="0.3" stopColor="#C74C4D" />
          <stop offset="0.6" stopColor="#C21975" />
          <stop offset="1" stopColor="#7024C4" />
        </linearGradient>
        <clipPath id="clip0_2469_9897">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </AmebaSvgWrapper>
  );

  const search = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9649 14.2549H15.7549L20.7449 19.2549L19.2549 20.7449L14.2549 15.7549V14.9649L13.9849 14.6849C12.8449 15.6649 11.3649 16.2549 9.75488 16.2549C6.16488 16.2549 3.25488 13.3449 3.25488 9.75488C3.25488 6.16488 6.16488 3.25488 9.75488 3.25488C13.3449 3.25488 16.2549 6.16488 16.2549 9.75488C16.2549 11.3649 15.6649 12.8449 14.6849 13.9849L14.9649 14.2549ZM5.25488 9.75488C5.25488 12.2449 7.26488 14.2549 9.75488 14.2549C12.2449 14.2549 14.2549 12.2449 14.2549 9.75488C14.2549 7.26488 12.2449 5.25488 9.75488 5.25488C7.26488 5.25488 5.25488 7.26488 5.25488 9.75488Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const ticket = (
    <AmebaSvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 10V6C22 4.9 21.1 4 20 4H4C2.9 4 2.01 4.9 2.01 6V10C3.11 10 4 10.9 4 12C4 13.1 3.11 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.9 14 20 13.1 20 12C20 10.9 20.9 10 22 10ZM20 8.54C18.81 9.23 18 10.53 18 12C18 13.47 18.81 14.77 20 15.46V18H4V15.46C5.19 14.77 6 13.47 6 12C6 10.52 5.2 9.23 4.01 8.54L4 6H20V8.54ZM12 14.12L9.07 16L9.95 12.63L7.26 10.43L10.73 10.22L12 7L13.26 10.23L16.73 10.44L14.04 12.64L14.93 16L12 14.12Z"
        fill="black"
      />
    </AmebaSvgWrapper>
  );

  const menu = (
    <AmebaSvgWrapper {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z"
          fill="black"
        />
      </svg>
    </AmebaSvgWrapper>
  );

  switch (icon) {
    case "receipt":
      return receipt;
    case "link":
      return link;
    case "clear":
      return clear;
    case "place":
      return place;
    case "calendar":
      return calendar;
    case "money":
      return money;
    case "people":
      return people;
    case "plus":
      return plus;
    case "minus":
      return minus;
    case "shoppingCart":
      return shoppingCart;
    case "trash":
      return trash;
    case "replay":
      return replay;
    case "arrowDown":
      return arrowDown;
    case "arrowUp":
      return arrowUp;
    case "arrowRight":
      return arrowRight;
    case "arrowLeft":
      return arrowLeft;
    case "search":
      return search;
    case "facebook":
      return facebook;
    case "youtube":
      return youtube;
    case "twitter":
      return twitter;
    case "instagram":
      return instagram;
    case "ticket":
      return ticket;
    case "menu":
      return menu;
    case "assist":
      return assist;
    case "free":
      return free;
    case "cancelled":
      return cancelled;
    default:
      return null;
  }
}

export default Icon;
