# 📄 PDF Kit

**Privacy-first, client-side PDF tools for the modern web.**

[**Live App**](https://pdfkit.siddhesh.cc/)

PDF Kit is a suite of lightweight, browser-based utilities for managing PDF documents. Unlike traditional PDF editors that upload your sensitive data to a server, **PDF Kit processes everything locally in your browser.** Your files never leave your device.

## 🛠️ Built for the Web, Powered by You

PDF Kit offers a collection of essential tools for everyday PDF management:

- **Merge PDF:** Combine multiple documents into a single file with drag-and-drop reordering.
- **Split PDF:** Extract specific pages or split large documents into individual files.
- **Reorganize PDF:** Rearrange, rotate, or delete pages with a visual grid interface.
- **Metadata Editor:** View and update PDF properties like Title, Author, and Subject.

### ⚡ Under the Hood

Built with the latest web standards for performance and developer productivity:

- **Framework:** [React 19](https://react.dev/) with [React Compiler](https://react.dev/learn/react-compiler)
- **Routing:** [TanStack Router](https://tanstack.com/router) for type-safe, client-side navigation
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) for a modern, utility-first design
- **PDF Engine:** [pdf-lib](https://pdf-lib.js.org/) & [pdf.js](https://mozilla.github.io/pdf.js/) for high-performance client-side processing
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) for global, edge-speed delivery

## 🚀 Getting Started

Follow these steps to set up the project locally for development.

### Prerequisites

- [pnpm](https://pnpm.io/) for package management
- [Node.js](https://nodejs.org/) (LTS recommended)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Siddhesh-Agarwal/pdf-kit.git
   cd pdf-kit
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The app will be available at `http://localhost:5173`.

### 🧪 Scripts

- `pnpm dev`: Start the development server with Vite
- `pnpm build`: Build the project for production
- `pnpm preview`: Build and preview the production build using `wrangler`
- `pnpm check`: Run Biome linting and formatting checks
- `pnpm format`: Automatically format code with Biome
- `pnpm deploy`: Build and deploy the project to Cloudflare Pages

## 🤝 Contributing

Contributions are welcome! Whether it's fixing a bug or suggesting a new tool, please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚖️ License

Distributed under the MIT License.
