# UniBasic Modernization Demo

<div align="center">
  <h3>Interactive Demo: Legacy UniBasic → Modern .NET Transformation</h3>
  <p><strong>A side-by-side interactive demo showing how UniBasic code transforms into modern .NET + SQL implementations</strong></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## 🎯 Purpose

This demo provides a 3-minute sales presentation showing stakeholders how legacy UniBasic systems can be modernized. Perfect for demonstrating the transformation path from legacy to modern architecture.

## ✨ Demo Features

### 📺 3-Pane Interactive Layout
- **Legacy Terminal**: Simulated UniBasic Split-Load/BOL Entry routine
- **Code Transformation**: Side-by-side UniBasic → C#/EF Core comparison  
- **Modern UI Preview**: Live React form with real-time calculations

### 🎮 Interactive Elements
- Step-through navigation (Next/Previous/Reset)
- Progress indicator showing demo completion
- Live form fields updating with each transformation step
- Educational explanations for each modernization benefit

### 📚 Educational Content
- Repository Pattern vs direct file reads
- Service Layer with dependency injection  
- Real-time UI updates vs manual refreshes
- SQL transactions vs soft error handling
- Event-driven architecture for audit trails

## 🔧 Key Transformations Demonstrated

| UniBasic Code | Modern C# / EF Core | Benefit |
|---------------|-------------------|---------|
| `READV CUSTOMER, ID, 1, NAME` | `var name = await _customerRepo.GetNameAsync(id);` | Repository pattern, type safety |
| `GOSUB CALC_TAX` | `var tax = _taxService.Calculate(product, gallons, state);` | Dependency injection, testability |
| `WRITEV INVOICE, INV.ID, 5, TOTAL` | `await _invoiceRepo.UpdateTotalAsync(invId, total);` | Transaction safety, ACID compliance |
| `WRITEU INVENTORY, TANK.NO, 3, QTY` | `await _inventoryService.PostTxnAsync(tankId, qty);` | Event sourcing, audit trails |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/rushingJustice/unibasic-modernization.git
cd unibasic-modernization

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server (port 3000)
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Lint code with oxlint
pnpm lint:fix     # Fix linting issues
pnpm test         # Run tests with vitest
```

## 🎯 Tech Stack

- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library built on Radix UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Modern utility-first CSS framework
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TypeScript](https://typescriptlang.org/)** - Full type safety

## 📁 Project Structure

```
src/
├── routes/               # File-based routing
│   ├── __root.tsx       # Root layout with theme provider
│   ├── demo.tsx         # Main demo route
│   └── (marketing)/     # Marketing pages
├── components/
│   ├── demo/            # Demo-specific components
│   │   ├── SimpleDemoContainer.tsx      # 3-pane layout
│   │   ├── SimpleModernUIPreview.tsx    # Live form component
│   │   └── EducationalCallouts.tsx      # Educational content
│   └── ui/              # shadcn/ui components
├── stores/
│   └── demoStore.ts     # Zustand state management
└── data/
    └── demoScript.ts    # Demo step definitions
```

## 🎪 Expected Outcome

After watching the 3-minute demo, stakeholders will understand:

- ✅ **Why UniBasic is cumbersome** - See the command-line complexity
- ✅ **How each line maps to modern code** - Clear transformation path  
- ✅ **Concrete migration benefits** - Not just theoretical improvements
- ✅ **Professional modern UI** - Real-time calculations and validation
- ✅ **Confidence in the modernization path** - Concrete, not hand-wavy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>🤖 Generated with <a href="https://claude.ai/code">Claude Code</a></p>
</div>
