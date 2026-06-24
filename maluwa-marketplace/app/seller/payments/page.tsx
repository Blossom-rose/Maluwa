"use client";

import { useState } from "react";

type TransactionType = "earning" | "payout";
type TransactionStatus = "completed" | "processing" | "pending" | "failed";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  method: string;
  methodColor: string;
  status: TransactionStatus;
}

export default function PaymentsPage() {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("airtel");

  const [transactions] = useState<Transaction[]>([
    {
      id: "1284",
      date: "Oct 24, 2024",
      description: "Order #1284 - Flame Tree Bouquet",
      amount: 14500,
      type: "earning",
      method: "Airtel Money",
      methodColor: "#E11D2D",
      status: "completed",
    },
    {
      id: "1283",
      date: "Oct 23, 2024",
      description: "Order #1283 - Protea Arrangement",
      amount: 22000,
      type: "earning",
      method: "TNM Mpamba",
      methodColor: "#1e4a28",
      status: "completed",
    },
    {
      id: "PR-9921",
      date: "Oct 22, 2024",
      description: "Payout Request - PR-9921",
      amount: -52000,
      type: "payout",
      method: "Airtel Money",
      methodColor: "#E11D2D",
      status: "completed",
    },
    {
      id: "1281",
      date: "Oct 21, 2024",
      description: "Order #1281 - Zomba Morning Dew",
      amount: 18200,
      type: "earning",
      method: "TNM Mpamba",
      methodColor: "#1e4a28",
      status: "processing",
    },
    {
      id: "1280",
      date: "Oct 20, 2024",
      description: "Order #1280 - Luminous Lilies",
      amount: 25000,
      type: "earning",
      method: "Airtel Money",
      methodColor: "#E11D2D",
      status: "completed",
    },
    {
      id: "PR-9920",
      date: "Oct 15, 2024",
      description: "Payout Request - PR-9920",
      amount: -38500,
      type: "payout",
      method: "TNM Mpamba",
      methodColor: "#1e4a28",
      status: "completed",
    },
  ]);

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-secondary-container text-on-secondary-container";
      case "processing":
        return "bg-tertiary-container text-on-tertiary-container";
      case "pending":
        return "bg-surface-container-high text-on-surface-variant";
      case "failed":
        return "bg-error-container text-on-error-container";
      default:
        return "bg-surface-container text-on-surface-variant";
    }
  };

  const handlePayoutRequest = () => {
    console.log("Payout requested:", { amount: payoutAmount, method: payoutMethod });
    setShowPayoutModal(false);
    setPayoutAmount("");
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8 bg-gradient-to-br from-primary-fixed/30 to-surface">
      <div className="max-w-7xl mx-auto px-[20px] py-[32px]">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-[32px] gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-semibold text-primary">
              Payments &amp; Earnings
            </h2>
            <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface-variant">
              Track your floral sales and manage payouts to your mobile wallet.
            </p>
          </div>
          <button
            onClick={() => setShowPayoutModal(true)}
            className="bg-primary text-on-primary font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span>Request Payout</span>
          </button>
        </header>

        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[32px]">
          {/* Total Earnings */}
          <div className="bg-white/70 backdrop-blur-md p-[16px] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-primary">
            <div className="flex items-center justify-between mb-2">
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Total Earnings
              </span>
              <span className="material-symbols-outlined text-primary">trending_up</span>
            </div>
            <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-on-surface">
              MK 842,500
            </p>
            <div className="mt-2 flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              <span className="text-xs font-bold">12% from last month</span>
            </div>
          </div>

          {/* Pending Payout */}
          <div className="bg-white/70 backdrop-blur-md p-[16px] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-tertiary">
            <div className="flex items-center justify-between mb-2">
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Pending Payout
              </span>
              <span className="material-symbols-outlined text-tertiary">hourglass_empty</span>
            </div>
            <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-on-surface">
              MK 124,200
            </p>
            <p className="text-xs text-on-surface-variant mt-2 italic">Next automatic payout: Friday</p>
          </div>

          {/* Last Payout */}
          <div className="bg-white/70 backdrop-blur-md p-[16px] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-secondary">
            <div className="flex items-center justify-between mb-2">
              <span className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Last Payout
              </span>
              <span className="material-symbols-outlined text-secondary">check_circle</span>
            </div>
            <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold text-on-surface">
              MK 52,000
            </p>
            <p className="text-xs text-on-surface-variant mt-2 font-medium">Sent to Airtel Money (099...)</p>
          </div>
        </div>

        {/* Transaction History */}
        <section className="bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-white/30">
          <div className="p-[16px] border-b border-outline-variant flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold text-on-surface">
              Transaction History
            </h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Date
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Description
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Amount
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Method
                  </th>
                  <th className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-white/50 transition-colors">
                    <td className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] text-on-surface font-medium">
                      {transaction.description}
                    </td>
                    <td
                      className={`px-6 py-4 font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] font-bold ${
                        transaction.amount < 0 ? "text-on-surface-variant" : "text-primary"
                      }`}
                    >
                      {transaction.amount < 0 ? "-" : ""}MK {Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: transaction.methodColor }}
                        ></div>
                        <span className="text-xs font-semibold">{transaction.method}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${getStatusBadge(
                          transaction.status
                        )} px-3 py-1 rounded-full text-xs font-bold capitalize`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-surface-container-lowest flex justify-center">
            <button className="text-primary font-bold hover:underline transition-all">
              View All Transactions
            </button>
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-[32px] grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <div className="bg-primary-container text-on-primary-container p-6 rounded-2xl flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl">contact_support</span>
            <div>
              <h4 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Need payment help?
              </h4>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] opacity-90">
                WhatsApp our vendor support at +265 88 123 4567 for quick settlement help.
              </p>
            </div>
          </div>

          <div className="bg-secondary-container text-on-secondary-container p-6 rounded-2xl flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl">language</span>
            <div>
              <h4 className="font-[family-name:var(--font-source-serif)] text-[20px] leading-[28px] font-semibold">
                Thandizo mu Chichewa
              </h4>
              <p className="font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px] opacity-90">
                Mukufuna thandizo mu Chichewa? Dinani apa kuti mulankhule nafe.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Payout Request Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b border-outline-variant">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-source-serif)] text-[24px] leading-[32px] font-semibold text-on-surface">
                  Request Payout
                </h2>
                <button
                  onClick={() => setShowPayoutModal(false)}
                  className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors"
                >
                  close
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Available Balance */}
              <div className="bg-primary-fixed p-4 rounded-xl border border-primary/20">
                <p className="font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-primary-fixed-variant uppercase mb-1">
                  Available Balance
                </p>
                <p className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-bold text-on-primary-fixed">
                  MK 124,200
                </p>
              </div>

              {/* Payout Amount */}
              <div>
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  Payout Amount (MK) *
                </label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-[family-name:var(--font-be-vietnam)] text-[16px] leading-[24px]"
                />
                <p className="text-xs text-on-surface-variant mt-1">Minimum: MK 10,000</p>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block font-[family-name:var(--font-be-vietnam)] text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant mb-2">
                  Payout Method *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary">
                    <input
                      type="radio"
                      name="payout-method"
                      value="airtel"
                      checked={payoutMethod === "airtel"}
                      onChange={(e) => setPayoutMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="w-8 h-8 rounded-lg bg-[#E11D2D] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AM</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">Airtel Money</p>
                      <p className="text-xs text-on-surface-variant">099 XXX XXXX</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary">
                    <input
                      type="radio"
                      name="payout-method"
                      value="mpamba"
                      checked={payoutMethod === "mpamba"}
                      onChange={(e) => setPayoutMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="w-8 h-8 rounded-lg bg-[#1e4a28] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MP</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">TNM Mpamba</p>
                      <p className="text-xs text-on-surface-variant">088 XXX XXXX</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-secondary-container/30 border border-secondary/20 rounded-xl p-4 flex gap-3">
                <span className="material-symbols-outlined text-secondary">info</span>
                <p className="text-sm text-on-surface-variant">
                  Payout requests are processed within 1-3 business days. You&apos;ll receive an SMS confirmation once
                  completed.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPayoutModal(false)}
                  className="flex-1 border-2 border-outline-variant text-on-surface-variant py-3 rounded-xl font-bold hover:bg-surface-container transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayoutRequest}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">send</span>
                  Request Payout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
