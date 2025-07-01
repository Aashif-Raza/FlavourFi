const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const path = require('path');

// PDF generation options
const options = {
  cssPath: path.join(__dirname, 'pdf-styles.css'),
  remarkable: {
    html: true,
    breaks: true,
    plugins: [],
    syntax: ['footnote', 'sup', 'sub']
  },
  paperFormat: 'A4',
  paperOrientation: 'portrait',
  paperBorder: '1cm',
  runningsPath: path.join(__dirname, 'pdf-header-footer.js'),
  preProcessMd: function() {
    return function(markdown) {
      // Add custom styling and processing if needed
      return markdown;
    };
  },
  preProcessHtml: function() {
    return function(html) {
      // Add custom HTML processing if needed
      return html;
    };
  }
};

// Create CSS file for PDF styling
const cssContent = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 20px;
  }
  
  h1 {
    color: #2c3e50;
    border-bottom: 3px solid #3498db;
    padding-bottom: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #34495e;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 8px;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  h3 {
    color: #7f8c8d;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  code {
    background-color: #f8f9fa;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    border-left: 4px solid #3498db;
  }
  
  pre code {
    background-color: transparent;
    padding: 0;
  }
  
  blockquote {
    border-left: 4px solid #3498db;
    margin: 0;
    padding-left: 15px;
    color: #7f8c8d;
    font-style: italic;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 15px 0;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  ul, ol {
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  .toc {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  
  .toc ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .toc li {
    margin-bottom: 8px;
  }
  
  .toc a {
    color: #3498db;
    text-decoration: none;
  }
  
  .toc a:hover {
    text-decoration: underline;
  }
  
  .highlight {
    background-color: #fff3cd;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #ffc107;
  }
  
  .info-box {
    background-color: #d1ecf1;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #17a2b8;
    margin: 15px 0;
  }
  
  .warning-box {
    background-color: #f8d7da;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #dc3545;
    margin: 15px 0;
  }
  
  .success-box {
    background-color: #d4edda;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #28a745;
    margin: 15px 0;
  }
  
  .page-break {
    page-break-before: always;
  }
  
  @media print {
    body {
      font-size: 12pt;
    }
    
    h1 {
      font-size: 18pt;
    }
    
    h2 {
      font-size: 16pt;
    }
    
    h3 {
      font-size: 14pt;
    }
    
    pre {
      font-size: 10pt;
    }
    
    code {
      font-size: 10pt;
    }
  }
`;

// Create header/footer script
const headerFooterScript = `
  module.exports = {
    footer: {
      height: "1cm",
      contents: function(pageNum, numPages) {
        return "<div style='text-align: center; font-size: 10pt; color: #666;'>" +
               "Page " + pageNum + " of " + numPages + " | Recipe Finder App Documentation" +
               "</div>";
      }
    },
    header: {
      height: "1cm",
      contents: function(pageNum, numPages) {
        return "<div style='text-align: center; font-size: 10pt; color: #666;'>" +
               "FlavourFi - Component Architecture Documentation" +
               "</div>";
      }
    }
  };
`;

// Write CSS and header/footer files
fs.writeFileSync('pdf-styles.css', cssContent);
fs.writeFileSync('pdf-header-footer.js', headerFooterScript);

console.log('🚀 Starting PDF generation...');

// Read the markdown file
const markdownFile = 'Recipe-Finder-Component-Architecture.md';
const outputFile = 'Recipe-Finder-Component-Architecture.pdf';

if (!fs.existsSync(markdownFile)) {
  console.error('❌ Markdown file not found:', markdownFile);
  process.exit(1);
}

// Generate PDF
markdownpdf(options)
  .from(markdownFile)
  .to(outputFile, function() {
    console.log('✅ PDF generated successfully!');
    console.log('📄 Output file:', outputFile);
    
    // Clean up temporary files
    try {
      fs.unlinkSync('pdf-styles.css');
      fs.unlinkSync('pdf-header-footer.js');
      console.log('🧹 Temporary files cleaned up');
    } catch (err) {
      console.log('⚠️ Could not clean up temporary files:', err.message);
    }
    
    // Get file size
    const stats = fs.statSync(outputFile);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeInMB} MB`);
    
    console.log('\n🎉 PDF generation completed successfully!');
    console.log('📁 You can find the PDF in the project root directory.');
  })
  .on('error', function(err) {
    console.error('❌ Error generating PDF:', err);
    process.exit(1);
  }); 