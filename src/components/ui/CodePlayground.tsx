import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Copy, Download, RefreshCw, Terminal, Code, Eye } from 'lucide-react';

interface CodePlaygroundProps {
  defaultCode?: string;
  language?: string;
  theme?: 'light' | 'dark';
  editable?: boolean;
  title?: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  defaultCode = 'console.log("Hello, World!");',
  language = 'javascript',
  theme = 'dark',
  editable = true,
  title = 'Code Playground'
}) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'output' | 'preview'>('code');
  const [errors, setErrors] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Enhanced code execution with better error handling
  const executeCode = async () => {
    setIsRunning(true);
    setOutput([]);
    setErrors([]);

    try {
      // Create a safe execution environment
      const logs: string[] = [];
      const errorLogs: string[] = [];

      // Override console methods
      const mockConsole = {
        log: (...args: unknown[]) => logs.push(args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')),
        error: (...args: unknown[]) => errorLogs.push(args.join(' ')),
        warn: (...args: unknown[]) => logs.push(`⚠️ ${args.join(' ')}`),
        info: (...args: unknown[]) => logs.push(`ℹ️ ${args.join(' ')}`),
      };

      // Create execution context
      const executeInContext = new Function('console', 'window', 'document', 
        `
        try {
          ${code}
        } catch (error) {
          console.error('Runtime Error: ' + error.message);
        }
        `
      );

      // Execute code
      executeInContext(mockConsole, {}, {});

      setOutput(logs);
      setErrors(errorLogs);

      // If it's HTML/CSS/JS, update preview
      if (language === 'html' || code.includes('<html>') || code.includes('<!DOCTYPE html>')) {
        updatePreview(code);
      }

    } catch (error) {
      setErrors([`Syntax Error: ${(error as Error).message}`]);
    }

    setIsRunning(false);
  };

  const updatePreview = (htmlCode: string) => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (doc) {
      doc.open();
      doc.write(htmlCode);
      doc.close();
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${getFileExtension(language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getFileExtension = (lang: string) => {
    const extensions: { [key: string]: string } = {
      javascript: 'js',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c'
    };
    return extensions[lang] || 'txt';
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput([]);
    setErrors([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Code className="w-5 h-5" />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={executeCode}
              disabled={isRunning || !editable}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Running...' : 'Run'}
            </motion.button>
            <button
              onClick={copyCode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={downloadCode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={resetCode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-4">
          {['code', 'output', 'preview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'code' | 'output' | 'preview')}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'code' && <Code className="w-4 h-4" />}
              {tab === 'output' && <Terminal className="w-4 h-4" />}
              {tab === 'preview' && <Eye className="w-4 h-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex h-96">
        <AnimatePresence mode="wait">
          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {editable ? (
                <Editor
                  height="400px"
                  language={language}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    formatOnType: true,
                    formatOnPaste: true,
                  }}
                />
              ) : (
                <SyntaxHighlighter
                  language={language}
                  style={theme === 'dark' ? vscDarkPlus : prism}
                  customStyle={{ margin: 0, height: '400px', overflow: 'auto' }}
                >
                  {code}
                </SyntaxHighlighter>
              )}
            </motion.div>
          )}

          {activeTab === 'output' && (
            <motion.div
              key="output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full p-4 bg-black text-green-400 font-mono text-sm overflow-auto"
            >
              <div className="mb-2 text-gray-500">Console Output:</div>
              {errors.length > 0 && (
                <div className="text-red-400 mb-2">
                  {errors.map((error, index) => (
                    <div key={index}>❌ {error}</div>
                  ))}
                </div>
              )}
              {output.length > 0 ? (
                output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-1"
                  >
                    {'> '}{line}
                  </motion.div>
                ))
              ) : (
                <div className="text-gray-500">No output yet. Run your code to see results.</div>
              )}
            </motion.div>
          )}

          {activeTab === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <iframe
                ref={iframeRef}
                title="Code Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Code snippet showcase component
export const CodeShowcase: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);

  const codeExamples = [
    {
      title: 'React Hook Example',
      language: 'javascript',
      code: `import { useState, useEffect } from 'react';

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  useEffect(() => {
    console.log(\`Count updated: \${count}\`);
  }, [count]);
  
  return { count, increment, decrement, reset };
};

// Usage example
const { count, increment, decrement, reset } = useCounter(10);
console.log('Initial count:', count);
increment();
increment();
console.log('After increments:', count);`
    },
    {
      title: 'CSS Animation',
      language: 'css',
      code: `.animated-card {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 12px;
  transform: translateY(0px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.animated-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}`
    },
    {
      title: 'Interactive HTML Demo',
      language: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Demo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 400px;
        }
        
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background: #5a67d8;
            transform: translateY(-2px);
        }
        
        .counter {
            font-size: 2rem;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Interactive Counter</h1>
        <div class="counter" id="counter">0</div>
        <button class="btn" onclick="increment()">+</button>
        <button class="btn" onclick="decrement()">-</button>
        <button class="btn" onclick="reset()">Reset</button>
    </div>
    
    <script>
        let count = 0;
        const counterElement = document.getElementById('counter');
        
        function increment() {
            count++;
            updateDisplay();
        }
        
        function decrement() {
            count--;
            updateDisplay();
        }
        
        function reset() {
            count = 0;
            updateDisplay();
        }
        
        function updateDisplay() {
            counterElement.textContent = count;
            counterElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counterElement.style.transform = 'scale(1)';
            }, 200);
        }
    </script>
</body>
</html>`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Example selector */}
      <div className="flex flex-wrap gap-2">
        {codeExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => setSelectedExample(index)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedExample === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Code playground */}
      <CodePlayground
        key={selectedExample}
        defaultCode={codeExamples[selectedExample].code}
        language={codeExamples[selectedExample].language}
        title={codeExamples[selectedExample].title}
        editable={true}
      />
    </div>
  );
};
