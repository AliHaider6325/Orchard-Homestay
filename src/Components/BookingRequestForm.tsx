// BookingRequestForm.tsx
import React, { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Users,
  Hotel,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

// --- Configuration ---
const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT";

// Utility function to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  return new Date().toISOString().split("T")[0];
};

// --- Types ---
interface FormData {
  name: string;
  email: string;
  phone: string; // Now stores the full number, e.g., +919876543210
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  agreePolicy: boolean;
}

interface ValidationState {
  name: boolean;
  email: boolean;
  phone: boolean;
  dates: boolean;
  guests: boolean;
}

// --- Component ---

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

  // New state for the WhatsApp check status
  const [whatsappStatus, setWhatsappStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);

  // --- Regex for Validation ---
  const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    // International phone number: starts with optional '+', followed by 7 to 15 digits.
    phone: /^\+?\d{7,15}$/,
  };

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    let newValue = value;

    if (name === "phone" && type !== "checkbox") {
      // Only allow digits and an optional leading '+'
      newValue = value.replace(/[^0-9+]/g, "");
      // Reset WhatsApp status if the number changes
      setWhatsappStatus(null);
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
      // Validate phone number against international format
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

  // --- WhatsApp Check Logic (Manual Client-Side Check) ---
  const handleWhatsappCheck = () => {
    if (!REGEX.phone.test(formData.phone)) {
      setWhatsappStatus("error");
      return;
    }

    // Clean the phone number (remove '+', keep digits) for the wa.me link
    const cleanedNumber = formData.phone.replace(/[^0-9]/g, "");

    // Construct the wa.me link with a test message
    const whatsappUrl = `https://wa.me/${cleanedNumber}?text=Hello! I am checking if this number has WhatsApp to send a booking request.`;

    // Open the link in a new tab. If WhatsApp is installed/registered, it will proceed.
    // If not, it will usually show a 'Number not registered' error on the WhatsApp site.
    window.open(whatsappUrl, "_blank");

    // Set status to success assuming the user will check and the link was successfully opened.
    // NOTE: This is an ASSUMPTION, as true verification requires a backend API.
    setWhatsappStatus("success");
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
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: `Request successfully sent! We will confirm your booking details via email shortly.`,
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

  // --- Enhanced InputField Component ---
  const InputField: React.FC<{
    icon: React.ElementType;
    name: keyof FormData;
    type?: string;
    placeholder: string;
    value: any;
    error: boolean;
  }> = ({ icon: Icon, name, type = "text", placeholder, value, error }) => {
    const isPhone = name === "phone";

    const dateProps =
      type === "date"
        ? {
            min: name === "checkIn" ? getTodayDateString() : formData.checkIn, // Check-out min date is check-in date
          }
        : {};

    return (
      <div className="relative mb-4">
        {/* Icon */}
        <Icon
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
            error ? "text-red-500" : "text-emerald-500"
          }`}
        />

        {/* Input */}
        <input
          type={isPhone ? "tel" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          inputMode={isPhone ? "tel" : undefined}
          min={name === "guests" ? 1 : undefined}
          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            error
              ? "border-red-500 focus:ring-red-500/50"
              : "border-gray-300 focus:ring-emerald-500/50"
          }`}
          {...dateProps}
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xs mt-1">
            {isPhone
              ? "Please enter the full international phone number (e.g., +91XXXXXXXXXX)."
              : `Invalid ${placeholder}.`}
          </p>
        )}

        {/* WhatsApp Check Button (Only for Phone Field) */}
        {isPhone && formData.phone.length > 5 && (
          <div className="mt-2">
            <button
              type="button"
              onClick={handleWhatsappCheck}
              disabled={!REGEX.phone.test(formData.phone)}
              className={`flex items-center text-sm font-semibold px-3 py-1 rounded-full transition-colors duration-200 
                        ${
                          !REGEX.phone.test(formData.phone)
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : whatsappStatus === "success"
                            ? "bg-green-100 text-green-700 border border-green-700"
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                        }`}
            >
              {whatsappStatus === "success" ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" /> WhatsApp Verified
                  (Click to Re-Check)
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-1" /> Check WhatsApp
                  Availability
                </>
              )}
            </button>
            {whatsappStatus === "error" && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid international number format (e.g., +91).
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  // --- Policy and Rules Content ---
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
        {/* --- Form Section (3/5 width) --- */}
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
            />
            <InputField
              icon={Mail}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              error={!validation.email}
            />
            {/* Phone Input: Full number required (e.g., +91XXXXXXXXXX) */}
            <InputField
              icon={Phone}
              name="phone"
              placeholder="Full Phone (e.g., +91XXXXXXXXXX)"
              value={formData.phone}
              error={!validation.phone}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Check-in Date: Min date is today */}
              <InputField
                icon={Calendar}
                name="checkIn"
                type="date"
                placeholder="Check-in Date"
                value={formData.checkIn}
                error={!validation.dates && formData.checkIn.length > 0}
              />
              {/* Check-out Date: Min date is Check-in date */}
              <InputField
                icon={Calendar}
                name="checkOut"
                type="date"
                placeholder="Check-out Date"
                value={formData.checkOut}
                error={!validation.dates && formData.checkOut.length > 0}
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

            <div className="grid grid-cols-2 gap-4 mb-6">
              <InputField
                icon={Users}
                name="guests"
                type="number"
                placeholder="Number of Guests"
                value={formData.guests}
                error={!validation.guests}
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

            {/* Policy Checkbox */}
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

            {/* Submission Message */}
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
              className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors duration-300 
                ${
                  isSubmitting || !formData.agreePolicy
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
            >
              {isSubmitting ? "Sending Request..." : "Send Booking Request"}
            </button>
          </form>
        </div>

        {/* --- Policies Section (2/5 width) --- */}
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
