export const BackButtonIcon = ({
  handleBackButtonClicked,
}: {
  handleBackButtonClicked: () => void;
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      className="cursor-pointer"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
      onClick={handleBackButtonClicked}
    >
      <title>back</title>
      <path
        fill="currentColor"
        d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
      ></path>
    </svg>
  );
};
