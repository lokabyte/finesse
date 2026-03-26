---
name: data-visualization
description: "Data display patterns — chart type selection, number formatting, table vs. chart decisions, and dashboard composition guidelines."
---
# Data Visualization Patterns

Reference guide for displaying data in BrowserStack product UIs. Used by commands like `/grid` (dashboard layouts), `/audit` (checking data display compliance), and `/critique` (evaluating data readability).

## Chart Type Selection

| Data Shape | Recommended | Avoid |
|-----------|-------------|-------|
| Single metric | Stat card / big number | Pie chart for one value |
| Trend over time | Line chart | Bar chart (unless discrete intervals) |
| Comparison (few items) | Horizontal bar | Pie chart |
| Comparison (many items) | Table with visual bars | Any chart with 10+ segments |
| Part of whole | Stacked bar or donut | 3D pie chart (never) |
| Distribution | Histogram or box plot | Line chart |
| Correlation | Scatter plot | Dual-axis chart (misleading) |
| Pass/fail ratio | Stacked bar or stat cards | Pie chart |
| Build frequency | Bar chart (discrete) | Line chart (implies continuous) |

## Number Formatting

- **Counts**: No decimals. Use commas for thousands: `1,234` not `1234`
- **Percentages**: One decimal max: `94.2%` not `94.1847%`. Show `100%` not `100.0%`
- **Durations**: Human-readable: `2m 34s` not `154s` or `154000ms`
- **Large numbers**: Abbreviate at 1,000+: `1.2k`, `3.4M`. Full number in tooltip.
- **Zero**: Show `0` not `—` or blank. Zero is data, not absence.
- **Null/missing**: Show `—` with tooltip "No data available"

## Table vs. Chart Decision

Use a **table** when:
- Users need to look up specific values
- Data has many attributes per row (5+ columns)
- Users need to sort, filter, or search
- Exact numbers matter more than trends

Use a **chart** when:
- The story is about trends, patterns, or comparisons
- Users need to grasp the big picture quickly
- Spatial relationships matter (timeline, ranking)
- 3 or fewer dimensions

## Dashboard Composition

- **Hero metric** at top — the single most important number, large and prominent
- **Trend line** below hero — shows direction (improving/declining)
- **Breakdown grid** — 2-4 supporting metrics in cards
- **Detail table** at bottom — sortable, filterable, the full data
- **Max 7 widgets** per dashboard view — cognitive load limit
- **Consistent time range** — all widgets should share the same time window unless explicitly comparing periods

## BrowserStack-Specific Patterns

- **Test results**: Always show pass/fail/skip counts as stat cards with color coding (green/red/gray)
- **Flaky tests**: Use trend sparklines to show stability over time, not just current flaky count
- **Build history**: Horizontal timeline with status color per build, most recent on the right
- **Device coverage**: Matrix/grid showing tested vs. untested OS/browser combinations
- **Session timelines**: Horizontal gantt-style bars showing test phases (setup, execution, teardown)
