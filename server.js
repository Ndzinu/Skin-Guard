import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set up high limit for base64 images
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // API Skin Image Classifier Route
  app.post("/api/classify", async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Check if API key is set
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        console.warn("GEMINI_API_KEY is not set. Falling back to deterministic analysis.");
        const simulatedResult = getSimulatedResult(image);
        return res.json(simulatedResult);
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      // Parse base64 parts
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      };

      const prompt = `
Analyze this skin image and classify it into exactly one of the following 11 categories:
- Lichen
- Infestation bites
- Acne
- Eczema
- Ringworm
- Actinic keratosis
- Lupus
- Mole
- Vitiligo
- Skin cancer
- Unknown normal

If the image does not depict human skin or if no clear condition can be recognized, classify it as "Unknown normal".

Return a raw JSON object matching this schema:
{
  "condition": "The exact selected category name (e.g., Eczema or Skin cancer)",
  "confidence": 0.88, // float between 0.0 and 1.0
  "description": "A comprehensive description of the skin condition, explaining what it is in clear, empathetic, and medically-grounded terms.",
  "symptoms": [
    "Key symptom 1",
    "Key symptom 2",
    "Key symptom 3"
  ],
  "selfCare": [
    "Practical, actionable tip 1",
    "Practical, actionable tip 2",
    "Practical, actionable tip 3"
  ],
  "urgency": "low" // 'low' (monitor/home care), 'medium' (consult clinic soon), 'high' (see dermatologist immediately)
}

CRITICAL: Return ONLY valid JSON. Do not wrap in markdown blocks like \`\`\`json.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [imagePart, { text: prompt }],
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      console.log("Gemini API raw response:", responseText);

      try {
        const result = JSON.parse(responseText.trim());
        return res.json(result);
      } catch (parseError) {
        console.error("Failed to parse response as JSON. Retrying with regex pattern.", parseError);
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return res.json(result);
        }
        throw parseError;
      }
    } catch (error) {
      console.error("Error classifying image via Gemini:", error);
      res.status(500).json({
        error: "Failed to classify skin image. Falling back to simulated results.",
        details: error.message,
        simulated: true,
        ...getSimulatedResult(req.body.image || "")
      });
    }
  });

  // Dev vs Production asset serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist/");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully booted on http://localhost:${PORT}`);
  });
}

// Simulated fallback if API key is not present or triggers an error
function getSimulatedResult(image) {
  // Use length of base64 to give a semi-deterministic fallback
  const hash = image ? image.length % 5 : 0;
  
  const simulatedDB = [
    {
      condition: "Eczema",
      confidence: 0.89,
      description: "Eczema (Atopic Dermatitis) is a highly common chronic skin condition that causes patches of dry, red, inflamed, and intensely itchy skin. It is frequently associated with skin barrier weakness and allergies.",
      symptoms: [
        "Dry, cracked, or scaly patches",
        "Severe pruritus (itching), particularly worse during nighttime",
        "Sensitive, swollen skin resulting from constant scratching",
        "Red to brownish-grey patches on hands, ankles, elbow creases, or neck"
      ],
      selfCare: [
        "Moisturize your skin at least twice daily with highly emollient creams or ointments.",
        "Take brief, lukewarm showers (under 10 minutes) and pat dry.",
        "Use fragrance-free, hypoallergenic skincare products.",
        "Avoid wool clothing and other known skin triggers."
      ],
      urgency: "low",
      isSimulated: true
    },
    {
      condition: "Acne",
      confidence: 0.94,
      description: "Acne Vulgaris is a very common skin disorder occurring when hair follicles become blocked with excess sebum oil and sloughed-off skin cells. This environment allows bacteria to multiply, causing inflammatory bumps.",
      symptoms: [
        "Whiteheads (plugged hair follicles under the skin)",
        "Blackheads (plugged follicles exposed to air)",
        "Small red, tender bumps (papules)",
        "Pimples containing pus (pustules)",
        "Deep, painful lumps underneath the skin (nodules/cysts)"
      ],
      selfCare: [
        "Cleanse your skin gently with a mild, non-soap cleanser twice daily.",
        "Avoid picking, squeezing, or popping blemishes, as this worsens inflammation and leads to scarring.",
        "Select non-comedogenic cosmetics to prevent further pore clogging.",
        "Be patient; acne treatments often take 4-8 weeks to show results."
      ],
      urgency: "low",
      isSimulated: true
    },
    {
      condition: "Ringworm",
      confidence: 0.85,
      description: "Ringworm (Tinea Corporis) is a contagious fungal skin infection. It produces a distinctive circular, ring-shaped rash with slightly raised, active scaly borders and clear skin in the center.",
      symptoms: [
        "Circular scaly rash with slightly elevated red outer margins",
        "Mild to moderate localized itching",
        "Border may expand outwards while leaving the center clear",
        "Slightly scaly or flaky texture over the rash site"
      ],
      selfCare: [
        "Keep the skin thoroughly washed, dry, and cool.",
        "Apply over-the-counter topical antifungal ointments (like Clotrimazole) daily.",
        "Avoid sharing personal towels, bedding, or clothes.",
        "Wash hands immediately after administering topical treatments to prevent spreading."
      ],
      urgency: "low",
      isSimulated: true
    },
    {
      condition: "Mole",
      confidence: 0.92,
      description: "A Mole (Melanocytic Nevus) is a common benign skin growth formed by clusters of pigmented cells (melanocytes). Most moles are harmless; however, any mole displaying rapid changes in shape, border, or colors should be medically evaluated.",
      symptoms: [
        "Small, round, or oval spot on the skin, typically brown or black",
        "Symmetrical border with single uniform color throughout",
        "Smooth, flat, or slightly dome-shaped texture",
        "Completely static, showing zero evolution over time"
      ],
      selfCare: [
        "Examine your skin monthly using the ABCDE method to monitor for any atypical changes.",
        "Apply high-SPF sunscreen daily to prevent UV-induced changes in pigmented spots.",
        "Schedule an annual full-body exam with a board-certified dermatologist.",
        "Keep high-quality photo records of moles to track long-term stability."
      ],
      urgency: "low",
      isSimulated: true
    },
    {
      condition: "Unknown normal",
      confidence: 0.95,
      description: "Your skin appears healthy with no signs of active or abnormal dermatological conditions. Minor skin dry spots or superficial minor blemishes fall under typical skin physiology.",
      symptoms: [
        "Normal healthy skin pigment and elasticity",
        "No growing lesions or scaling plaques present",
        "Blemishes are superficial and do not indicate underlying systemic disease",
        "No severe inflammation, irritation, or localized swelling"
      ],
      selfCare: [
        "Maintain a daily routine of gentle cleansing and moisturizing.",
        "Apply broad-spectrum SPF 30+ sunscreen daily before leaving the house.",
        "Stay hydrated and maintain a balanced diet high in antioxidants.",
        "Consult a physician if any skin changes begin to emerge or cause concern."
      ],
      urgency: "low",
      isSimulated: true
    }
  ];

  return simulatedDB[hash % simulatedDB.length];
}

startServer();
