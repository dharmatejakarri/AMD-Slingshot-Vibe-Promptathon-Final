import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // History Endpoint
  app.get("/api/history", (req, res) => {
    res.json([
      {
        title: "Royal North Indian Thali",
        date: "October 24, 2023",
        calories: 840,
        score: 84,
        img: "https://picsum.photos/seed/thali1/400/400"
      }
    ]);
  });

  // Insights Endpoint
  app.get("/api/insights", (req, res) => {
    res.json({
      vitalityScore: 84,
      patterns: ["Protein deficit detected", "Late evening load"]
    });
  });

  // Analyze Meal Endpoint
  app.post("/api/analyze-meal", async (req, res) => {
    try {
      const { mealText, imageBase64 } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        console.warn("Using fallback mock analysis: API key missing");
        return res.json({
          title: mealText || "Mixed Thali",
          calories: 680,
          score: 82,
          nutrients: [
            { label: 'Energy', val: '65%', color: 'bg-primary' },
            { label: 'Vitality', val: '25%', color: 'bg-tertiary' },
            { label: 'Balance', val: '10%', color: 'bg-secondary' }
          ],
          activityInsight: "Excellent alignment with your metabolic profile.",
          swaps: [
            { from: "White Rice", to: "Millet", diff: "+12% Fiber" }
          ]
        });
      }

      const genAI = new GoogleGenAI({ apiKey });
      const model = (genAI as any).getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Analyze this meal: "${mealText}". 
        Focus on North/South Indian culinary nuances. 
        Provide a health score (0-100) based on glycemic index and nutritional density. 
        List exactly 3 key nutrients.
        Provide one short activity insight.
        List 0-2 affordable swaps.`;

      const parts: any[] = [{ text: prompt }];
      if (imageBase64) {
        parts.push({ inlineData: { data: imageBase64, mimeType: "image/jpeg" } });
      }

      const generationConfig = {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "calories", "score", "nutrients", "activityInsight", "swaps"],
          properties: {
            title: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            score: { type: Type.NUMBER },
            nutrients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  val: { type: Type.STRING },
                  color: { type: Type.STRING }
                }
              }
            },
            activityInsight: { type: Type.STRING },
            swaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  from: { type: Type.STRING },
                  to: { type: Type.STRING },
                  diff: { type: Type.STRING }
                }
              }
            }
          }
        }
      };

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig
      });

      const text = result.response.text();
      res.json(JSON.parse(text));
    } catch (error) {
      console.error("AI Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze meal" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
