"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type OrderStatus = "pending" | "preparing" | "ready" | "delivered";

interface Order {
  id: string;
  customerName: string;
  customerInitials: string;
  customerAvatar?: string;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "delivery" | "delivered">("all");

  const [orders] = useState<Order[]>([
    {
      id: "#MB-4029",
      customerName: "Tiwonge Mtambalika",
      customerInitials: "TM",
      orderDate: "Oct 24, 2024",
      totalAmount: 45000,
      status: "pending",
    },
    {
      id: "#MB-4030",
      customerName: "Chimwemwe Kaunda",
      customerInitials: "CK",
      orderDate: "Oct 23, 2024",
      totalAmount: 62500,
      status: "preparing",
    },
    {
      id: "#MB-4031",
      customerName: "Linda Banda",
      customerInitials: "LB",
      customerAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDgYGUo0w3ugTawyeBRdPTLvItxdpZDR094P8bJGpuin-wofoltXFwIp40O2ccRvSRc2m3SzKOd3DKjjUKWKti2_9YSawkLX0ZcfEQfvJJnbtehy_2xU4YaoLdhZob6avrLc3HOgNVvCie6QY9c3zNdyDzfpUghbpSikIeP_qqgG_q2iw9ZTUsNafSt5XaQUK6Scg_nBvyIugkgQGWa2HDd03qhqMMDcQ5YBOlipbcuasn_-592JKvDzC21p7HKAwXUOMBie0mzm6Y",
      orderDate: "Oct 23, 2024",
      totalAmount: 28000,
      status: "ready",
    },
    {
      id: "#MB-4028",
      customerName: "Gomezgani Kalua",
      customerInitials: "GK",
      orderDate: "Oct 22, 2024",
      totalAmount: 115000,
      status: "delivered",
    },
    {
      id: "#MB-4027",
      customerName: "Grace Phiri",
      customerInitials: "GP",
      orderDate: "Oct 22, 2024",
      totalAmount: 33500,
      status: "pending",
    },
    {
      id: "#MB-4026",
      customerName: "Yamikani Mwale",
      customerInitials: "YM",
      orderDate: "Oct 21, 2024",
      totalAmount: 47000,
      status: "preparing",
    },
  ]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-tertiary-fixed",
          text: "text-on-tertiary-fixed-variant",
          dot: "bg-tertiary",
          label: "Pending",
        };
      case "preparing":
        return {
          bg: "bg-secondary-container",
          text: "text-on-secondary-container",
          dot: "bg-secondary",
          label: "Preparing",
        };
      case "ready":
        return {
          bg: "bg-surface-container-highest",
          text: "text-on-surface-variant",
          dot: "bg-on-surface-variant",
          label: "Ready for Delivery",
        };
      case "delivered":
        return {
          bg: "bg-surface-variant",
          text: "text-on-surface-variant",
          label: "Delivered",
          icon: true,
        };
      default:
        return {
          bg: "bg-surface-container",
          text: "text-on-surface-variant",
          dot: "bg-outline",
          label: "Unknown",
        };
    }
  };

  const getInitialsBgColor = (initials: string) => {
    const colors = [
      "bg-primary-fixed text-on-primary-fixed",
      "bg-secondary-fixed text-on-secondary-fixed",
      "bg-tertiary-fixed text-on-tertiary-fixed",
      "bg-outline-variant text-on-surface-variant",
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
      {/* Page Header */}
      <section className="px-[20px] pt-[32px] pb-[16px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[16px]">
          <div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-on-surface">
              Manage Orders
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
              Review and fulfill your recent flower bouquet requests.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-lowest border-none rounded-full py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary-container text-on-surface placeholder-on-surface-variant transition-shadow"
              placeholder="Find an order or customer..."
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-[32px] flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-full font-bold font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] whitespace-nowrap transition-all ${
              activeTab === "all"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-6 py-2 rounded-full font-bold font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] whitespace-nowrap transition-all ${
              activeTab === "pending"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Pending Fulfillment
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`px-6 py-2 rounded-full font-bold font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] whitespace-nowrap transition-all ${
              activeTab === "delivery"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            In Delivery
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`px-6 py-2 rounded-full font-bold font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] whitespace-nowrap transition-all ${
              activeTab === "delivered"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Delivered
          </button>
        </div>
      </section>

      {/* Orders Table */}
      <section className="px-[20px] pb-[32px]">
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider text-right">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {orders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-surface-container transition-colors group">
                      <td className="px-6 py-5 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface">
                        {order.id}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {order.customerAvatar ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden relative">
                              <Image
                                src={order.customerAvatar}
                                alt={order.customerName}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                          ) : (
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${getInitialsBgColor(
                                order.customerInitials
                              )}`}
                            >
                              {order.customerInitials}
                            </div>
                          )}
                          <span className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface font-semibold">
                            {order.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
                        {order.orderDate}
                      </td>
                      <td className="px-6 py-5 font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface text-right">
                        MK {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text}`}
                        >
                          {statusBadge.icon ? (
                            <span className="material-symbols-outlined text-xs mr-1">check_circle</span>
                          ) : (
                            <span className={`w-2 h-2 rounded-full ${statusBadge.dot} mr-2`}></span>
                          )}
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link href={`/seller/orders/${order.id.replace("#", "")}`}>
                          <button className="text-primary font-bold font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] hover:underline flex items-center justify-end gap-1 group-hover:scale-105 transition-transform">
                            View Details
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-[32px] grid grid-cols-1 md:grid-cols-3 gap-[16px]">
          <div className="bg-primary-fixed p-6 rounded-2xl flex flex-col gap-2">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-primary-fixed-variant uppercase tracking-widest">
              Active Orders
            </span>
            <span className="font-[family-name:var(--font-source-serif)] text-4xl font-bold text-on-primary-fixed">
              12
            </span>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-primary-fixed-variant opacity-80 mt-2">
              3 bouquets require immediate attention for morning delivery.
            </p>
          </div>

          <div className="bg-secondary-fixed p-6 rounded-2xl flex flex-col gap-2">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-secondary-fixed-variant uppercase tracking-widest">
              Revenue (Today)
            </span>
            <span className="font-[family-name:var(--font-source-serif)] text-4xl font-bold text-on-secondary-fixed">
              MK 182,500
            </span>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-secondary-fixed-variant opacity-80 mt-2">
              Up 14% compared to yesterday&apos;s sales.
            </p>
          </div>

          <div className="bg-tertiary-fixed p-6 rounded-2xl flex flex-col gap-2">
            <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-tertiary-fixed-variant uppercase tracking-widest">
              Completion Rate
            </span>
            <span className="font-[family-name:var(--font-source-serif)] text-4xl font-bold text-on-tertiary-fixed">
              98.4%
            </span>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-tertiary-fixed-variant opacity-80 mt-2">
              Calculated from the last 30 business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
