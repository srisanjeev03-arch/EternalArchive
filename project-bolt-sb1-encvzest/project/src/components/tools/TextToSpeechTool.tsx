import React, { useState } from 'react';
import TextInput from './TextInput';
import ProcessButton from './ProcessButton';
import { Play, Pause, Download, Volume2 } from 'lucide-react';

const TextToSpeechTool: React.FC = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState('female');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate TTS generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple audio URL (in real implementation, this would be from TTS service)
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('TTS generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = () => {
    if (!audioUrl) return;
    
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    } else {
      // For demo purposes, use Web Speech API
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed;
      utterance.pitch = pitch;
      
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => 
        voice === 'female' ? v.name.includes('female') || v.name.includes('Female') : 
        v.name.includes('male') || v.name.includes('Male')
      ) || voices[0];
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `tts-audio-${Date.now()}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <TextInput
        label="Text to Convert"
        value={text}
        onChange={setText}
        placeholder="Enter the text you want to convert to speech..."
        rows={4}
        maxLength={1000}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Voice
          </label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Speed: {speed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pitch: {pitch}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      
      <ProcessButton
        onClick={handleGenerate}
        isProcessing={isGenerating}
        disabled={!text.trim()}
        label="Generate Speech"
        className="w-full"
      />
      
      {text && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Audio Player</span>
            <div className="flex space-x-2">
              <button
                onClick={handlePlay}
                disabled={!text.trim()}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              {audioUrl && (
                <button
                  onClick={handleDownload}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 text-center">
            <Volume2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isPlaying ? 'Playing...' : 'Click play to hear the generated speech'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechTool;