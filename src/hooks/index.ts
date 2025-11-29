// ============================================================================
// Hooks Index - Export all hooks from a central location
// ============================================================================

// Analytics Hooks
export {
  usePageView,
  useTrackEvent,
  useTrackClick,
  useScrollDepth,
  useTimeOnPage,
  useContentInteraction,
  useFormAnalytics,
  useConversion,
  useSearchTracking,
  usePerformanceTracking,
  useVisibility,
} from './useAnalytics';

// Search Hooks
export {
  useSearch,
  useSearchIndex,
  useSearchFilters,
  useSearchWithFilters,
  useSearchHighlight,
  useSearchHistory,
  useSearchKeyboard,
} from './useSearch';

// Form Hooks
export {
  useForm,
  useFieldArray,
  useFormPersist,
  useMultiStepForm,
} from './useForm';

// Utility Hooks
export {
  useLocalStorage,
  useDebounce,
  useThrottle,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  useClickOutside,
  useKeyPress,
  useScrollPosition,
  useIntersectionObserver,
  useCopyToClipboard,
  useToggle,
  useWindowSize,
  usePrevious,
  useIsClient,
  useAsyncEffect,
  useInterval,
  useTimeout,
  useOnMount,
  useOnUnmount,
} from './useUtilities';

// Type exports
export type { FieldState, FormConfig } from './useForm';
