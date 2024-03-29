export const TelegramSvg = ({
  strokeWidth = "1.5",
}: {
  strokeWidth?: string | number;
}) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.59376 13.1738L17.3731 20.8984C17.4745 20.9882 17.5976 21.0501 17.7302 21.078C17.8628 21.1059 18.0004 21.0988 18.1294 21.0574C18.2585 21.016 18.3745 20.9418 18.4662 20.842C18.5579 20.7422 18.622 20.6203 18.6524 20.4882L22.3242 4.45309C22.355 4.315 22.3477 4.17113 22.3031 4.03686C22.2585 3.90258 22.1783 3.78294 22.071 3.69069C21.9638 3.59845 21.8334 3.53707 21.694 3.51311C21.5546 3.48916 21.4112 3.50351 21.2793 3.55466L3.25196 10.6347C2.52931 10.9179 2.62696 11.9726 3.38868 12.1289L8.59376 13.1738Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.59375 13.1738L21.8848 3.57422"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9785 17.0313L9.93164 20.0781C9.82294 20.1885 9.68388 20.2641 9.53213 20.2952C9.38038 20.3264 9.2228 20.3117 9.0794 20.2531C8.936 20.1945 8.81327 20.0946 8.72679 19.966C8.64032 19.8375 8.59401 19.6862 8.59375 19.5313V13.1738"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
