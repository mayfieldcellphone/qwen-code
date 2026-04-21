/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { Box, Text } from 'ink';
import { useBackgroundAgentViewState } from '../../contexts/BackgroundAgentViewContext.js';
import { theme } from '../../semantic-colors.js';
import type { BackgroundAgentEntry } from '@qwen-code/qwen-code-core';

/** Single source of truth for pluralising the pill label. */
export function getPillLabel(running: readonly BackgroundAgentEntry[]): string {
  const n = running.length;
  if (n === 0) return '';
  return n === 1 ? '1 local agent' : `${n} local agents`;
}

export const BackgroundTasksPill: React.FC = () => {
  const { entries } = useBackgroundAgentViewState();
  const running = entries.filter((e) => e.status === 'running');
  if (running.length === 0) return null;

  const label = getPillLabel(running);

  return (
    <Box flexDirection="row">
      <Text color={theme.text.secondary}> · </Text>
      <Text color={theme.text.accent} bold>
        {label}
      </Text>
      <Text color={theme.text.secondary}> · ↓ to view</Text>
    </Box>
  );
};
