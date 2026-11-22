"use client";

import { useState } from "react";
import { User, Phone, Calendar, IndianRupee, MapPin, Car, Briefcase, FileText } from "lucide-react";

interface InsuranceFormProps {
  type: string;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const insuranceTypeLabels: Record<string, string> = {
  "health-insurance": "Health Insurance",
  "term-life": "Term Life Insurance",
  "car-insurance": "Car Insurance",
  "bike-insurance": "Bike Insurance",
  "loan-protector": "Loan Protector",
  "emi-protector": "EMI Protector",
};

export default function InsuranceForm({ type, onSubmit, onClose }: InsuranceFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Customer name is required";
    }

    if (!formData.mobileNumber?.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
    } else if (!/^[6-9]/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number";
    }

    const healthOrLife = type === "health-insurance" || type === "term-life";
    const vehicle = type === "car-insurance" || type === "bike-insurance";
    const protector = type === "loan-protector" || type === "emi-protector";

    if (healthOrLife || type === "emi-protector") {
      if (!formData.dob?.trim()) {
        newErrors.dob = "Date of birth is required";
      }
    }

    if (healthOrLife) {
      if (!formData.sumInsured?.trim()) {
        newErrors.sumInsured = "Sum insured is required";
      }
    }

    if (vehicle) {
      if (!formData.dob?.trim()) {
        newErrors.dob = "Date of birth is required";
      }
      if (!formData.pincode?.trim()) {
        newErrors.pincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Pincode must be 6 digits";
      }
      if (!formData.vehicleNumber?.trim()) {
        newErrors.vehicleNumber = "Vehicle number is required";
      }
      if (!formData.policyTerm?.trim()) {
        newErrors.policyTerm = "Policy term is required";
      }
    }

    if (protector) {
      if (type === "loan-protector" && !formData.age?.trim()) {
        newErrors.age = "Age is required";
      }
      if (!formData.loanType?.trim()) {
        newErrors.loanType = "Loan type is required";
      }
      if (!formData.loanAmount?.trim()) {
        newErrors.loanAmount = "Loan amount is required";
      }
      if (!formData.tenure?.trim()) {
        newErrors.tenure = "Tenure is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const renderFields = () => {
    const fields: React.ReactNode[] = [];

    fields.push(
      <div key="fullName" className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          Customer Name <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input
            type="text"
            value={formData.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
              errors.fullName ? "border-red-400" : "border-slate-200"
            }`}
            placeholder="Enter customer name"
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-xs font-medium">{errors.fullName}</p>}
      </div>
    );

    fields.push(
      <div key="mobileNumber" className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          Mobile No <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input
            type="tel"
            value={formData.mobileNumber || ""}
            onChange={(e) => handleChange("mobileNumber", e.target.value.replace(/\D/g, "").slice(0, 10))}
            maxLength={10}
            className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
              errors.mobileNumber ? "border-red-400" : "border-slate-200"
            }`}
            placeholder="Enter 10-digit mobile no"
          />
        </div>
        {errors.mobileNumber && <p className="text-red-500 text-xs font-medium">{errors.mobileNumber}</p>}
      </div>
    );

    const healthOrLife = type === "health-insurance" || type === "term-life";
    const vehicle = type === "car-insurance" || type === "bike-insurance";
    const protector = type === "loan-protector" || type === "emi-protector";

    if (healthOrLife) {
      fields.push(
        <div key="dob" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 ${
                errors.dob ? "border-red-400" : "border-slate-200"
              }`}
            />
          </div>
          {errors.dob && <p className="text-red-500 text-xs font-medium">{errors.dob}</p>}
        </div>
      );

      fields.push(
        <div key="sumInsured" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Sum Insured <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <select
              value={formData.sumInsured || ""}
              onChange={(e) => handleChange("sumInsured", e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 appearance-none ${
                errors.sumInsured ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="">Select sum insured</option>
              <option value="₹5L">₹5 Lakhs</option>
              <option value="₹10L">₹10 Lakhs</option>
              <option value="₹25L">₹25 Lakhs</option>
              <option value="₹50L">₹50 Lakhs</option>
              <option value="₹1Cr">₹1 Crore</option>
              <option value="₹2Cr">₹2 Crore</option>
            </select>
          </div>
          {errors.sumInsured && <p className="text-red-500 text-xs font-medium">{errors.sumInsured}</p>}
        </div>
      );
    }

    if (vehicle) {
      fields.push(
        <div key="dob-vehicle" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 ${
                errors.dob ? "border-red-400" : "border-slate-200"
              }`}
            />
          </div>
          {errors.dob && <p className="text-red-500 text-xs font-medium">{errors.dob}</p>}
        </div>
      );

      fields.push(
        <div key="pincode" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Pincode <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="text"
              value={formData.pincode || ""}
              onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                errors.pincode ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="Enter 6-digit pincode"
            />
          </div>
          {errors.pincode && <p className="text-red-500 text-xs font-medium">{errors.pincode}</p>}
        </div>
      );

      fields.push(
        <div key="vehicleNumber" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Vehicle Number <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="text"
              value={formData.vehicleNumber || ""}
              onChange={(e) => handleChange("vehicleNumber", e.target.value.toUpperCase())}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                errors.vehicleNumber ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="e.g. MH12AB1234"
            />
          </div>
          {errors.vehicleNumber && <p className="text-red-500 text-xs font-medium">{errors.vehicleNumber}</p>}
        </div>
      );

      fields.push(
        <div key="policyTerm" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Policy Term <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <select
              value={formData.policyTerm || ""}
              onChange={(e) => handleChange("policyTerm", e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 appearance-none ${
                errors.policyTerm ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="">Select policy term</option>
              <option value="1-year">1 Year</option>
              <option value="2-years">2 Years</option>
              <option value="3-years">3 Years</option>
            </select>
          </div>
          {errors.policyTerm && <p className="text-red-500 text-xs font-medium">{errors.policyTerm}</p>}
        </div>
      );
    }

    if (protector) {
      if (type === "loan-protector") {
        fields.push(
          <div key="age" className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Age <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="text"
                value={formData.age || ""}
                onChange={(e) => handleChange("age", e.target.value.replace(/\D/g, "").slice(0, 3))}
                maxLength={3}
                className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                  errors.age ? "border-red-400" : "border-slate-200"
                }`}
                placeholder="Enter your age"
              />
            </div>
            {errors.age && <p className="text-red-500 text-xs font-medium">{errors.age}</p>}
          </div>
        );
      } else {
        fields.push(
          <div key="dob" className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="date"
                value={formData.dob || ""}
                onChange={(e) => handleChange("dob", e.target.value)}
                className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 ${
                  errors.dob ? "border-red-400" : "border-slate-200"
                }`}
              />
            </div>
            {errors.dob && <p className="text-red-500 text-xs font-medium">{errors.dob}</p>}
          </div>
        );
      }

      fields.push(
        <div key="loanType" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Loan Type <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <select
              value={formData.loanType || ""}
              onChange={(e) => handleChange("loanType", e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 appearance-none ${
                errors.loanType ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="">Select loan type</option>
              <option value="personal-loan">Personal Loan</option>
              <option value="business-loan">Business Loan</option>
              <option value="home-loan">Home Loan</option>
              <option value="car-loan">Car Loan</option>
              <option value="education-loan">Education Loan</option>
            </select>
          </div>
          {errors.loanType && <p className="text-red-500 text-xs font-medium">{errors.loanType}</p>}
        </div>
      );

      fields.push(
        <div key="loanAmount" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Loan Amount (₹) <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="text"
              value={formData.loanAmount || ""}
              onChange={(e) => handleChange("loanAmount", e.target.value.replace(/\D/g, ""))}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                errors.loanAmount ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="Enter loan amount"
            />
          </div>
          {errors.loanAmount && <p className="text-red-500 text-xs font-medium">{errors.loanAmount}</p>}
        </div>
      );

      fields.push(
        <div key="tenure" className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Tenure (Years) <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <select
              value={formData.tenure || ""}
              onChange={(e) => handleChange("tenure", e.target.value)}
              className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 appearance-none ${
                errors.tenure ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="">Select tenure</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="5">5 Years</option>
              <option value="7">7 Years</option>
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
            </select>
          </div>
          {errors.tenure && <p className="text-red-500 text-xs font-medium">{errors.tenure}</p>}
        </div>
      );
    }

    return fields;
  };

  const title = insuranceTypeLabels[type] || "Insurance";

  return (
    <form onSubmit={handleSubmit} className="mx-2 md:mx-0">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)]">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50" />

        <div className="relative p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-blue-700 font-semibold">{title}</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">Share Your Details</h3>
            <p className="text-sm text-slate-500 mt-1">Fill in the details and our team will contact you shortly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {renderFields()}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <button
              type="button"
              onClick={onClose}
              className="sm:flex-1 px-6 py-3.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="sm:flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-600/25"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
