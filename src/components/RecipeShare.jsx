import { useState } from 'react';
import Logo from '../assets/Brown_and_White_SImple_Modern_Professional_Catering_Logo-removebg-preview.png';

const RecipeShare = ({ recipe }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/recipe/${recipe.id}`;
  const shareText = `Check out this amazing recipe: ${recipe.title}`;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-blue-400 hover:bg-blue-500',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Email',
      icon: '📧',
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => {
        const subject = `Recipe: ${recipe.title}`;
        const body = `Hi!\n\nI found this amazing recipe and wanted to share it with you:\n\n${recipe.title}\n\n${shareText}\n\n${shareUrl}\n\nEnjoy cooking!`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
      }
    },
    {
      name: 'Copy Link',
      icon: '🔗',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = shareUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    }
  ];

  const generateRecipeCard = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 630;

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#fbbf24');
    gradient.addColorStop(1, '#f59e0b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 200);

    // Title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(recipe.title, canvas.width / 2, 120);

    // Recipe info
    ctx.fillStyle = '#6b7280';
    ctx.font = '24px Arial';
    ctx.fillText(`⏱ ${recipe.readyInMinutes} mins • 🍽 ${recipe.servings} servings`, canvas.width / 2, 160);

    // FlavourFi branding
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 36px Arial';
    ctx.fillText('FlavourFi', canvas.width / 2, 580);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_recipe_card.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">📤 Share Recipe</h3>
        <button
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {showShareOptions ? '✖' : '📤'}
        </button>
      </div>

      {showShareOptions && (
        <div className="space-y-4">
          {/* Quick Share Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`${option.color} text-white p-3 rounded-lg transition-colors flex flex-col items-center gap-1`}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-xs font-medium">{option.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Link with Feedback */}
          {copied && (
            <div className="p-3 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-center">
              ✅ Link copied to clipboard!
            </div>
          )}

          {/* Recipe Card Generator */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-800 dark:text-white mb-2">📸 Generate Recipe Card</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Create a beautiful image to share on social media
            </p>
            <button
              onClick={generateRecipeCard}
              className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
            >
              🎨 Generate Recipe Card
            </button>
          </div>

          {/* Recipe Details for Sharing */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-800 dark:text-white mb-2">📋 Recipe Summary</h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>{recipe.title}</strong><br />
                ⏱ {recipe.readyInMinutes} minutes • 🍽 {recipe.servings} servings<br />
                {recipe.cuisines && recipe.cuisines.length > 0 && (
                  <>🌍 {recipe.cuisines.join(', ')}<br /></>
                )}
                {recipe.diets && recipe.diets.length > 0 && (
                  <>🥗 {recipe.diets.join(', ')}<br /></>
                )}
                <br />
                <a href={shareUrl} className="text-blue-600 hover:underline break-all">
                  {shareUrl}
                </a>
              </p>
            </div>
          </div>

          {/* QR Code for Mobile Sharing */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-800 dark:text-white mb-2">📱 Mobile Share</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Scan this QR code to open the recipe on your phone
            </p>
            <div className="bg-white p-4 rounded-lg inline-block">
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs text-center">
                QR Code<br />Generator<br />Placeholder
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeShare; 