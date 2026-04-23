/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useCallback } from 'react';
import { Text } from 'ink';
import {
  useBackgroundAgentViewState,
  useBackgroundAgentViewActions,
} from '../../contexts/BackgroundAgentViewContext.js';
import { useKeypress, type Key } from '../../hooks/useKeypress.js';
import { theme } from '../../semantic-colors.js';
import type { BackgroundAgentEntry } from '@qwen-code/qwen-code-core';

/** Single source of truth for pluralising the pill label. */
export function getPillLabel(running: readonly BackgroundAgentEntry[]): string {
  const n = running.length;
  return n === 1 ? '1 local agent' : `${n} local agents`;
}

export const BackgroundTasksPill: React.FC = () => {
  const { entries, pillFocused } = useBackgroundAgentViewState();
  const { openDialog, setPillFocused } = useBackgroundAgentViewActions();
  const running = entries.filter((e) => e.status === 'running');

  const onKeypress = useCallback(
    (key: Key) => {
      if (key.name === 'return') {
        openDialog();
      } else if (key.name === 'up' || key.name === 'escape') {
        setPillFocused(false);
      } else if (
        key.sequence &&
        key.sequence.length === 1 &&
        !key.ctrl &&
        !key.meta
      ) {
        setPillFocused(false);
      }
    },
    [openDialog, setPillFocused],
  );

  useKeypress(onKeypress, { isActive: pillFocused });

  if (running.length === 0) return null;

  const label = getPillLabel(running);

  return (
    <>
      <Text color={theme.text.secondary}> · </Text>
      <Text inverse={pillFocused}>{label}</Text>
    </>
  );
};
