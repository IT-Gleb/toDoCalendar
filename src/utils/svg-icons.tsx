function Selected_SVG({
  pWidth,
  pHeight,
}: {
  pWidth: number;
  pHeight: number;
}): JSX.Element {
  return (
    <svg
      width={pWidth + "px"}
      height={pHeight + "px"}
      viewBox="0 0 1024 1024"
      fill="none"
      //class="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M439.2 680c9.6 8.8 25.6 8.8 35.2-0.8l300-309.6C784 360 784 344 773.6 334.4c-9.6-9.6-25.6-9.6-35.2 0.8L438.4 644.8l35.2-0.8-182.4-167.2c-10.4-9.6-25.6-8.8-35.2 1.6-9.6 10.4-8.8 25.6 1.6 35.2L439.2 680z"
        fill="currentColor"
      />
      <path
        d="M515.2 1007.2c-276 0-500-224-500-500S239.2 7.2 515.2 7.2s500 224 500 500-224 500-500 500z m0-952C265.6 55.2 63.2 257.6 63.2 507.2s202.4 452 452 452 452-202.4 452-452S764.8 55.2 515.2 55.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function Next_SVG({
  pWidth = 20,
  pHeight = 20,
}: {
  pWidth: number;
  pHeight: number;
}): JSX.Element {
  return (
    <svg
      fill="currentColor"
      width={`${pWidth}px`}
      height={`${pHeight}px`}
      viewBox="0 0 512 512"
      data-name="Layer 1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z" />
    </svg>
  );
}

function Previos_SVG({
  pWidth,
  pHeight,
}: {
  pWidth: number;
  pHeight: number;
}): JSX.Element {
  return (
    <svg
      fill="currentColor"
      width={`${pWidth}px`}
      height={`${pHeight}px`}
      viewBox="0 0 512 512"
      id="Layer_1"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M297.2,478l20.7-21.6L108.7,256L317.9,55.6L297.2,34L65.5,256L297.2,478z M194.1,256L425.8,34l20.7,21.6L237.3,256  l209.2,200.4L425.8,478L194.1,256z" />
    </svg>
  );
}

function Plus_SVG({
  pWidth,
  pHeight,
}: {
  pWidth: number;
  pHeight: number;
}): JSX.Element {
  return (
    <svg
      width={`${pWidth}px`}
      height={`${pHeight}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 11.25V5C12.75 4.80109 12.671 4.61032 12.5303 4.46967C12.3897 4.32902 12.1989 4.25 12 4.25C11.8011 4.25 11.6103 4.32902 11.4697 4.46967C11.329 4.61032 11.25 4.80109 11.25 5V11.25H5C4.80109 11.25 4.61032 11.329 4.46967 11.4697C4.32902 11.6103 4.25 11.8011 4.25 12C4.25 12.1989 4.32902 12.3897 4.46967 12.5303C4.61032 12.671 4.80109 12.75 5 12.75H11.25V19C11.2526 19.1981 11.3324 19.3874 11.4725 19.5275C11.6126 19.6676 11.8019 19.7474 12 19.75C12.1989 19.75 12.3897 19.671 12.5303 19.5303C12.671 19.3897 12.75 19.1989 12.75 19V12.75H19C19.1989 12.75 19.3897 12.671 19.5303 12.5303C19.671 12.3897 19.75 12.1989 19.75 12C19.7474 11.8019 19.6676 11.6126 19.5275 11.4725C19.3874 11.3324 19.1981 11.2526 19 11.25H12.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Minus_SVG({
  pWidth = 24,
  pHeight = 24,
}: {
  pWidth: number;
  pHeight: number;
}): JSX.Element {
  return (
    <svg
      width={`${pWidth}px`}
      height={`${pHeight}px`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />

      <g id="Complete">
        <g id="minus">
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="4"
            x2="20"
            y1="12"
            y2="12"
          />
        </g>
      </g>
    </svg>
  );
}

function DaySelect_SVG({
  pWidth = 24,
  pHeight = 24,
}: {
  pWidth: number;
  pHeight: number;
}): JSX.Element {
  return (
    <svg
      width={`${pWidth}px`}
      height={`${pHeight}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Interface / Check_All_Big">
        <path
          id="Vector"
          d="M7 12L11.9497 16.9497L22.5572 6.34326M2.0498 12.0503L6.99955 17M17.606 6.39355L12.3027 11.6969"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export {
  Selected_SVG,
  Next_SVG,
  Previos_SVG,
  Plus_SVG,
  Minus_SVG,
  DaySelect_SVG,
};
