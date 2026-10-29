import { useState, useRef, useEffect } from 'react';
import { Search, Settings, Loader2 } from 'lucide-react';
import Logo from './Logo';
import styles from '../styles/navbar.module.css';

export default function Navbar({ onAnalyze, loading, onReset }) {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <header className={styles.navbarContainer}>
      {/* LEFT: Custom Logo Area */}
      <button
        onClick={onReset}
        className={styles.logoArea}
        title="Reset & Go Home"
      >
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <span className={styles.brandText}>Stackread</span>
      </button>

      {/* CENTER: Search Bar (THE HERO) */}
      <form onSubmit={handleSubmit} className="flex-1 flex justify-center max-w-[700px] mx-4">
        <div
          className={`${styles.searchContainer} ${
            isFocused ? styles.searchContainerFocused : ''
          }`}
        >
          <div className={styles.searchIcon}>
            {loading ? (
              <Loader2 size={18} className="animate-spin text-purple-400" />
            ) : (
              <Search size={18} />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="github.com/username/repo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
            className={styles.searchInput}
          />

          <div className={styles.keyboardShortcut}>
            <span className={styles.keyboardKey}>⌘K</span>
          </div>
        </div>
      </form>

      {/* RIGHT: Minimal Actions */}
      <div className={styles.actionsArea}>
        <button
          type="button"
          className={styles.settingsButton}
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={20} className={styles.settingsIcon} />
        </button>
      </div>
    </header>
  );
}
