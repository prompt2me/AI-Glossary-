import React, { useState } from 'react';
import { GlossaryTerm } from '../types';
import { X, Download, Copy, Check, FileText, Printer, FileCode } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  terms: GlossaryTerm[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, terms }) => {
  const [format, setFormat] = useState<'markdown' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    let md = `# The AI Glossary\n\n`;
    md += `*Exported ${terms.length} terms*\n\n`;
    
    // Group by letter
    const grouped: Record<string, GlossaryTerm[]> = {};
    for (const t of terms) {
      if (!grouped[t.letter]) grouped[t.letter] = [];
      grouped[t.letter].push(t);
    }

    const letters = Object.keys(grouped).sort();
    for (const letter of letters) {
      md += `### ${letter}\n\n`;
      for (const t of grouped[letter]) {
        md += `**${t.term}**  \n`;
        md += `*Category: ${t.category}*  \n`;
        md += `${t.definition}\n\n`;
      }
    }
    return md;
  };

  const generateJSON = () => {
    return JSON.stringify(terms, null, 2);
  };

  const exportText = format === 'markdown' ? generateMarkdown() : generateJSON();

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = format === 'markdown' ? 'ai-glossary.md' : 'ai-glossary.json';
    const mime = format === 'markdown' ? 'text/markdown' : 'application/json';
    const blob = new Blob([exportText], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900 text-lg">Export AI Glossary Data</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              Exporting <strong className="text-gray-900 font-bold">{terms.length}</strong> terms based on active view.
            </p>

            {/* Format Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl border border-gray-200 text-xs">
              <button
                onClick={() => setFormat('markdown')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  format === 'markdown'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Markdown</span>
              </button>
              <button
                onClick={() => setFormat('json')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  format === 'json'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>
            </div>
          </div>

          {/* Preview Box */}
          <div className="relative">
            <pre className="w-full h-64 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono text-gray-800 overflow-auto whitespace-pre-wrap">
              {exportText}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-800 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
