import React, { useState, memo } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Users,
  Hotel,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Replace with your actual Formspree endpoint
const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT";

const getTodayDateString = () => new Date().toISOString().split("T")[0];

interface FormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  agreePolicy: boolean;
  whatsappAvailable: boolean;
}

interface ValidationState {
  name: boolean;
  email: boolean;
  phone: boolean;
  dates: boolean;
  guests: boolean;
}

// Memoized InputField component - this fixes the focus-losing issue
const InputField = memo(
  ({
    icon: Icon,
    name,
    type = "text",
    placeholder,
    value,
    error,
    onChange,
    formData, // needed for min date logic on checkOut
  }: {
    icon: React.ElementType;
    name: keyof FormData;
    type?: string;
    placeholder: string;
    value: any;
    error: boolean;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    formData?: FormData;
  }) => {
    const isPhone = name === "phone";

    const dateProps =
      type === "date"
        ? {
            min:
              name === "checkIn"
                ? getTodayDateString()
                : formData?.checkIn || "",
          }
        : {};

    return (
      <div className="relative mb-4">
        <Icon
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
            error ? "text-red-500" : "text-emerald-500"
          }`}
        />
        <input
          type={isPhone ? "tel" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          inputMode={isPhone ? "tel" : undefined}
          min={name === "guests" ? 1 : undefined}
          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            error
              ? "border-red-500 focus:ring-red-500/50"
              : "border-gray-300 focus:ring-emerald-500/50"
          }`}
          {...dateProps}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">
            {isPhone
              ? "Please enter the full international phone number (e.g., +91XXXXXXXXXX)."
              : `Invalid ${placeholder}.`}
          </p>
        )}
      </div>
    );
  }
);

const BookingRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "Single Room (Double Occupancy)",
    agreePolicy: false,
    whatsappAvailable: false,
  });

  const [validation, setValidation] = useState<ValidationState>({
    name: true,
    email: true,
    phone: true,
    dates: true,
    guests: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?\d{7,15}$/,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let newValue = value;

    if (name === "phone" && type !== "checkbox") {
      newValue = value.replace(/[^0-9+]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    setSubmitMessage(null);
  };

  const handleValidation = (): boolean => {
    const checkInDate = formData.checkIn ? new Date(formData.checkIn) : null;
    const checkOutDate = formData.checkOut ? new Date(formData.checkOut) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newValidation: ValidationState = {
      name: formData.name.trim().length > 2,
      email: REGEX.email.test(formData.email),
      phone: REGEX.phone.test(formData.phone),
      guests: formData.guests > 0 && formData.guests <= 4,
      dates:
        !!checkInDate &&
        !!checkOutDate &&
        checkOutDate > checkInDate &&
        checkInDate >= today,
    };

    setValidation(newValidation);
    return Object.values(newValidation).every((v) => v) && formData.agreePolicy;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) {
      setSubmitMessage({
        type: "error",
        text: "Please correct the errors in the form and agree to the policies.",
      });
      return;
    }

    if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT") {
      setSubmitMessage({
        type: "error",
        text: "Please update FORMSPREE_ENDPOINT with your actual URL to submit the form.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          Name: formData.name,
          _replyto: formData.email,
          "Phone Number (E.164)": formData.phone,
          "Check-In Date": formData.checkIn,
          "Check-Out Date": formData.checkOut,
          "Number of Guests": formData.guests,
          "Room Preference": formData.roomType,
          "Policy Agreed": formData.agreePolicy ? "Yes" : "No",
          "WhatsApp Available": formData.whatsappAvailable ? "Yes" : "No",
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Request successfully sent! We will confirm your booking details via email shortly.",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: "Form submission failed. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitMessage({
        type: "error",
        text: "A network error occurred. Please check your connection or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bookingPolicies = [
    "Flexible check-in and check-out with 24-hour staff assistance.",
    "A 30% advance payment is required to confirm your booking.",
    "The remaining balance is payable upon arrival.",
    "Smoking is permitted only in designated outdoor areas.",
    "Kindly handle the property with care; guests are responsible for damages.",
  ];

  return (
    <div id="booking" className="container mx-auto px-4 py-16 bg-white">
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Send Your Booking Request
        </h2>
        <p className="text-xl text-gray-600 mt-3">
          Fill out the details below, and we will confirm availability shortly.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 bg-gray-50 p-6 sm:p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Your Details
          </h3>

          <form onSubmit={handleSubmit}>
            <InputField
              icon={Users}
              name="name"
              placeholder="Full Name"
              value={formData.name}
              error={!validation.name}
              onChange={handleChange}
            />
            <InputField
              icon={Mail}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              error={!validation.email}
              onChange={handleChange}
            />
            <InputField
              icon={Phone}
              name="phone"
              placeholder="Full Phone (e.g., +91XXXXXXXXXX)"
              value={formData.phone}
              error={!validation.phone}
              onChange={handleChange}
            />

            <div className="flex items-center mb-4 mt-1">
              <input
                type="checkbox"
                id="whatsappAvailable"
                name="whatsappAvailable"
                checked={formData.whatsappAvailable}
                onChange={handleChange}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label
                htmlFor="whatsappAvailable"
                className="ml-2 flex items-center text-sm font-medium text-gray-700 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4 mr-1 text-green-500" /> WhatsApp
                Available
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                icon={Calendar}
                name="checkIn"
                type="date"
                placeholder="Check-in Date"
                value={formData.checkIn}
                error={!validation.dates && formData.checkIn.length > 0}
                onChange={handleChange}
                formData={formData}
              />
              <InputField
                icon={Calendar}
                name="checkOut"
                type="date"
                placeholder="Check-out Date"
                value={formData.checkOut}
                error={!validation.dates && formData.checkOut.length > 0}
                onChange={handleChange}
                formData={formData}
              />
            </div>
            {!validation.dates &&
              formData.checkIn.length > 0 &&
              formData.checkOut.length > 0 && (
                <p className="text-red-500 text-xs mb-4 -mt-3">
                  Check-out must be after Check-in, and dates must be in the
                  future.
                </p>
              )}

            {/* Guests & Room */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <InputField
                icon={Users}
                name="guests"
                type="number"
                placeholder="Number of Guests"
                value={formData.guests}
                error={!validation.guests}
                onChange={handleChange}
              />
              <div className="relative">
                <Hotel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Single Room (Single Occupancy)">
                    Single Room (1 person)
                  </option>
                  <option value="Double Room (Double Occupancy)">
                    Double Room (2 persons)
                  </option>
                  <option value="Family Room">
                    Family Room (up to 4 persons)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="agreePolicy"
                name="agreePolicy"
                checked={formData.agreePolicy}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label
                htmlFor="agreePolicy"
                className="ml-3 text-sm font-medium text-gray-700"
              >
                I have read and agree to the booking policies.
              </label>
            </div>

            {submitMessage && (
              <div
                className={`p-3 mb-4 rounded-lg text-sm flex items-center ${
                  submitMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitMessage.type === "success" ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertTriangle className="w-5 h-5 mr-2" />
                )}
                {submitMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !formData.agreePolicy}
              className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors duration-300 ${
                isSubmitting || !formData.agreePolicy
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {isSubmitting ? "Sending Request..." : "Send Booking Request"}
            </button>
          </form>
        </div>

        <div className="md:col-span-2 p-6 sm:p-8 rounded-xl border border-gray-200 bg-white shadow-md h-fit">
          <h3 className="text-2xl font-bold mb-4 text-emerald-700 border-b pb-2">
            Booking Policies & Rules
          </h3>
          <ul className="space-y-4 text-gray-700">
            {bookingPolicies.map((policy, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 mt-1 mr-2 shrink-0 text-emerald-500" />
                <p className="text-sm">{policy}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestForm;
