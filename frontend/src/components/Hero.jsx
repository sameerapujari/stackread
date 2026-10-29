import { useState, useRef } from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import Logo from './Logo';
import styles from '../styles/hero.module.css';

export default function Hero({ onAnalyze, loading }) {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className={styles.heroContainer}>
      {/* Logo animation (spinning stack) */}
      <div className={styles.logoWrapper}>
        <div className={styles.logoStack}>
          <Logo style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* Main heading */}
      <h1 className={styles.heading}>
        Explore GitHub Repositories
      </h1>

      {/* Subheading */}
      <p className={styles.subheading}>
        Understand any codebase instantly with AI
      </p>

      {/* Search Input in Hero */}
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div
          className={`${styles.heroSearchContainer} ${
            isFocused ? styles.heroSearchContainerFocused : ''
          }`}
        >
          <div className={styles.heroSearchIcon}>
            <Search size={20} />
          </div>

          <input
            type="text"
            placeholder="github.com/username/repo or facebook/react"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
            className={styles.heroInput}
          />

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className={styles.analyzeButton}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
