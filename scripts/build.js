const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "dist");
fs.mkdirSync(outDir, { recursive: true });

// Check if this is a failure build
const isFailureBuild = String(process.env.FAIL_BUILD || "").toLowerCase() === "true";
const statusColor = isFailureBuild ? "#ff0055" : "#00ff41";
const statusText = isFailureBuild ? "BUILD FAILED" : "BUILD SUCCESSFUL";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 JenkInsAI | Build Dashboard</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, ${isFailureBuild ? '#230f0f' : '#0f0f23'} 100%);
        color: ${statusColor};
        min-height: 100vh;
        overflow-x: hidden;
        position: relative;
      }
      
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 80%, ${isFailureBuild ? 'rgba(255, 0, 85, 0.1)' : 'rgba(0, 255, 65, 0.1)'} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 123, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 0, 150, 0.05) 0%, transparent 50%);
        pointer-events: none;
        z-index: -1;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        position: relative;
        z-index: 1;
      }
      
      .header {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem;
        border: 2px solid ${statusColor};
        border-radius: 12px;
        background: ${isFailureBuild ? 'rgba(255, 0, 85, 0.05)' : 'rgba(0, 255, 65, 0.05)'};
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px ${isFailureBuild ? 'rgba(255, 0, 85, 0.2)' : 'rgba(0, 255, 65, 0.2)'};
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, ${isFailureBuild ? 'rgba(255, 0, 85, 0.1)' : 'rgba(0, 255, 65, 0.1)'}, transparent);
        animation: ${isFailureBuild ? 'error-pulse' : 'scan'} 3s linear infinite;
      }
      
      @keyframes scan {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      }
      
      @keyframes error-pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
      }
      
      .logo {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-shadow: 0 0 20px ${statusColor};
        position: relative;
        z-index: 2;
      }
      
      .subtitle {
        color: #888;
        font-size: 1.2rem;
        position: relative;
        z-index: 2;
      }
      
      .status-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }
      
      .status-card {
        background: rgba(20, 20, 20, 0.8);
        border: 1px solid #333;
        border-radius: 12px;
        padding: 2rem;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .status-card:hover {
        border-color: ${statusColor};
        box-shadow: 0 8px 32px ${isFailureBuild ? 'rgba(255, 0, 85, 0.3)' : 'rgba(0, 255, 65, 0.3)'};
        transform: translateY(-5px);
      }
      
      .card-title {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: ${statusColor};
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .card-content {
        color: #ccc;
        line-height: 1.6;
      }
      
      .timestamp {
        background: ${isFailureBuild ? 'rgba(255, 0, 85, 0.1)' : 'rgba(0, 255, 65, 0.1)'};
        border: 1px solid ${statusColor};
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 2rem;
        text-align: center;
        font-family: 'SF Mono', monospace;
        font-size: 1.1rem;
        box-shadow: 0 4px 16px ${isFailureBuild ? 'rgba(255, 0, 85, 0.2)' : 'rgba(0, 255, 65, 0.2)'};
        animation: ${isFailureBuild ? 'error-blink' : 'pulse'} 2s infinite;
      }
      
      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
      }
      
      .metric {
        background: rgba(30, 30, 30, 0.6);
        border: 1px solid #444;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        transition: all 0.3s ease;
      }
      
      .metric-value {
        font-size: 2rem;
        font-weight: bold;
        color: ${isFailureBuild ? '#ff0055' : '#007bff'};
        margin-bottom: 0.5rem;
      }
      
      .metric-label {
        color: #888;
        font-size: 0.9rem;
      }
      
      .terminal {
        background: #0a0a0a;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 1.5rem;
        margin-top: 2rem;
        font-family: 'SF Mono', monospace;
        position: relative;
      }
      
      .terminal::before {
        content: '● ● ●';
        position: absolute;
        top: 0.5rem;
        left: 1rem;
        color: #666;
        font-size: 0.8rem;
      }
      
      .terminal-header {
        color: #666;
        margin-bottom: 1rem;
        padding-top: 1rem;
        border-bottom: 1px solid #333;
        padding-bottom: 0.5rem;
      }
      
      .terminal-content {
        color: ${statusColor};
        line-height: 1.4;
      }
      
      .pulse { animation: pulse 2s infinite; }
      .error-blink { animation: error-blink 1s infinite; }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      
      @keyframes error-blink {
        0%, 50% { color: #ff0055; }
        51%, 100% { color: #ff6666; }
      }
      
      .icon { font-size: 1.5rem; margin-right: 0.5rem; }
      
      @media (max-width: 768px) {
        .container { padding: 1rem; }
        .logo { font-size: 2rem; }
        .status-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">🤖 JenkInsAI</div>
        <div class="subtitle">Intelligent CI/CD Pipeline Dashboard</div>
      </div>
      
      <div class="timestamp">
        <strong>${statusText}</strong> • ${new Date().toISOString()}
      </div>
      
      <div class="status-grid">
        <div class="status-card">
          <div class="card-title">
            <span class="icon">${isFailureBuild ? '❌' : '✅'}</span>
            Build Status
          </div>
          <div class="card-content">
            ${isFailureBuild 
              ? 'Build process encountered errors during test execution. Review logs for detailed information.' 
              : 'All tests passed successfully. The application has been built and is ready for deployment.'}
          </div>
        </div>
        
        <div class="status-card">
          <div class="card-title">
            <span class="icon">${isFailureBuild ? '🧨' : '🧪'}</span>
            Test Results
          </div>
          <div class="card-content">
            ${isFailureBuild 
              ? 'Unit tests failed during execution. Assertion errors detected in test suite validation.' 
              : 'Unit tests executed with full coverage. All assertions validated against expected behavior.'}
          </div>
        </div>
        
        <div class="status-card">
          <div class="card-title">
            <span class="icon">📦</span>
            Artifacts
          </div>
          <div class="card-content">
            ${isFailureBuild 
              ? 'Build artifacts generated with warnings. Manual review required before deployment.' 
              : 'Build artifacts generated and archived. Ready for distribution to target environments.'}
          </div>
        </div>
        
        <div class="status-card">
          <div class="card-title">
            <span class="icon">${isFailureBuild ? '🚫' : '🚀'}</span>
            Deployment
          </div>
          <div class="card-content">
            ${isFailureBuild 
              ? 'Deployment blocked due to failed quality gates. Fix issues before proceeding.' 
              : 'Pipeline ready for deployment. All quality gates passed with automated validation.'}
          </div>
        </div>
      </div>
      
      <div class="metrics">
        <div class="metric">
          <div class="metric-value">${isFailureBuild ? '0%' : '100%'}</div>
          <div class="metric-label">Success Rate</div>
        </div>
        <div class="metric">
          <div class="metric-value">${Math.floor(Math.random() * 30 + 15)}s</div>
          <div class="metric-label">Build Time</div>
        </div>
        <div class="metric">
          <div class="metric-value">${isFailureBuild ? Math.floor(Math.random() * 15 + 5) : Math.floor(Math.random() * 50 + 20)}</div>
          <div class="metric-label">${isFailureBuild ? 'Tests Failed' : 'Tests Passed'}</div>
        </div>
        <div class="metric">
          <div class="metric-value">${isFailureBuild ? Math.floor(Math.random() * 8 + 2) : '0'}</div>
          <div class="metric-label">Errors</div>
        </div>
      </div>
      
      <div class="terminal">
        <div class="terminal-header">jenkins@pipeline:~$</div>
        <div class="terminal-content">
> npm run test<br>
${isFailureBuild 
  ? '❌ Test suite failed<br>> Error: Expected 4, received 5<br>> Tests: 1 failed, 0 passed<br>' 
  : '✓ All tests passed<br>'}
> npm run build<br>
${isFailureBuild 
  ? '⚠️  Build completed with errors<br>> Artifacts generated with warnings<br>' 
  : '✓ Build completed successfully<br>> Artifacts archived<br>'}
<span class="pulse">█</span>
        </div>
      </div>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
console.log(`🤖 JenkInsAI: Built techy dashboard (${isFailureBuild ? 'FAILURE' : 'SUCCESS'} mode) -> dist/index.html`);
