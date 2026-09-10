"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { orderService, Order } from "@/lib/services/orderService";
import { notificationService } from "@/lib/services/notificationService";

export default function OrderDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [paymentProofVerified, setPaymentProofVerified] = useState(false);

  // --- Reject-order state ---
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }
        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch (err) {
        notificationService.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const handleStatusChange = async (newStatus: Order["status"]) => {
    if (!order) return;

    setUpdating(true);
    try {
      const updated = await orderService.updateOrderStatus(order._id || order.id || "", newStatus);
      setOrder(updated);
      notificationService.success(`Order marked as ${newStatus}`);
    } catch (err: any) {
      notificationService.error(err.response?.data?.message || "Failed to update order");
    } finally {
      setUpdating(false);
    }
  };

  const handleApproveOrder = async () => {
    if (!order) return;

    // Verify payment if mobile money or bank transfer
    if (["mobile_money", "bank_transfer"].includes(order.paymentMethod)) {
      if (!paymentProofVerified) {
        notificationService.warning("Please verify the payment proof first");
        return;
      }
    }

    await handleStatusChange("confirmed");
  };

  const handleProcessOrder = async () => {
    if (!order) return;
    await handleStatusChange("processing");
  };

  const handleMarkShipped = async () => {
    if (!order) return;
    await handleStatusChange("shipped");
  };

  const handleRejectOrder = async () => {
    if (!order) return;

    if (!rejectReason.trim()) {
      notificationService.warning("Please provide a reason for rejecting this order");
      return;
    }

    setRejecting(true);
    try {
      const updated = await orderService.rejectOrder(order._id || order.id || "", rejectReason.trim());
      setOrder(updated);
      setShowRejectForm(false);
      setRejectReason("");
      notificationService.success("Order rejected. The customer has been notified with the reason.");
    } catch (err: any) {
      notificationService.error(err.response?.data?.message || "Failed to reject order");
    } finally {
      setRejecting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-on-surface-variant">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-error">Order not found</p>
      </div>
    );
  }

  const nextStatuses: Record<Order["status"], Order["status"] | null> = {
    pending: "confirmed",
    confirmed: "processing",
    processing: "shipped",
    shipped: "delivered",
    delivered: null,
    cancelled: null,
  };

  return (
    <div className="p-6 pb-20 md:pb-6">
      <button
        onClick={() => router.back()}
        className="mb-6 text-primary font-bold hover:underline flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Orders
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Info */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
          <h2 className="font-bold text-[20px] mb-4 text-on-surface">
            Order #{order._id?.toString().slice(-6) || order.id?.slice(-6)}
          </h2>

          <div className="space-y-3">
            <div>
              <span className="text-on-surface-variant text-sm">Date</span>
              <p className="font-bold">{new Date(order.dateCreated || "").toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-on-surface-variant text-sm">Current Status</span>
              <p className="font-bold capitalize text-lg">{order.status}</p>
            </div>
            <div>
              <span className="text-on-surface-variant text-sm">Payment Status</span>
              <p className="font-bold capitalize">{order.paymentStatus}</p>
            </div>
            <div>
              <span className="text-on-surface-variant text-sm">Payment Method</span>
              <p className="font-bold capitalize">{order.paymentMethod?.replace("_", " ")}</p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
          <h2 className="font-bold text-[20px] mb-4 text-on-surface">Customer Info</h2>

          <div className="space-y-3">
            <div>
              <span className="text-on-surface-variant text-sm">Name</span>
              <p className="font-bold">{order.customerName}</p>
            </div>
            <div>
              <span className="text-on-surface-variant text-sm">Email</span>
              <p className="font-bold text-primary">{order.customerEmail}</p>
            </div>
            <div>
              <span className="text-on-surface-variant text-sm">Phone</span>
              <p className="font-bold">{order.customerPhone}</p>
            </div>
          </div>
        </div>

        {/* Payment Proof Section - For Mobile Money & Bank Transfer */}
        {["mobile_money", "bank_transfer"].includes(order.paymentMethod) && order.status === "pending" && (
          <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant md:col-span-2">
            <h2 className="font-bold text-[20px] mb-4 text-on-surface">Payment Proof Verification</h2>

            <div className="space-y-4">
              <div className="p-4 bg-tertiary-container rounded-lg">
                <p className="text-on-surface-variant text-sm font-semibold mb-3">
                  ⚠️ Customer notes: {order.notes || "No additional notes provided"}
                </p>
                <p className="text-on-surface-variant text-sm">
                  Method: {order.paymentMethod === "mobile_money" ? "Mobile Money (Airtel/TNM)" : "Bank Transfer"}
                </p>
              </div>

              {/* Payment Proof Viewer */}
              {order.paymentProof ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-on-surface">Uploaded Payment Proof:</h3>

                  {/* Display the proof file */}
                  {(() => {
                    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
                    const proofUrl = `${apiBase}${order.paymentProof}`;
                    const isPdf = order.paymentProof.toLowerCase().endsWith('.pdf');

                    return isPdf ? (
                      <div className="border border-outline-variant rounded-lg p-4">
                        <p className="text-on-surface-variant text-sm mb-3">PDF Document</p>
                        <a
                          href={proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">file_download</span>
                          View PDF
                        </a>
                      </div>
                    ) : (
                      <>
                        <div className="border border-outline-variant rounded-lg overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={proofUrl}
                            alt="Payment proof"
                            className="w-full max-h-80 object-contain bg-surface-container-high"
                          />
                        </div>
                        <a
                          href={proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm hover:underline flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                          View Full Size
                        </a>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="p-4 bg-warning-container rounded-lg">
                  <p className="text-on-warning-container font-semibold text-sm">
                    ℹ️ No payment proof uploaded by customer
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={paymentProofVerified}
                    onChange={(e) => setPaymentProofVerified(e.target.checked)}
                    className="w-5 h-5 rounded accent-primary"
                  />
                  <span className="text-on-surface font-semibold">
                    ✓ I have verified the payment proof is legitimate
                  </span>
                </label>
              </div>

              {paymentProofVerified && (
                <div className="p-3 bg-secondary-container rounded text-on-secondary-container text-sm font-semibold">
                  ✓ Payment verified - You can now approve this order
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delivery Info */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant md:col-span-2">
          <h2 className="font-bold text-[20px] mb-4 text-on-surface">Delivery Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-on-surface-variant text-sm">Address</span>
              <p className="font-bold">{order.deliveryAddress}</p>
            </div>
            <div>
              <span className="text-on-surface-variant text-sm">City</span>
              <p className="font-bold">{order.city}</p>
            </div>
            {order.zipCode && (
              <div>
                <span className="text-on-surface-variant text-sm">Zip Code</span>
                <p className="font-bold">{order.zipCode}</p>
              </div>
            )}
          </div>

          {order.notes && (
            <div className="mt-4">
              <span className="text-on-surface-variant text-sm">Delivery Notes</span>
              <p className="font-bold">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant md:col-span-2">
          <h2 className="font-bold text-[20px] mb-4 text-on-surface">Order Items</h2>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-surface-container-low rounded border border-outline-variant"
              >
                <div>
                  <p className="font-bold">{item.photoName}</p>
                  <p className="text-on-surface-variant text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">K{item.price.toLocaleString()}</p>
                  <p className="text-on-surface-variant text-sm">
                    K{(item.price * item.quantity).toLocaleString()} total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant md:col-span-2">
          <h2 className="font-bold text-[20px] mb-4 text-on-surface">Pricing</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="font-bold">K{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Tax (10%)</span>
              <span className="font-bold">K{order.tax.toLocaleString()}</span>
            </div>
            <div className="border-t border-outline-variant pt-3 flex justify-between">
              <span className="text-on-surface font-bold">Total</span>
              <span className="font-bold text-primary text-[20px]">K{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Status Actions */}
        <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant md:col-span-2">
          <h2 className="font-bold text-[20px] mb-4 text-on-surface">Order Actions</h2>

          <div className="space-y-3">
            {order.status === "pending" && (
              <>
                <button
                  onClick={handleApproveOrder}
                  disabled={updating || (["mobile_money", "bank_transfer"].includes(order.paymentMethod) && !paymentProofVerified)}
                  className="w-full px-4 py-3 bg-secondary text-on-secondary font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  ✓ Approve & Confirm Order
                </button>
                <p className="text-on-surface-variant text-sm">
                  Review the order details and payment proof above, then click to confirm you've received valid payment.
                </p>

                {!showRejectForm ? (
                  <button
                    onClick={() => setShowRejectForm(true)}
                    disabled={updating}
                    className="w-full px-4 py-3 bg-error-container text-on-error font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    ✕ Reject Order (Invalid Payment Proof)
                  </button>
                ) : (
                  <div className="p-4 border-2 border-error rounded-lg space-y-3">
                    <label className="block font-bold text-on-surface text-sm">
                      Why is this order being rejected?
                    </label>
                    <p className="text-on-surface-variant text-xs">
                      This reason will be sent to the customer, so be specific and professional.
                    </p>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="e.g., Payment proof does not match the order total, or the transaction reference could not be verified"
                      rows={3}
                      className="w-full px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-error"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleRejectOrder}
                        disabled={rejecting || !rejectReason.trim()}
                        className="flex-1 py-2 bg-error text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
                      >
                        {rejecting ? "Rejecting..." : "Confirm Rejection"}
                      </button>
                      <button
                        onClick={() => {
                          setShowRejectForm(false);
                          setRejectReason("");
                        }}
                        disabled={rejecting}
                        className="flex-1 py-2 bg-surface-container text-on-surface font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {order.status === "confirmed" && (
              <>
                <button
                  onClick={handleProcessOrder}
                  disabled={updating}
                  className="w-full px-4 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  ⚙️ Mark as Processing
                </button>
                <p className="text-on-surface-variant text-sm">
                  Click when you start preparing the order for delivery.
                </p>
              </>
            )}

            {order.status === "processing" && (
              <>
                <button
                  onClick={handleMarkShipped}
                  disabled={updating}
                  className="w-full px-4 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  🚚 Mark as Shipped
                </button>
                <p className="text-on-surface-variant text-sm">
                  Click when the order is dispatched to the customer's delivery address.
                </p>
              </>
            )}

            {order.status === "shipped" && (
              <div className="p-4 bg-secondary-container rounded-lg">
                <p className="text-on-secondary-container font-semibold">
                  ⏳ Waiting for customer to confirm delivery...
                </p>
                <p className="text-on-secondary-container text-sm mt-2">
                  The customer will confirm receipt on their end, then the order will be marked as delivered.
                </p>
              </div>
            )}

            {order.status === "delivered" && (
              <div className="p-4 bg-secondary-container rounded-lg">
                <p className="text-on-secondary-container font-semibold">
                  ✓ Order Delivered & Completed
                </p>
              </div>
            )}

            {order.status === "cancelled" && (
              <div className="p-4 bg-error-container rounded-lg space-y-2">
                <p className="text-on-error font-semibold">
                  Order Cancelled
                </p>
                {order.cancellationReason && (
                  <p className="text-on-error text-sm">
                    <span className="font-bold">Reason given to customer:</span> {order.cancellationReason}
                  </p>
                )}
                {order.cancelledBy && (
                  <p className="text-on-error text-xs capitalize">
                    Cancelled by: {order.cancelledBy}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}