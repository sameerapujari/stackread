import RepositoryCard from './RepositoryCard';
import PerformanceMetricsCard from './PerformanceMetricsCard';
import AiSummaryCard from './AiSummaryCard';
import ImportantDirectories from './ImportantDirectories';
import ReadingRoadmap from './ReadingRoadmap';
import ContributionGuide from './ContributionGuide';
import RequestFlow from './RequestFlow';

export default function ResultsDashboard({ result, metrics }) {
  if (!result?.success) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2">
      {/* 1. Repository Overview Card */}
      <RepositoryCard
        metadata={result.metadata}
        languages={result.languages}
      />

      {/* 2. Performance Metrics & Redis Caching Insights */}
      <PerformanceMetricsCard
        metrics={metrics}
        result={result}
      />

      {/* 3. Main AI & Architecture Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
        <div className="space-y-8">
          <AiSummaryCard analysis={result.analysis} />
          <ReadingRoadmap suggestedReadingOrder={result.analysis?.suggestedReadingOrder} />
        </div>

        <div className="space-y-8">
          <ImportantDirectories
            directories={result.analysis?.importantDirectories}
            files={result.analysis?.importantFiles}
          />
          <ContributionGuide
            contributionTips={result.analysis?.contributionTips}
            conceptsToLearn={result.analysis?.conceptsToLearn}
            whereToStart={result.analysis?.whereToStart}
          />
        </div>
      </div>

      {/* 4. Request Flow Diagram */}
      <RequestFlow />
    </div>
  );
}