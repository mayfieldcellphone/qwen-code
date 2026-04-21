/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * useBackgroundAgentView — subscribes to the background task registry's
 * status-change callback and maintains a reactive snapshot of every
 * `BackgroundAgentEntry`.
 *
 * Intentionally ignores activity updates (appendActivity). Tool-call
 * traffic from a running background agent would otherwise churn the
 * Footer pill and the AppContainer every few hundred ms. The detail
 * dialog subscribes to the activity callback directly when it needs
 * live Progress updates.
 */

import { useState, useEffect } from 'react';
import {
  type BackgroundAgentEntry,
  type Config,
} from '@qwen-code/qwen-code-core';

export interface UseBackgroundAgentViewResult {
  entries: readonly BackgroundAgentEntry[];
}

export function useBackgroundAgentView(
  config: Config | null,
): UseBackgroundAgentViewResult {
  const [entries, setEntries] = useState<BackgroundAgentEntry[]>([]);

  useEffect(() => {
    if (!config) return;
    const registry = config.getBackgroundTaskRegistry();

    setEntries(sortEntries(registry.getAll()));

    // Every statusChange callback rebuilds the entries array. The registry
    // mutates entries in place (e.g. finalizeCancelled attaches final stats
    // while keeping status='cancelled'), so a dedupe keyed on status alone
    // would drop those follow-up updates and leave open detail views stale.
    // Status-change events are infrequent enough (register/complete/fail/
    // cancel/finalize) that skipping dedupe costs nothing.
    const onStatusChange = () => {
      setEntries(sortEntries(registry.getAll()));
    };

    registry.setStatusChangeCallback(onStatusChange);

    return () => {
      registry.setStatusChangeCallback(undefined);
    };
  }, [config]);

  return { entries };
}

function sortEntries(entries: BackgroundAgentEntry[]): BackgroundAgentEntry[] {
  return [...entries].sort((a, b) => a.startTime - b.startTime);
}
