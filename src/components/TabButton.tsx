export const TabButton = ({
  tabButtonLabel,
  isActive,
}: {
  tabButtonLabel: string;
  isActive: boolean;
}) => {
  return (
    <button
      className={`box-border flex items-center justify-center rounded-[42px] h-[32px] py-[6px] px-[12px] ${
        isActive ? "bg-[#e7fce3]" : "bg-topPanelBgColor"
      } `}
    >
      <p className={`${isActive ? "text-[#008069]" : "text-[#54656f]"} `}>
        {tabButtonLabel}
      </p>
    </button>
  );
};
