
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getReceivedRequests,
  getSentRequests,
  updateRequestStatus,
  cancelSwapRequest,
} from "../../api/swapRequestApi";
import { ArrowLeftRight, Check, X, Clock } from "lucide-react";

const SwapRequests = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const [receivedResponse, sentResponse] = await Promise.all([
        getReceivedRequests(),
        getSentRequests(),
      ]);

      setReceivedRequests(receivedResponse.data.requests || []);
      setSentRequests(sentResponse.data.requests || []);
    } catch (error) {
      console.error("Fetch requests error:", error);
      toast.error("Unable to load swap requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      toast.success(`Request ${status} successfully`);
      fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update request"
      );
    }
  };

  const handleCancelRequest = async (id) => {
    try {
      await cancelSwapRequest(id);
      toast.success("Request cancelled successfully");
      fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to cancel request"
      );
    }
  };

  const requests =
    activeTab === "received" ? receivedRequests : sentRequests;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[#6b6290]">
        Loading swap requests...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-[#7839ed]">
          <ArrowLeftRight size={22} />
          <span className="text-sm font-semibold">Skill Exchange</span>
        </div>

        <h1 className="text-3xl font-bold text-[#26105f]">
          Swap Requests
        </h1>

        <p className="mt-2 text-sm text-[#6b6290]">
          Manage the skill exchange requests you receive and send.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-3 border-b border-[#e5e1dc]">
        <button
          onClick={() => setActiveTab("received")}
          className={`border-b-2 px-4 py-3 text-sm font-semibold ${
            activeTab === "received"
              ? "border-[#7839ed] text-[#7839ed]"
              : "border-transparent text-[#6b6290]"
          }`}
        >
          Received ({receivedRequests.length})
        </button>

        <button
          onClick={() => setActiveTab("sent")}
          className={`border-b-2 px-4 py-3 text-sm font-semibold ${
            activeTab === "sent"
              ? "border-[#7839ed] text-[#7839ed]"
              : "border-transparent text-[#6b6290]"
          }`}
        >
          Sent ({sentRequests.length})
        </button>
      </div>

      {/* Request List */}
      {requests.length === 0 ? (
        <div className="rounded-2xl border border-[#e5e1dc] bg-white px-6 py-16 text-center">
          <ArrowLeftRight
            size={36}
            className="mx-auto mb-4 text-[#7839ed]"
          />

          <h2 className="text-lg font-bold text-[#26105f]">
            No {activeTab} requests yet
          </h2>

          <p className="mt-2 text-sm text-[#6b6290]">
            {activeTab === "received"
              ? "When someone sends you a swap request, it will appear here."
              : "The requests you send to other learners will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            const person =
              activeTab === "received"
                ? request.sender
                : request.receiver;

            return (
              <div
                key={request._id}
                className="rounded-2xl border border-[#e5e1dc] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h3 className="text-lg font-bold text-[#26105f]">
                      {person?.name || "SkillSwap Member"}
                    </h3>

                    <p className="mt-1 text-sm text-[#6b6290]">
                      {person?.email}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-lg bg-[#f0ebf8] px-3 py-2 text-[#7839ed]">
                        Offering: {request.skillOffered}
                      </span>

                      <span className="rounded-lg bg-[#f0ebf8] px-3 py-2 text-[#7839ed]">
                        Looking for: {request.skillWanted}
                      </span>
                    </div>

                    {request.message && (
                      <p className="mt-3 text-sm text-[#6b6290]">
                        "{request.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                      <Clock size={13} />
                      {request.status}
                    </span>

                    {activeTab === "received" &&
                      request.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(request._id, "accepted")
                            }
                            className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                          >
                            <Check size={15} />
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(request._id, "rejected")
                            }
                            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            <X size={15} />
                            Reject
                          </button>
                        </div>
                      )}

                    {activeTab === "sent" &&
                      request.status === "pending" && (
                        <button
                          onClick={() =>
                            handleCancelRequest(request._id)
                          }
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Cancel Request
                        </button>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SwapRequests;
