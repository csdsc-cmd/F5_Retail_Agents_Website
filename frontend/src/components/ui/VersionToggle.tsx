import { useVersion } from '../../contexts/VersionContext';
import { Sparkles, Layout } from 'lucide-react';

export function VersionToggle() {
  const { version, toggleVersion } = useVersion();
  const isModern = version === 'modern';

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleVersion}
        className={`group flex items-center gap-2 px-4 py-2 backdrop-blur-md border rounded-full shadow-lg transition-all duration-300 ${
          isModern
            ? 'bg-white/10 border-white/20 hover:bg-white/20'
            : 'bg-slate-900/90 border-slate-700 hover:bg-slate-800'
        }`}
        aria-label={`Switch to ${isModern ? 'traditional' : 'modern'} version`}
      >
        {/* Toggle switch */}
        <div className={`relative w-12 h-6 rounded-full p-0.5 transition-colors duration-300 ${
          isModern ? 'bg-slate-700' : 'bg-slate-600'
        }`}>
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
              isModern ? 'left-[calc(100%-22px)]' : 'left-0.5'
            }`}
          >
            {isModern ? (
              <Sparkles className="w-3 h-3 text-purple-600" />
            ) : (
              <Layout className="w-3 h-3 text-slate-600" />
            )}
          </div>
        </div>

        {/* Label */}
        <span className="text-sm font-medium text-white min-w-[70px]">
          {isModern ? 'Modern' : 'Traditional'}
        </span>
      </button>
    </div>
  );
}

export default VersionToggle;
