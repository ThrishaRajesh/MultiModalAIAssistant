# 🤖 MultiModal AI Assistant

A full-stack AI application that generates both **text and images** using cutting-edge AI models. Built with React, Node.js, and integrated with Google Gemini and Hugging Face APIs.

---

## ✨ Features

- **Text Generation**: Generate contextually relevant text using Google Gemini AI
- **Image Generation**: Create high-quality images using Stable Diffusion (Hugging Face)
- **Toggle-Based Interface**: Easily switch between text and image generation modes
- **Real-time Feedback**: Loading indicators and error handling for user clarity
- **Responsive Design**: Clean, intuitive UI that works seamlessly across devices
- **Automatic Image Storage**: Generated images are automatically saved to the server

---

## 🏗️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **Cors** - Cross-origin request handling

### APIs
- **Google Gemini AI** - Text generation
- **Hugging Face Stable Diffusion** - Image generation

---

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **API Keys**:
  - Google Gemini API key
  - Hugging Face API key

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ThrishaRajesh/MultiModalAIAssistant.git
cd MultiModalAIAssistant
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
echo "HUGGING_FACE_API_KEY=your_hugging_face_api_key_here" >> .env

# Create images directory for storing generated images
mkdir -p public/images

# Start the server
node server.js
```

The server will run on `http://localhost:5012`

### 3. Frontend Setup

```bash
cd client/vite-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server/` directory:

```
GEMINI_API_KEY=your_google_gemini_api_key
HUGGING_FACE_API_KEY=your_hugging_face_api_key
```

**How to get API keys:**

1. **Google Gemini API**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Hugging Face API**: Visit [Hugging Face Account Settings](https://huggingface.co/settings/tokens)

---

## 📖 Usage

1. **Open the Application**
   - Navigate to `http://localhost:5173` in your browser

2. **Generate Content**
   - Select generation type: Text or Image
   - Enter your prompt in the text area
   - Click "Generate"
   - View results in real-time

3. **Generated Images**
   - Images are automatically saved to `server/public/images/`
   - Accessible via the browser from the application

---

## 🗂️ Project Structure

```
MultiModalAIAssistant/
├── client/
│   └── vite-project/
│       ├── src/
│       │   ├── App.jsx           # Main React component
│       │   ├── App.css           # Styling
│       │   ├── main.jsx          # Entry point
│       │   └── index.css         # Global styles
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
│
├── server/
│   ├── server.js                 # Express server & API routes
│   ├── package.json
│   ├── public/
│   │   └── images/               # Generated images storage
│   └── .env                      # API keys (gitignored)
│
├── README.md
└── .gitignore
```

---

## 🔌 API Endpoints

### `POST /generate`

Generates text or images based on the provided prompt.

**Request:**
```json
{
  "prompt": "Your prompt here",
  "generationType": "text" | "image"
}
```

**Response (Text):**
```json
{
  "result": {
    "parts": [
      { "text": "Generated text content..." }
    ]
  }
}
```

**Response (Image):**
```json
{
  "result": "http://localhost:5012/images/timestamp_generatedImage.jpg"
}
```

---

## 🛠️ Development

### Running Both Servers Simultaneously

**Terminal 1 - Backend:**
```bash
cd server
npm install
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd client/vite-project
npm install
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd client/vite-project
npm run build
```

**Backend:** Deploy the `server/` directory to your hosting platform.

---

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `node server.js` - Start Express server

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure both servers are running and API keys are set |
| API errors | Verify API keys are valid and have active quotas |
| Images not saving | Check that `server/public/images/` directory exists |
| Port conflicts | Change port in `server.js` or close conflicting processes |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 📧 Contact & Support

For issues, questions, or suggestions, please open an [issue](https://github.com/ThrishaRajesh/MultiModalAIAssistant/issues) on GitHub.

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://deepmind.google/technologies/gemini/) for text generation
- [Hugging Face](https://huggingface.co/) for Stable Diffusion API
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) for frontend tooling
- [Express.js](https://expressjs.com/) for server framework

---

**Made with ❤️ by [ThrishaRajesh](https://github.com/ThrishaRajesh)**
