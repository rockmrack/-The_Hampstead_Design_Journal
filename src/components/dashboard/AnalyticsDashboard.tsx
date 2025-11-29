'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// Dashboard Types
// ============================================================================

interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface PageView {
  page: string;
  views: number;
  uniqueVisitors: number;
  avgDuration: number;
  bounceRate: number;
}

interface ArticlePerformance {
  title: string;
  slug: string;
  views: number;
  engagement: number;
  shares: number;
  readRate: number;
}

interface SearchQuery {
  query: string;
  count: number;
  resultClicks: number;
  noResults: boolean;
}

interface ConversionData {
  type: string;
  count: number;
  conversionRate: number;
}

// ============================================================================
// Dashboard Components
// ============================================================================

interface MetricCardProps {
  metric: DashboardMetric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-hampstead-charcoal/60',
  };
  
  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };
  
  return (
    <div className={cn(
      'bg-white rounded-lg border border-hampstead-grey/30 p-6 shadow-sm',
      className
    )}>
      <p className="text-sm text-hampstead-charcoal/60 mb-1">{metric.label}</p>
      <p className="text-3xl font-display text-hampstead-charcoal">{metric.value}</p>
      {metric.change !== undefined && (
        <p className={cn(
          'text-sm mt-2 flex items-center gap-1',
          trendColors[metric.trend || 'neutral']
        )}>
          <span>{trendIcons[metric.trend || 'neutral']}</span>
          <span>{Math.abs(metric.change)}%</span>
          <span className="text-hampstead-charcoal/40 ml-1">{metric.changeLabel || 'vs last period'}</span>
        </p>
      )}
    </div>
  );
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    format?: (value: T[keyof T]) => string;
  }[];
  title?: string;
  className?: string;
}

export function DataTable<T extends object>({ 
  data, 
  columns, 
  title,
  className 
}: DataTableProps<T>) {
  return (
    <div className={cn('bg-white rounded-lg border border-hampstead-grey/30 shadow-sm', className)}>
      {title && (
        <div className="px-6 py-4 border-b border-hampstead-grey/30">
          <h3 className="font-display text-lg text-hampstead-charcoal">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-hampstead-grey/30">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-hampstead-charcoal/60 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hampstead-grey/20">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-hampstead-grey/10 transition-colors">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-6 py-4 text-sm text-hampstead-charcoal"
                  >
                    {col.format 
                      ? col.format(row[col.key])
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ChartBarProps {
  value: number;
  max: number;
  label: string;
  sublabel?: string;
  className?: string;
}

export function ChartBar({ value, max, label, sublabel, className }: ChartBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="w-32 truncate text-sm text-hampstead-charcoal">{label}</div>
      <div className="flex-1 h-6 bg-hampstead-grey/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-hampstead-sage rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="w-20 text-right">
        <span className="text-sm font-medium text-hampstead-charcoal">{value}</span>
        {sublabel && (
          <span className="text-xs text-hampstead-charcoal/60 ml-1">{sublabel}</span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Analytics Dashboard
// ============================================================================

interface AnalyticsDashboardProps {
  className?: string;
}

export function AnalyticsDashboard({ className }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in production, fetch from analytics API
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [topArticles, setTopArticles] = useState<ArticlePerformance[]>([]);
  const [searchQueries, setSearchQueries] = useState<SearchQuery[]>([]);
  const [conversions, setConversions] = useState<ConversionData[]>([]);
  
  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Mock data based on time range
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const multiplier = timeRange === 'today' ? 1 : timeRange === 'week' ? 7 : 30;
      
      setMetrics([
        {
          label: 'Total Page Views',
          value: (12483 * multiplier).toLocaleString(),
          change: 12.5,
          trend: 'up',
        },
        {
          label: 'Unique Visitors',
          value: (4892 * multiplier).toLocaleString(),
          change: 8.3,
          trend: 'up',
        },
        {
          label: 'Avg. Session Duration',
          value: '4m 32s',
          change: -2.1,
          trend: 'down',
        },
        {
          label: 'Newsletter Signups',
          value: (127 * multiplier).toLocaleString(),
          change: 24.8,
          trend: 'up',
        },
      ]);
      
      setPageViews([
        { page: 'Home', views: 4521 * multiplier, uniqueVisitors: 2134, avgDuration: 45, bounceRate: 32 },
        { page: 'Articles', views: 3892 * multiplier, uniqueVisitors: 1876, avgDuration: 180, bounceRate: 18 },
        { page: 'Archive', views: 2134 * multiplier, uniqueVisitors: 987, avgDuration: 120, bounceRate: 25 },
        { page: 'About', views: 1245 * multiplier, uniqueVisitors: 654, avgDuration: 90, bounceRate: 45 },
        { page: 'Contact', views: 891 * multiplier, uniqueVisitors: 432, avgDuration: 60, bounceRate: 35 },
      ]);
      
      setTopArticles([
        { title: 'Arts and Crafts Renovation Guide', slug: 'arts-and-crafts', views: 2341, engagement: 78, shares: 145, readRate: 68 },
        { title: 'Camden Basement Planning Guide', slug: 'basement-planning', views: 1892, engagement: 82, shares: 112, readRate: 72 },
        { title: 'Herringbone Oak Flooring Guide', slug: 'oak-flooring', views: 1567, engagement: 75, shares: 89, readRate: 65 },
        { title: 'Smart Home Integration', slug: 'smart-home', views: 1234, engagement: 71, shares: 67, readRate: 58 },
        { title: 'Winter Maintenance Checklist', slug: 'winter-maintenance', views: 987, engagement: 69, shares: 45, readRate: 62 },
      ]);
      
      setSearchQueries([
        { query: 'basement extension', count: 234, resultClicks: 189, noResults: false },
        { query: 'period property renovation', count: 187, resultClicks: 156, noResults: false },
        { query: 'listed building consent', count: 156, resultClicks: 134, noResults: false },
        { query: 'hampstead conservation', count: 134, resultClicks: 112, noResults: false },
        { query: 'arts and crafts style', count: 112, resultClicks: 98, noResults: false },
      ]);
      
      setConversions([
        { type: 'Newsletter Signup', count: 127, conversionRate: 2.6 },
        { type: 'Contact Form', count: 45, conversionRate: 0.9 },
        { type: 'Valuation Request', count: 23, conversionRate: 0.5 },
        { type: 'Guide Download', count: 89, conversionRate: 1.8 },
      ]);
      
      setIsLoading(false);
    };
    
    loadData();
  }, [timeRange]);
  
  if (isLoading) {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-hampstead-grey/20 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-hampstead-grey/20 rounded-lg" />
          <div className="h-80 bg-hampstead-grey/20 rounded-lg" />
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn('space-y-8', className)}>
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-display text-hampstead-charcoal">Analytics Overview</h2>
        <div className="flex gap-2">
          {(['today', 'week', 'month'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                'px-4 py-2 text-sm rounded-lg transition-colors',
                timeRange === range
                  ? 'bg-hampstead-sage text-white'
                  : 'bg-hampstead-grey/20 text-hampstead-charcoal hover:bg-hampstead-grey/30'
              )}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-lg border border-hampstead-grey/30 p-6 shadow-sm">
          <h3 className="font-display text-lg text-hampstead-charcoal mb-6">Top Pages</h3>
          <div className="space-y-4">
            {pageViews.slice(0, 5).map((page, index) => (
              <ChartBar
                key={index}
                value={page.views}
                max={pageViews[0].views}
                label={page.page}
                sublabel="views"
              />
            ))}
          </div>
        </div>
        
        {/* Conversions */}
        <div className="bg-white rounded-lg border border-hampstead-grey/30 p-6 shadow-sm">
          <h3 className="font-display text-lg text-hampstead-charcoal mb-6">Conversions</h3>
          <div className="space-y-4">
            {conversions.map((conv, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-hampstead-grey/20 last:border-0">
                <span className="text-sm text-hampstead-charcoal">{conv.type}</span>
                <div className="text-right">
                  <span className="text-lg font-medium text-hampstead-charcoal">{conv.count}</span>
                  <span className="text-xs text-hampstead-charcoal/60 ml-2">({conv.conversionRate}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <DataTable
          title="Top Performing Articles"
          data={topArticles}
          columns={[
            { key: 'title', label: 'Article' },
            { key: 'views', label: 'Views', format: (v) => (v as number).toLocaleString() },
            { key: 'engagement', label: 'Engagement', format: (v) => `${v}%` },
          ]}
        />
        
        {/* Top Searches */}
        <DataTable
          title="Popular Search Queries"
          data={searchQueries}
          columns={[
            { key: 'query', label: 'Query' },
            { key: 'count', label: 'Searches', format: (v) => (v as number).toLocaleString() },
            { key: 'resultClicks', label: 'Clicks', format: (v) => (v as number).toLocaleString() },
          ]}
        />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
