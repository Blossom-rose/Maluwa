"use client";

import { useState, useEffect } from "react";
import { authService } from "@/lib/services/authService";
import { paymentService, BankAccount, PaymentStats, Transaction, TransactionHistory } from "@/lib/services/paymentService";
import { notificationService } from "@/lib/services/notificationService";

export default function SellerPayments() {
  const [loading, setLoading] = useState(true);
  const [savingBank, setSavingBank] = useState(false);
  const [requestingPayout, setRequestingPayout] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  
  const [paymentStats, setPaymentStats] = useState<PaymentStats>({
    totalEarnings: 0,
    totalPaid: 0,
    pendingPayout: 0,
  });

  const [bankAccount, setBankAccount] = useState<BankAccount>({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    accountType: "airtel_money",
    momoPhone: "",
  });

  const [additionalPaymentMethods, setAdditionalPaymentMethods] = useState<BankAccount[]>([]);
  const [editingMethodIndex, setEditingMethodIndex] = useState<number | null>(null);
  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transactionFilter, setTransactionFilter] = useState<"all" | "pending" | "completed">("all");

  const sellerId = authService.getUser()?._id || authService.getUser()?.id;

  // Load payment info on mount
  useEffect(() => {
    const loadPaymentInfo = async () => {
      try {
        setLoading(true);
        const user = authService.getUser();
        if (!user?._id && !user?.id) {
          notificationService.error("You must be logged in as a seller");
          return;
        }

        const id = (user._id || user.id) as string;
        const info = await paymentService.getSellerPaymentInfo(id);
        
        setFullName(info.fullName);
        setPaymentStats(info.paymentStats);
        setBankAccount(info.bankAccount);
        setAdditionalPaymentMethods(info.additionalPaymentMethods || []);
      } catch (err: any) {
        console.error("Failed to load payment info:", err);
        notificationService.error("Failed to load payment information");
      } finally {
        setLoading(false);
      }
    };

    loadPaymentInfo();
  }, []);

  // Load transaction history
  useEffect(() => {
    if (!sellerId) return;

    const loadTransactions = async () => {
      try {
        setLoadingTransactions(true);
        const history = await paymentService.getTransactionHistory(sellerId, {
          page: currentPage,
          limit: 10,
          status: transactionFilter === "all" ? undefined : (transactionFilter as any),
        });
        setTransactionHistory(history.transactions);
        setTotalPages(history.pagination.pages);
      } catch (err: any) {
        console.error("Failed to load transactions:", err);
        notificationService.error("Failed to load transaction history");
      } finally {
        setLoadingTransactions(false);
      }
    };

    loadTransactions();
  }, [sellerId, currentPage, transactionFilter]);

  const handleBankAccountChange = (field: keyof BankAccount, value: string) => {
    setBankAccount(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddPaymentMethod = async () => {
    try {
      if (!sellerId) return;

      const newMethod: BankAccount = {
        accountHolder: fullName || "New Seller",
        bankName: "",
        accountNumber: "",
        accountType: "airtel_money",
        momoPhone: "",
      };

      // Validate minimum required fields before sending
      if (!newMethod.accountHolder.trim()) {
        notificationService.error("Account holder name is required");
        return;
      }

      // Save to backend immediately
      const savedMethods = await paymentService.addPaymentMethod(sellerId, newMethod);
      setAdditionalPaymentMethods(savedMethods);
      notificationService.success("Payment method added. Fill in the details and save.");
    } catch (err: any) {
      console.error("Error adding payment method:", err);
      // Show detailed error messages from backend
      if (err.response?.data?.errors) {
        const errorMsg = err.response.data.errors.map((e: any) => e.message).join(", ");
        notificationService.error(errorMsg);
      } else if (err.response?.data?.message) {
        notificationService.error(err.response.data.message);
      } else {
        notificationService.error("Failed to add payment method");
      }
    }
  };

  const handleUpdateAdditionalMethod = (index: number, field: keyof BankAccount, value: string) => {
    const updated = [...additionalPaymentMethods];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setAdditionalPaymentMethods(updated);
  };

  const handleRemovePaymentMethod = async (index: number) => {
    try {
      if (!sellerId) return;

      // Remove from backend
      await paymentService.deletePaymentMethod(sellerId, index);
      
      // Update local state
      setAdditionalPaymentMethods(additionalPaymentMethods.filter((_, i) => i !== index));
      setEditingMethodIndex(null); // Clear edit mode
      notificationService.success("Payment method removed successfully");
    } catch (err: any) {
      console.error("Error removing payment method:", err);
      notificationService.error("Failed to remove payment method");
      // Reload the methods on error
      if (sellerId) {
        const info = await paymentService.getSellerPaymentInfo(sellerId);
        setAdditionalPaymentMethods(info.additionalPaymentMethods || []);
      }
    }
  };

  const handleSavePaymentMethod = async (index: number) => {
    try {
      setSavingBank(true);
      if (!sellerId) return;

      const method = additionalPaymentMethods[index];

      // Backend will validate all required fields, so just send the data
      await paymentService.updatePaymentMethod(sellerId, index, method);
      setEditingMethodIndex(null); // Exit edit mode after successful save
      notificationService.success("Payment method saved successfully!");
    } catch (err: any) {
      console.error("Error saving payment method:", err);
      // Show detailed error messages from backend
      if (err.response?.data?.errors) {
        const errorMsg = err.response.data.errors.map((e: any) => e.message).join(", ");
        notificationService.error(errorMsg);
      } else {
        notificationService.error(err.response?.data?.message || "Failed to save payment method");
      }
    } finally {
      setSavingBank(false);
    }
  };

  const handleUpdateBankAccount = async () => {
    try {
      setSavingBank(true);

      // Backend will validate all required fields, so just send the data
      if (!sellerId) return;

      const updated = await paymentService.updateBankAccount(sellerId, bankAccount);
      setBankAccount(updated);
      setIsEditing(false);
      notificationService.success("Bank account details updated successfully!");
    } catch (err: any) {
      console.error("Error updating bank account:", err);
      // Show detailed error messages from backend
      if (err.response?.data?.errors) {
        const errorMsg = err.response.data.errors.map((e: any) => e.message).join(", ");
        notificationService.error(errorMsg);
      } else {
        notificationService.error(err.response?.data?.message || "Failed to update bank account");
      }
    } finally {
      setSavingBank(false);
    }
  };

  const handleRequestPayout = async () => {
    try {
      setRequestingPayout(true);

      if (!sellerId) return;

      const result = await paymentService.requestPayout(sellerId);
      notificationService.success(result.message);
      
      // Refresh payment info
      const info = await paymentService.getSellerPaymentInfo(sellerId);
      setPaymentStats(info.paymentStats);
    } catch (err: any) {
      console.error("Error requesting payout:", err);
      notificationService.error(err.response?.data?.message || "Failed to request payout");
    } finally {
      setRequestingPayout(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <p className="text-on-surface-variant">Loading payment information...</p>
      </div>
    );
  }

  const availableBalance = paymentStats.totalEarnings - paymentStats.pendingPayout;

  return (
    <div className="p-6 pb-20 md:pb-6">
      <h1 className="font-[family-name:var(--font-source-serif)] text-[32px] leading-[40px] font-semibold text-on-surface mb-8">
        Payments
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary-container to-primary rounded-lg shadow-md p-6 border border-primary text-on-primary-container">
          <span className="material-symbols-outlined text-[32px] mb-2 block">
            trending_up
          </span>
          <p className="text-sm opacity-90 mb-1">Total Earnings</p>
          <p className="text-[32px] font-bold">K{paymentStats.totalEarnings.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-secondary-container to-secondary rounded-lg shadow-md p-6 border border-secondary">
          <span className="material-symbols-outlined text-[32px] mb-2 block text-on-secondary-container">
            schedule
          </span>
          <p className="text-sm text-on-secondary-container opacity-90 mb-1">Pending Payout</p>
          <p className="text-[32px] font-bold text-on-secondary-container">K{paymentStats.pendingPayout.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-tertiary-container to-tertiary rounded-lg shadow-md p-6 border border-tertiary">
          <span className="material-symbols-outlined text-[32px] mb-2 block text-on-tertiary-container">
            account_balance
          </span>
          <p className="text-sm text-on-tertiary-container opacity-90 mb-1">Available Balance</p>
          <p className="text-[32px] font-bold text-on-tertiary-container">K{availableBalance.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-[20px] text-on-surface">Bank Account</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              isEditing
                ? "bg-error text-on-error hover:opacity-90"
                : "bg-primary-container text-on-primary-container hover:opacity-90"
            }`}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-on-surface-variant text-sm mb-1">Account Holder</label>
            <input
              type="text"
              value={isEditing ? bankAccount.accountHolder : bankAccount.accountHolder || fullName}
              onChange={(e) => handleBankAccountChange("accountHolder", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg ${
                isEditing
                  ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                  : "bg-surface-container text-on-surface cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-on-surface-variant text-sm mb-1">Account Type</label>
            <select
              value={bankAccount.accountType}
              onChange={(e) => handleBankAccountChange("accountType", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg ${
                isEditing
                  ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                  : "bg-surface-container text-on-surface cursor-not-allowed"
              }`}
            >
              <option value="airtel_money">Airtel Money</option>
              <option value="tnm_mpamba">TNM Mpamba</option>
              <option value="savings">Savings Account</option>
              <option value="checking">Checking Account</option>
            </select>
          </div>

          {/* Mobile Money Fields */}
          {(bankAccount.accountType === "airtel_money" || bankAccount.accountType === "tnm_mpamba") ? (
            <div>
              <label className="block text-on-surface-variant text-sm mb-1">
                {bankAccount.accountType === "airtel_money" ? "Airtel Money Phone" : "TNM Mpamba Phone"}
              </label>
              <input
                type="tel"
                value={bankAccount.momoPhone || ""}
                onChange={(e) => handleBankAccountChange("momoPhone", e.target.value)}
                disabled={!isEditing}
                placeholder={bankAccount.accountType === "airtel_money" ? "+265 1 2345 67890" : "+265 1 2345 67890"}
                className={`w-full px-4 py-2 rounded-lg ${
                  isEditing
                    ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                    : "bg-surface-container text-on-surface cursor-not-allowed"
                }`}
              />
              <p className="text-xs text-on-surface-variant mt-1">
                {bankAccount.accountType === "airtel_money" 
                  ? "Your registered Airtel Money phone number" 
                  : "Your registered TNM Mpamba phone number"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-on-surface-variant text-sm mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankAccount.bankName}
                    onChange={(e) => handleBankAccountChange("bankName", e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Standard Bank"
                    className={`w-full px-4 py-2 rounded-lg ${
                      isEditing
                        ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                        : "bg-surface-container text-on-surface cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-on-surface-variant text-sm mb-1">Account Number</label>
                  <input
                    type="text"
                    value={bankAccount.accountNumber}
                    onChange={(e) => handleBankAccountChange("accountNumber", e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., 1234567890"
                    className={`w-full px-4 py-2 rounded-lg ${
                      isEditing
                        ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                        : "bg-surface-container text-on-surface cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
            </>
          )}

          {isEditing && (
            <button
              onClick={handleUpdateBankAccount}
              disabled={savingBank}
              className="w-full bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {savingBank ? "Saving..." : "Save Bank Account"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-[20px] text-on-surface">Additional Payment Methods</h2>
          <button
            onClick={handleAddPaymentMethod}
            className="px-4 py-2 rounded-lg bg-secondary text-on-secondary font-bold hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Payment Method
          </button>
        </div>

        {additionalPaymentMethods.length === 0 ? (
          <p className="text-on-surface-variant text-center py-8">
            No additional payment methods added yet. Click "Add Payment Method" to add more ways to receive payments.
          </p>
        ) : (
          <div className="space-y-6">
            {additionalPaymentMethods.map((method, index) => (
              <div key={index} className="border border-outline-variant rounded-lg p-4 bg-surface-container">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-on-surface">Payment Method {index + 2}</h3>
                  <div className="flex gap-2">
                    {editingMethodIndex === index ? (
                      <button
                        onClick={() => setEditingMethodIndex(null)}
                        className="px-3 py-1 rounded-lg bg-error text-on-error text-sm font-bold hover:opacity-90 transition-all"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingMethodIndex(index)}
                        className="px-3 py-1 rounded-lg bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 transition-all"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleRemovePaymentMethod(index)}
                      className="px-3 py-1 rounded-lg bg-error text-on-error text-sm font-bold hover:opacity-90 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-on-surface-variant text-sm mb-1">Account Holder</label>
                    <input
                      type="text"
                      value={method.accountHolder}
                      onChange={(e) => handleUpdateAdditionalMethod(index, "accountHolder", e.target.value)}
                      disabled={editingMethodIndex !== index}
                      placeholder="e.g., John Doe"
                      className={`w-full px-4 py-2 rounded-lg ${
                        editingMethodIndex === index
                          ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-secondary"
                          : "bg-surface-container text-on-surface cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-on-surface-variant text-sm mb-1">Account Type</label>
                    <select
                      value={method.accountType}
                      onChange={(e) => handleUpdateAdditionalMethod(index, "accountType", e.target.value)}
                      disabled={editingMethodIndex !== index}
                      className={`w-full px-4 py-2 rounded-lg ${
                        editingMethodIndex === index
                          ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-secondary"
                          : "bg-surface-container text-on-surface cursor-not-allowed"
                      }`}
                    >
                      <option value="airtel_money">Airtel Money</option>
                      <option value="tnm_mpamba">TNM Mpamba</option>
                      <option value="savings">Savings Account</option>
                      <option value="checking">Checking Account</option>
                    </select>
                  </div>

                  {method.accountType === "airtel_money" || method.accountType === "tnm_mpamba" ? (
                    <div>
                      <label className="block text-on-surface-variant text-sm mb-1">
                        {method.accountType === "airtel_money" ? "Airtel Money Phone" : "TNM Mpamba Phone"}
                      </label>
                      <input
                        type="tel"
                        value={method.momoPhone || ""}
                        onChange={(e) => handleUpdateAdditionalMethod(index, "momoPhone", e.target.value)}
                        disabled={editingMethodIndex !== index}
                        placeholder="+265 1 2345 67890"
                        className={`w-full px-4 py-2 rounded-lg ${
                          editingMethodIndex === index
                            ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-secondary"
                            : "bg-surface-container text-on-surface cursor-not-allowed"
                        }`}
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-on-surface-variant text-sm mb-1">Bank Name</label>
                        <input
                          type="text"
                          value={method.bankName}
                          onChange={(e) => handleUpdateAdditionalMethod(index, "bankName", e.target.value)}
                          disabled={editingMethodIndex !== index}
                          placeholder="e.g., Standard Bank"
                          className={`w-full px-4 py-2 rounded-lg ${
                            editingMethodIndex === index
                              ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-secondary"
                              : "bg-surface-container text-on-surface cursor-not-allowed"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-on-surface-variant text-sm mb-1">Account Number</label>
                        <input
                          type="text"
                          value={method.accountNumber}
                          onChange={(e) => handleUpdateAdditionalMethod(index, "accountNumber", e.target.value)}
                          disabled={editingMethodIndex !== index}
                          placeholder="e.g., 1234567890"
                          className={`w-full px-4 py-2 rounded-lg ${
                            editingMethodIndex === index
                              ? "border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-secondary"
                              : "bg-surface-container text-on-surface cursor-not-allowed"
                          }`}
                        />
                      </div>
                    </>
                  )}

                  {editingMethodIndex === index && (
                    <button
                      onClick={() => handleSavePaymentMethod(index)}
                      disabled={savingBank}
                      className="w-full bg-secondary text-on-secondary px-4 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                      {savingBank ? "Saving..." : "Save Payment Method"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
        <h2 className="font-bold text-[20px] mb-4 text-on-surface">Request Payout</h2>
        {paymentStats.pendingPayout > 0 ? (
          <div className="space-y-4">
            <p className="text-on-surface-variant">
              You have <span className="font-bold text-primary">K{paymentStats.pendingPayout.toLocaleString()}</span> available for payout.
            </p>
            <p className="text-sm text-on-surface-variant">
              Payout will be sent to your primary payment method: <span className="font-semibold text-on-surface">{bankAccount.accountType === "airtel_money" || bankAccount.accountType === "tnm_mpamba" ? bankAccount.momoPhone : `${bankAccount.bankName} - ${bankAccount.accountNumber}`}</span>
            </p>
            <button
              onClick={handleRequestPayout}
              disabled={requestingPayout || !bankAccount.accountHolder}
              className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {requestingPayout ? "Processing..." : "Request Payout"}
            </button>
            {!bankAccount.accountHolder && (
              <p className="text-error text-sm">
                ⚠️ Please set up your bank account details first
              </p>
            )}
          </div>
        ) : (
          <p className="text-on-surface-variant">
            No pending payout available. Start selling to earn!
          </p>
        )}
      </div>

      <div className="mt-8 bg-surface rounded-lg shadow-md p-6 border border-outline-variant">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-[20px] text-on-surface">Payment History</h2>
          <div className="flex gap-2">
            <button
              onClick={() => { setTransactionFilter("all"); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                transactionFilter === "all"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              All
            </button>
            <button
              onClick={() => { setTransactionFilter("pending"); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                transactionFilter === "pending"
                  ? "bg-secondary text-on-secondary"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => { setTransactionFilter("completed"); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                transactionFilter === "completed"
                  ? "bg-success-container text-on-success-container"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {loadingTransactions ? (
          <div className="text-center py-8 text-on-surface-variant">
            <p>Loading transactions...</p>
          </div>
        ) : transactionHistory && transactionHistory.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="text-left py-3 px-4 font-bold text-on-surface-variant">Date</th>
                    <th className="text-left py-3 px-4 font-bold text-on-surface-variant">Type</th>
                    <th className="text-right py-3 px-4 font-bold text-on-surface-variant">Gross Amount</th>
                    <th className="text-right py-3 px-4 font-bold text-on-surface-variant">Commission</th>
                    <th className="text-right py-3 px-4 font-bold text-on-surface-variant">Net Earnings</th>
                    <th className="text-center py-3 px-4 font-bold text-on-surface-variant">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction) => (
                    <tr key={transaction._id || transaction.id} className="border-b border-outline-variant hover:bg-surface-container transition-colors">
                      <td className="py-3 px-4 text-on-surface">
                        {new Date(transaction.dateCreated).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-on-surface capitalize">
                        {transaction.type.replace(/_/g, " ")}
                      </td>
                      <td className="py-3 px-4 text-right text-on-surface font-semibold">
                        K{transaction.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-error">
                        -K{transaction.commission.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-on-surface font-bold">
                        K{transaction.netEarnings.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                            transaction.status === "completed"
                              ? "bg-success-container text-on-success-container"
                              : transaction.status === "pending"
                              ? "bg-secondary-container text-on-secondary-container"
                              : transaction.status === "cancelled"
                              ? "bg-error-container text-on-error"
                              : "bg-surface-container text-on-surface-variant"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface disabled:opacity-50 hover:bg-surface-container-high transition-all"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg font-bold transition-all ${
                        currentPage === page
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface disabled:opacity-50 hover:bg-surface-container-high transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-on-surface-variant text-center py-8">No transactions yet. Start selling to earn!</p>
        )}
      </div>
    </div>
  );
}
