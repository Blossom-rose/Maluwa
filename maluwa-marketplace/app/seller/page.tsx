"use client";

import Image from "next/image";
import { useState } from "react";

export default function SellerDashboard() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Grace Phiri",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      product: "Luminous Lilies",
      amount: 25000,
      status: "pending",
      time: "2 hours ago",
    },
    {
      id: 2,
      customer: "Chisomo Banda",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chisomo",
      product: "Flame Radiance",
      amount: 32000,
      status: "processing",
      time: "4 hours ago",
    },
    {
      id: 3,
      customer: "Temwa Kachingwe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Temwa",
      product: "Golden Hour",
      amount: 18000,
      status: "completed",
      time: "5 hours ago",
    },
    {
      id: 4,
      customer: "Yamikani Mwale",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yamikani",
      product: "Zikomo Serenity",
      amount: 22000,
      status: "pending",
      time: "6 hours ago",
    },
  ]);

  const inventory = [
    {
      id: 1,
      name: "Luminous Lilies",
      price: 25000,
      stock: 45,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbozD8g1vrExMrmjoMLdZdmzNfDgb98uronwqshlSTSnbeEebIzbhVe-4vK9fpplXKJQtnR3Yfb3nrxRfPRyKw3Os4y2ceA_aZDb77HFlF0Y21tNg62gKt6oqp9ixSfBsFJtHcR0hax1xDlVGOkcXhflJmnT-Bg0VBo_b3JRl5aQlmGGwQzwqxxFl3XKpqg3RMijHA8PVvvTTwdwkR9RQ9CZYw2udFchuhiPMp21cfn5IdGPuWOtmp5woQUXm1Aejes5bQuTFqg5k",
      category: "Bouquets",
    },
    {
      id: 2,
      name: "Flame Radiance",
      price: 32000,
      stock: 28,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5tDJLwCrAbLVdUUvq9b4jUpH8o_qxVeluivagCSM8YREfvQkhiN6BjTRiKKN-SGIzs3L9D87AyMdTib2U3EwT2XV0dO4mes7PgabMSlhiLEozOCeo53dnwTSdHFRKhpFYpCkJBSxYUY8BeGPZtm9QQkDoB3ioHktT6FOsQycgkXShhldDYqIhHcq-ZjRN5IxKSkt5qhFrkqzDs4tyR_ODl1f1cfuJB5FxfCupAsgWEIBcvUGDGTmxL0lj2cRZfEiEEffx77Osn4g",
      category: "Arrangements",
    },
    {
      id: 3,
      name: "Golden Hour",
      price: 18000,
      stock: 62,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLYnZ12X09F_6bgkKhxu23NPUIl5hMVF7CvAhr4Pz1NHwhWE-pUpb6xvT32tbISWAvNmfUO-OWXZZCwbnVsa1GYzv0W5L0QLeCrmltRdE-bpuBRNN96G1MUQElMNDAmTy-Ussh1_y-40XIbZ-VuMEC-Yxbc23MB75ABTiUiOIvBd69RqNre6xjo0WE8v3mMbjbHIduEm02JrlrEPvXis_j39BM4Hy399gtQVf8EvbM2dgFkZbUOIGvgKKcjuVyF3cF6yDb8z_vs4I",
      category: "Single Stems",
    },
    {
      id: 4,
      name: "Zikomo Serenity",
      price: 22000,
      stock: 15,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJxa-PbYx1Eb00hAgbyQf-GZfXnk7uQL9snHO3IHz3TqxN8HIHugZMX6dkRbqnHtr1Bnpm3K1AYAb4eGo9h4KCE0B3pu9ndyT2C0CJLvqAy8gvp318KYvYUa6tGdpMQKCWaowGT_LPjD6jpEjhjF3Rm9NCJI_kiqfQbYFh4r_qJ6OE1PMcdvj80GWcFRaIv6bINThWBNumY1upyd_B8t5XpE9eaC3QEb88uWoZYgJ0KRSde6mf7iZK3-wA1yzGV73CPv5I4fKOzz0",
      category: "Bouquets",
    },
  ];

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-tertiary-container text-on-tertiary-container";
      case "processing":
        return "bg-primary-container text-on-primary-container";
      case "completed":
        return "bg-secondary-container text-on-secondary-container";
      default:
        return "bg-surface-container text-on-surface-variant";
    }
  };

  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-primary">
          Muli Bwanji, Vendor!
        </h1>
        <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant mt-2 italic">
          Welcome back to your flower business dashboard
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                Today&apos;s Orders
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-bold text-primary mt-2">
                14
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-[28px]">
                receipt_long
              </span>
            </div>
          </div>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-secondary mt-4 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +8% from yesterday
          </p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                Total Revenue
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] font-bold text-primary mt-2">
                MK 284,500
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container text-[28px]">
                payments
              </span>
            </div>
          </div>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mt-4">
            This week&apos;s earnings
          </p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                Pending Deliveries
              </p>
              <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-bold text-primary mt-2">
                6
              </p>
            </div>
            <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container text-[28px]">
                local_shipping
              </span>
            </div>
          </div>
          <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mt-4">
            Awaiting dispatch
          </p>
        </div>
      </div>

      {/* Active Orders Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface">
            Active Orders
          </h2>
          <button className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-primary hover:underline flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="bg-surface-container-low rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-high border-b border-outline-variant">
                <tr>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                    Product
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-outline-variant hover:bg-surface-container transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container relative flex-shrink-0">
                          <Image
                            src={order.avatar}
                            alt={order.customer}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface font-medium">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px] text-on-surface">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold text-primary">
                      MK {order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-bold uppercase border-0 cursor-pointer ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                      {order.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inventory Summary */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface">
            Inventory Summary
          </h2>
          <button className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-primary hover:underline flex items-center gap-1">
            Manage Inventory
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-all group"
            >
              <div className="aspect-square relative overflow-hidden bg-surface-container">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-[family-name:var(--font-source-serif)] text-[16px] leading-[24px] font-semibold text-on-surface mb-1">
                  {item.name}
                </h3>
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  {item.category}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-source-serif)] text-[18px] leading-[24px] font-semibold text-primary">
                    MK {item.price.toLocaleString()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      item.stock < 20
                        ? "bg-error-container text-on-error"
                        : "bg-secondary-container text-on-secondary-container"
                    }`}
                  >
                    {item.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
