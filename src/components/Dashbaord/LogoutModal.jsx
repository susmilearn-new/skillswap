const LogoutModal = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">

      <div className="w-full max-w-sm space-y-4 rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-xl">

        <h3 className="text-lg font-bold text-[#26105f]">
          Confirm Logout
        </h3>

        <p className="text-sm text-[#6b6290]">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">

          <button
            onClick={onCancel}
            className="rounded-full border border-[#ddd7d0] px-4 py-2 text-sm font-medium text-[#6b6290] transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default LogoutModal;