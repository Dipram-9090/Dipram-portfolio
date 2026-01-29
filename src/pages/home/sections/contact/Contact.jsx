import React, { useState } from "react";
import LocationPinIcon from "../../../../components/iconComponents/LocationPinIcon";
import LinkedInIcon from "../../../../components/iconComponents/LinkedInIcon";
import BehanceIcon from "../../../../components/iconComponents/BehanceIcon";
import SuccessModal from "../../../../components/SuccessModal";

// Import the new separate components
import EmailCopyBlock from "./components/EmailCopyBlock"; // Update path as needed
import PhoneCopyBlock from "./components/PhoneCopyBlock"; // Update path as needed

const Contact = () => {
  // State for the message text
  const [result, setResult] = useState("");
  // State for loading status (true/false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for result type ('success' | 'error' | null)
  const [status, setStatus] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    // Start Loading
    setIsSubmitting(true);
    setResult("Sending....");
    setStatus(null); // Reset previous status

    const formData = new FormData(event.target);
    formData.append("access_key", "9bb06752-08d4-49e0-ae5e-ebb80a228b04");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // On success, open the modal and reset form
        setIsModalOpen(true);
        setStatus("success");
        event.target.reset();

        // Clear the "Sending..." text immediately since modal is open
        setResult("");
      } else {
        setResult(data.message || "Something went wrong.");
        setStatus("error");
      }
    } catch (error) {
      setResult("Network connection error. Please try again later.");
      setStatus("error");
    } finally {
      // Stop Loading
      setIsSubmitting(false);

      // Optional: Clear the success/error message after 5 seconds
      setTimeout(() => {
        setResult("");
        setStatus(null);
      }, 5000);
    }
  };

  const fields = [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your name",
      required: true,
    },
    {
      id: "phone",
      name: "phone",
      label: "Phone No.",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
      required: false,
    },
    {
      id: "subject",
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Subject of your message",
      required: false,
    },
  ];

  return (
    <div className="contact-section flex flex-col gap-10 lg:gap-2 justify-center px-5 py-10 lg:px-10 lg:py-15 lg:flex-row bg-[#131313] min-h-screen w-full relative overflow-hidden">
      {/* Render the Modal (It will only show if isModalOpen is true) */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* ... Left Side content ... */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:gap-6 justify-center lg:p-10">
        <h1 className="font-bebas text-white text-[15vw] lg:text-[10vw] leading-[0.8] opacity-100 lg:opacity-100 select-none text-center lg:text-left mt-15 lg:mt-0">
          GET IN <span>TOUCH</span>
        </h1>
        <div className="flex flex-wrap gap-6 lg:gap-5 text-white justify-center lg:justify-start">
          
          {/* Location */}
          <div className="flex gap-4 items-start w-full sm:w-70">
            <LocationPinIcon width={40} height={40} />
            <div className="flex flex-col gap-1 w-full sm:w-45">
              <h4 className="font-euclid font-medium text-xl">Located at</h4>
              <p className="font-euclid">
                Based out of Kolkata, West Bengal, India
              </p>
            </div>
          </div>

          {/* Email Block Component */}
          <EmailCopyBlock />

          {/* Phone Block Component */}
          <PhoneCopyBlock />

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/dipram-biswas/"
            target="blank"
            className="flex gap-4 items-start w-full sm:w-70 group hover:text-[#19E6B6]"
          >
            <LinkedInIcon width={40} height={40} />
            <div className="flex flex-col gap-1 w-full sm:w-45">
              <h4 className="font-euclid font-medium text-xl">Linkedin</h4>
              <p className="font-euclid underline">Dipram Biswas</p>
            </div>
          </a>

          {/* Behance */}
          <a
            href="https://www.behance.net/diprambiswas9090"
            target="blank"
            className="flex gap-4 items-start w-full sm:w-70 group hover:text-[#19E6B6]"
          >
            <BehanceIcon width={40} height={40} />
            <div className="flex flex-col gap-1 w-full sm:w-45">
              <h4 className="font-euclid font-medium text-xl">
                Behance profile
              </h4>
              <p className="font-euclid underline">Dipram Biswas</p>
            </div>
          </a>
        </div>
      </div>

      {/* ... Right Side Form ... */}
      <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center lg:p-10">
        <form
          onSubmit={onSubmit}
          className="bg-[#1F1F1F] border border-white/10 shadow-2xl w-full rounded-2xl flex flex-col py-6 px-5 lg:py-8 lg:px-8 gap-3"
        >
          <h2 className="text-3xl lg:text-4xl font-bebas font-medium text-white mb-2 text-center lg:text-left">
            Send a Message
          </h2>

          {fields.map((field) => {
            return (
              <div key={field.id} className="flex flex-col gap-2">
                <label
                  htmlFor={field.id}
                  className="font-euclid font-medium text-white/80 text-sm"
                >
                  {field.label} {field.required && <span>*</span>}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="font-euclid w-full px-4 py-3 bg-black/20 rounded-lg border border-white/10 text-white placeholder-white/30 focus:border-teal-400 focus:bg-black/40 focus:outline-none transition-all"
                />
              </div>
            );
          })}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-euclid font-medium text-white/80 text-sm"
            >
              Message <span>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Write your message here..."
              className="font-euclid w-full px-4 py-3 bg-black/20 rounded-lg border border-white/10 text-white placeholder-white/30 focus:border-teal-400 focus:bg-black/40 focus:outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 w-full py-3 rounded-full text-black text-xl font-euclid font-medium transition-all duration-200 
              ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed opacity-70"
                  : "bg-[#FFF] hover:bg-[#19E6B6] hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {status === "error" && (
            <div className="text-center p-3 rounded-lg border bg-red-500/10 border-red-500/50 text-red-400 text-sm">
              {result}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;