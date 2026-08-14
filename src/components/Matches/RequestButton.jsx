import { CheckCircle2 } from "lucide-react";

const RequestButton = ({
  isRequestSent,
  onClick,
}) => {
  return (
    <button
      disabled={isRequestSent}
      onClick={onClick}
      className={`w-full rounded-xl py-3 text-xs font-semibold transition-all ${
        isRequestSent
          ? "flex cursor-default items-center justify-center gap-1.5 border border-emerald-200 bg-emerald-50 text-emerald-600"
          : "bg-[#26105f] text-white shadow-sm hover:bg-[#32106f]"
      }`}
    >
      {isRequestSent ? (
        <>
          <CheckCircle2 size={14} />
          Request Sent
        </>
      ) : (
        "Send Exchange Request"
      )}
    </button>
  );
};

export default RequestButton;