const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
const packageNames = {
  "down-south": "Down South Escape",
  "ella-getaway": "Ella Mountain Getaway",
  "combo-package": "Down South + Ella Combo Package",
  "custom-tour": "Custom Sri Lanka Tour",
};

export async function submitEnquiry(enquiry) {
  const response = await fetch(`${apiBaseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...enquiry,
      tourPackage: packageNames[enquiry.tourPackage] || enquiry.tourPackage,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error("Sorry, something went wrong. Please try again.");
    error.fields = body.errors;
    error.serverMessage = body.message;
    throw error;
  }

  return body;
}
