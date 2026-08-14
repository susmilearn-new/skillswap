import { X } from "lucide-react";

const RequestModal = ({
  match,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">

        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <h3 className="mb-2 text-lg font-bold text-[#26105f]">
          Send Exchange Request
        </h3>

        <p className="mb-6 text-xs text-[#6b6290]">
          Send a skill swap request to{" "}
          <span className="font-semibold text-[#26105f]">
            {match.name}
          </span>
          ?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[#e5e1dc] py-2.5 text-xs font-semibold text-[#6b6290] hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-[#26105f] py-2.5 text-xs font-semibold text-white hover:bg-[#32106f]"
          >
            Confirm
          </button>

        </div>

      </div>
    </div>
  );
};

export default RequestModal;