# ThaliCheck AI 🍱

**Empowering your cultural plate through regional AI insights.**

ThaliCheck AI is a smart nutritional companion specifically designed to navigate the complexities of the Indian diet. Unlike global calorie trackers that overlook regional nuances, ThaliCheck understands that a meal isn't just "carbs and protein"—it's a balance of *Dal*, *Sabzi*, *Roti*, and *Chawal*.

## 🌟 Key Features

- **Regional Nutritional Awareness:** Proprietary AI analysis optimized for Indian thalis, recognizing everything from *Sarson ka Saag* to *Pappu*.
- **Multilingual Support:** Fully translated UI for English, Hindi (हिन्दी), and Telugu (తెలుగు).
- **Activity-Aware Perspective:** Get actionable insights like "Walk for 10 minutes" based on your specific meal's glycemic load.
- **Secure Authentication:** Easy Google Sign-In powered by Firebase.
- **Smart History & Insights:** Track your "Thali Score" over time and identify holistic eating patterns.
- **Adaptive Fallback System:** Fully functional demo mode that works even without an active AI API key.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4 (Custom Design System)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Express.js
- **Auth & Database:** Firebase (Authentication & Firestore)
- **AI Engine:** Google Gemini Pro

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd thalicheck-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   *Note: The app will automatically enter "Mock Mode" if the key is missing.*

4. **Firebase Configuration:**
   Place your `firebase-applet-config.json` in the root directory.

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy

ThaliCheck AI uses a custom design language inspired by modern Indian aesthetics—the **Saffron-Cardamom Palette**. It prioritizes:
- **Mobile-First Utility:** Designed for one-handed operation while eating.
- **Fluid Micro-interactions:** Smooth transitions between nutritional states.
- **High Contrast Typography:** High legibility for regional scripts.

## 📄 License

This project is licensed under the Apache-2.0 License.
