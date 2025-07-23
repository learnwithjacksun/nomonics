import axios from "axios";
import env from "../config/env.js";

export default async function pdfToImage(pdf) {
  try {
    const response = await axios.post(
      `${env.PDF_API_URL}/pdf/convert/to/png`,
      {
        url: pdf,
        inline: true,
        pages: "0-",
        async: false,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": env.PDF_API_KEY,
        },
      }
    );

    if (response.data?.status === 200 && Array.isArray(response.data.urls)) {
      return response.data.urls;
    } else {
      throw new Error(
        `PDF.co API error: status ${response.data?.status}, error: ${response.data?.error}`
      );
    }
  } catch (error) {
    console.error("Conversion failed:", error?.response?.data || error.message);
    throw new Error("Failed to convert PDF to image");
  }
}
