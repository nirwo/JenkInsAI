# 🤖 JenkInsAI | Intelligent CI/CD Pipeline

> **A cyberpunk-inspired Jenkins CI/CD demonstration with dynamic success/failure scenarios and sleek tech aesthetics.**

[![Build Status](https://img.shields.io/badge/build-automated-brightgreen?style=for-the-badge&logo=jenkins)](https://jenkins.io/)
[![Tech Theme](https://img.shields.io/badge/design-cyberpunk-ff0055?style=for-the-badge&logo=css3)](https://github.com/nirwo/JenkInsAI)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

## 🚀 Features

- **🎨 Dark Tech Aesthetic**: Cyberpunk-inspired design with neon accents and glassmorphism
- **📊 Interactive Dashboard**: Real-time build status with animated elements and metrics
- **🔄 Dual Build Modes**: Toggle between success/failure scenarios for CI/CD testing
- **📱 Responsive Design**: Works seamlessly across desktop, tablet, and mobile
- **🛠️ Jenkins Integration**: Complete pipeline with proper artifact archiving and test reporting
- **⚡ Modern UI**: Smooth animations, terminal simulation, and tech-themed interface

## 🛠️ Quick Start

### Local Development
```bash
# 🎯 Clone the repository
git clone https://github.com/nirwo/JenkInsAI.git
cd JenkInsAI

# 📦 Install dependencies
npm ci

# ✅ Run successful build scenario
./run-pass.sh

# ❌ Run failure build scenario  
./run-fail.sh

# 🚀 View the techy dashboard
npm start
```

### Jenkins Setup

1. **Create New Pipeline Job** in Jenkins
2. **Configure Pipeline**:
   - Repository URL: `https://github.com/nirwo/JenkInsAI`
   - Branch: `main` (not master!)
   - Script Path: `Jenkinsfile`
3. **Add Build Parameters**:
   - Boolean Parameter: `FAIL_BUILD` (default: false)
4. **Save & Build**

### Environment Variables

| Variable | Description | Values |
|----------|-------------|---------|
| `FAIL_BUILD` | Controls build outcome | `true` (failure) / `false` (success) |

## 📁 Project Structure

```
JenkInsAI/
├── 🤖 Jenkinsfile              # Pipeline configuration
├── 📦 package.json             # Node.js dependencies
├── 🧪 jest.config.js           # Test configuration  
├── 📊 scripts/build.js         # Techy dashboard builder
├── 🧩 src/sum.js               # Example source code
├── 🔬 __tests__/sum.test.js    # Test scenarios
├── 📈 reports/junit/           # Test result reports
├── 🎯 run-pass.sh              # Success scenario
├── 💥 run-fail.sh              # Failure scenario
└── 📱 dist/index.html          # Generated dashboard
```

## 🎨 Dashboard Features

### Success Mode (`FAIL_BUILD=false`)
- **🟢 Matrix Green**: Neon green accents and animations
- **✅ Success Metrics**: 100% success rate, passed tests
- **🚀 Deployment Ready**: All quality gates passed

### Failure Mode (`FAIL_BUILD=true`)  
- **🔴 Cyber Red**: Warning red theme with error animations
- **❌ Error Indicators**: Failed tests, blocked deployment
- **💥 Debug Info**: Detailed error logging and metrics

## 🔧 Jenkins Issues Resolution

The original Jenkins errors have been resolved:

| ❌ Original Issue | ✅ Solution |
|-------------------|-------------|
| Branch `master` not found | Updated pipeline to use `main` branch |
| No artifacts configured | Added `archiveArtifacts: 'dist/**/*'` |
| No test reports found | Configured `junit: 'reports/junit/*.xml'` |
| Missing Jenkinsfile | Created comprehensive pipeline script |

## 🎯 Use Cases

- **CI/CD Testing**: Validate Jenkins pipeline configurations
- **Failure Simulation**: Test error handling and recovery procedures  
- **UI Showcase**: Demonstrate modern tech-themed interface design
- **DevOps Training**: Learn pipeline automation with visual feedback

## 🔮 Advanced Features

- **🌊 Glassmorphism Effects**: Frosted glass UI components
- **⚡ CSS Animations**: Scanning effects and status indicators
- **📊 Dynamic Metrics**: Randomized build times and test counts
- **🖥️ Terminal Simulation**: Authentic command-line interface styling
- **📱 Mobile Responsive**: Adaptive layout for all screen sizes

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the developer community**  
*Combining cutting-edge design with practical DevOps automation*