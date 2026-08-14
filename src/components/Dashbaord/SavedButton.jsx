import { Bookmark } from "lucide-react";

const SavedButton = ({
  count,
  active,
  onClick,
  mobile = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={
        mobile
          ? `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "border border-orange-200 bg-orange-50 text-orange-600"
                : "text-[#6b6290] hover:bg-gray-100"
            }`
          : `flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-[#ddd7d0] bg-white text-[#6b6290] hover:border-[#26105f]"
            }`
      }
    >
      <div className="flex items-center gap-2">
        <Bookmark
          size={16}
          className={
            active
              ? "fill-orange-500 text-orange-500"
              : ""
          }
        />

        <span>
          {mobile ? "Saved Items" : "Saved"}
        </span>
      </div>

      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
        {count}
      </span>
    </button>
  );
};

export default SavedButton;