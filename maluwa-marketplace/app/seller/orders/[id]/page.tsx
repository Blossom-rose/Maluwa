"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

type OrderStatus = "pending" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderDetail {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAvatar?: string;
  orderDate: string;
  deliveryAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceCharge: number;
  total: number;
  status: OrderStatus;
  notes?: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("pending");

  useEffect(() => {
    // Mock data - in production, fetch from API
    const mockOrders: { [key: string]: OrderDetail } = {
      "MB-4029": {
        id: "MB-4029",
        customerName: "Tiwonge Mtambalika",
        customerPhone: "+265 991 234 567",
        customerEmail: "tiwonge.m@email.com",
        orderDate: "Oct 24, 2024, 10:30 AM",
        deliveryAddress: "Area 47, Plot 123, Lilongwe",
        deliveryMethod: "Standard Delivery",
        paymentMethod: "Airtel Money",
        status: "pending",
        items: [
          {
            id: "1",
            name: "Luminous Lilies",
            quantity: 2,
            price: 25000,
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDbozD8g1vrExMrmjoMLdZdmzNfDgb98uronwqshlSTSnbeEebIzbhVe-4vK9fpplXKJQtnR3Yfb3nrxRfPRyKw3Os4y2ceA_aZDb77HFlF0Y21tNg62gKt6oqp9ixSfBsFJtHcR0hax1xDlVGOkcXhflJmnT-Bg0VBo_b3JRl5aQlmGGwQzwqxxFl3XKpqg3RMijHA8PVvvTTwdwkR9RQ9CZYw2udFchuhiPMp21cfn5IdGPuWOtmp5woQUXm1Aejes5bQuTFqg5k",
          },
        ],
        subtotal: 50000,
        deliveryFee: 4500,
        serviceCharge: 1200,
        total: 55700,
        notes: "Please deliver before 2 PM. It's a surprise gift.",
      },
      "MB-4030": {
        id: "MB-4030",
        customerName: "Chimwemwe Kaunda",
        customerPhone: "+265 888 765 432",
        customerEmail: "chimwemwe.k@email.com",
        orderDate: "Oct 23, 2024, 2:15 PM",
        deliveryAddress: "City Centre, Glyn Jones Road, Blantyre",
        deliveryMethod: "Express Delivery",
        paymentMethod: "TNM Mpamba",
        status: "preparing",
        items: [
          {
            id: "1",
            name: "Flame Tree Roses",
            quantity: 3,
            price: 12500,
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCYJYFbrC01s2MBz4Rqqhd1m8xQN-UNsMBf-f9luuz3pCUK88xZIBFu4m-j7Rn0LrMj76OtWPyWVOyLFf7hN99JT8zJ7ke0HwPYXiLlxb7MAHZ1DTV6-OuiewFclbvjANg6o6sJBeO7Ji0nmbPyJr6gVCGYNTc9Zc8-ENNyg8wkyfDd9mDnG4KeBuArdHlwyOlCxQgVi5rJQ5ApTkrWI_yeHJxPZ4a2dxd7zuyNjNiIARfFxZyNsjY_Id2OYI_BCs9DtfGLPOIdXo0",
          },
          {
            id: "2",
            name: "Zomba Protea",
            quantity: 1,
            price: 18200,
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCG_y6KUJpT4vHgHVUtYBb2p60s9oGVGLVFxKtCZ0BRuY54iyAUICUQMn59WidEct1K7p3Z2vPDaflNQIFNR6scDpkKX2Kbk9rl1uW9B1tGR1-C45oxgkbk3oQvFJwl5U_nazNIwHGb9SQvZ445_YRHoPPpohMVUHEuXBJdSdB-oTzKA02dI6pvSi42eldjrztoeAGPYshMLkq7rGgUeuldOMB2evMTnLzIxmRLtmXAeZn9D5-ucGvuWvCwXKtzoKOVUsVqXOd0m3Y",
          },
        ],
        subtotal: 55700,
        deliveryFee: 6000,
        serviceCharge: 1200,
        total: 62900,
      },
    };

    const orderData = mockOrders[orderId];
    if (orderData) {
      setOrder(orderData);
      setSelectedStatus(orderData.status);
    }
  }, [orderId]);

  const handleStatusUpdate = () => {
    if (order) {
      setOrder({ ...order, status: selectedStatus });
      setShowStatusModal(false);
    }
  };

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return { label: "Pending", color: "bg-tertiary-container text-on-tertiary-container", icon: "schedule" };
      case "preparing":
        return { label: "Preparing", color: "bg-primary-container text-on-primary-container", icon: "inventory" };
      case "ready":
        return { label: "Ready for Pickup", color: "bg-secondary-container text-on-secondary-container", icon: "check_circle" };
      case "out_for_delivery":
        return { label: "Out for Delivery", color: "bg-secondary-fixed text-on-secondary-fixed", icon: "local_shipping" };
      case "delivered":
        return { label: "Delivered", color: "bg-surface-variant text-on-surface-variant", icon: "task_alt" };
      case "cancelled":
        return { label: "Cancelled", color: "bg-error-container text-on-error-container", icon: "cancel" };
      default:
        return { label: "Unknown", color: "bg-surface-container text-on-surface-variant", icon: "help" };
    }
  };

  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">receipt_long</span>
          <p className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface">
            Order not found
          </p>
          <Link href="/seller/orders" className="text-primary hover:underline mt-4 inline-block">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-[20px] py-[32px]">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/seller/orders"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Orders
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-primary">
                Order #{order.id}
              </h1>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant mt-2">
                {order.orderDate}
              </p>
            </div>
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
              <span className="material-symbols-outlined">edit</span>
              Update Status
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
              <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-surface rounded-xl">
                    <div className="w-20 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-source-serif)] text-[18px] leading-[24px] font-semibold text-on-surface">
                        {item.name}
                      </h3>
                      <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-primary">
                        MK {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                        @ MK {item.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-6 pt-6 border-t border-outline-variant space-y-3">
                <div className="flex justify-between font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>MK {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  <span>Delivery Fee</span>
                  <span>MK {order.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                  <span>Service Charge</span>
                  <span>MK {order.serviceCharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-bold text-on-surface pt-3 border-t border-outline-variant">
                  <span>Total</span>
                  <span className="text-primary">MK {order.total.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* Customer Notes */}
            {order.notes && (
              <section className="bg-tertiary-fixed p-6 rounded-2xl border border-tertiary/20">
                <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-tertiary-fixed mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined">sticky_note_2</span>
                  Customer Notes
                </h3>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-tertiary-fixed-variant">
                  {order.notes}
                </p>
              </section>
            )}
          </div>

          {/* Right Column - Customer & Delivery Info */}
          <div className="space-y-6">
            {/* Status Card */}
            <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-4">
                Order Status
              </h3>
              <div className={`p-4 rounded-xl ${statusInfo.color} flex items-center gap-3`}>
                <span className="material-symbols-outlined text-3xl">{statusInfo.icon}</span>
                <div>
                  <p className="font-bold text-lg">{statusInfo.label}</p>
                  <p className="text-sm opacity-80">Current status</p>
                </div>
              </div>
            </section>

            {/* Customer Info */}
            <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Customer
              </h3>
              <div className="space-y-3">
                <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface font-bold">
                  {order.customerName}
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">phone</span>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px]">
                    {order.customerPhone}
                  </p>
                </div>
                {order.customerEmail && (
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">email</span>
                    <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px]">
                      {order.customerEmail}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Delivery Info */}
            <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Delivery
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-1">
                    Address
                  </p>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface">
                    {order.deliveryAddress}
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-1">
                    Method
                  </p>
                  <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface">
                    {order.deliveryMethod}
                  </p>
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/30">
              <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Payment
              </h3>
              <div>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-1">
                  Payment Method
                </p>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface">
                  {order.paymentMethod}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-outline-variant">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface">
                  Update Order Status
                </h2>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors"
                >
                  close
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface-variant">
                Select the new status for order #{order.id}
              </p>

              <div className="space-y-2">
                {(["pending", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"] as OrderStatus[]).map(
                  (status) => {
                    const info = getStatusInfo(status);
                    return (
                      <label key={status} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={selectedStatus === status}
                          onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                          className="hidden"
                        />
                        <div
                          className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                            selectedStatus === status
                              ? "border-primary bg-primary-container"
                              : "border-outline-variant hover:border-primary/50"
                          }`}
                        >
                          <span className="material-symbols-outlined text-on-surface-variant">{info.icon}</span>
                          <span className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] font-semibold text-on-surface">
                            {info.label}
                          </span>
                        </div>
                      </label>
                    );
                  }
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 border-2 border-outline-variant text-on-surface-variant py-3 rounded-xl font-bold hover:bg-surface-container transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
