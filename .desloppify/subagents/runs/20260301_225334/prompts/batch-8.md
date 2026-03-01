You are a focused subagent reviewer for a single holistic investigation batch.

Repository root: /Users/donovanadams/Desktop/hydrotik
Blind packet: /Users/donovanadams/Desktop/hydrotik/.desloppify/review_packet_blind.json
Batch index: 8
Batch name: Design coherence — Mechanical Concern Signals
Batch dimensions: design_coherence
Batch rationale: mechanical detectors identified structural patterns needing judgment; concern types: design_concern, duplication_design, mixed_responsibilities, systemic_pattern

Files assigned:
- apps/hy-bff-fastify/src/server.ts
- apps/hy-component-preview/src/pages/EcommercePage.tsx
- apps/hy-component-preview/src/pages/EditorialPage.tsx
- apps/hy-component-preview/src/pages/PluginPage.tsx
- apps/hy-component-preview/src/pages/SinkPage.tsx
- docs/reference/dashboard-03/settings/page.tsx
- packages/hy-ai-rum/src/collector/index.ts
- packages/hy-ai-rum/src/dashboard/hooks/useTelemetry.ts
- packages/hy-ai-rum/src/dashboard/pages/DashboardPage.tsx
- packages/hy-ai-rum/src/db/schema.ts
- packages/hy-ai-rum/src/sdk/client.ts
- packages/hy-ai-rum/src/server/cli.ts
- packages/hy-ai-rum/src/server/start.ts
- packages/hy-design-mcp/src/index.ts
- packages/hy-design-system/src/components/DataGrid/core.ts
- scripts/visual-capture.ts
- apps/hy-component-preview/src/pages/DashboardPage.css.ts
- packages/hy-ai-rum/src/dashboard/components/EventFeed.tsx
- packages/hy-ai-rum/src/dashboard/components/SessionSelector.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/ContextTreemap.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/ContextUtilizationChart.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/CostPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/DriftPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/LatencyPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/McpStatsPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/PromptPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/QualityPanel.tsx
- packages/hy-design-system/src/components/AddToCartButton/AddToCartButton.css.ts
- packages/hy-design-system/src/components/Button/Button.css.ts
- packages/hy-design-system/src/components/Checkbox/Checkbox.css.ts
- packages/hy-design-system/src/components/Command/Command.css.ts
- packages/hy-design-system/src/components/ContextMenu/ContextMenu.css.ts
- packages/hy-design-system/src/components/ContextMenu/ContextMenu.tsx
- packages/hy-design-system/src/components/Dialog/Dialog.tsx
- packages/hy-design-system/src/components/DropdownMenu/DropdownMenu.css.ts
- packages/hy-design-system/src/components/Input/Input.css.ts
- packages/hy-design-system/src/components/Menubar/Menubar.css.ts
- packages/hy-design-system/src/components/Select/Select.css.ts
- packages/hy-design-system/src/components/Sheet/Sheet.css.ts
- packages/hy-tokens/src/dark.css.ts
- .pi/extensions/ai-rum-collector/index.ts
- apps/hy-component-preview/src/pages/DashboardPage.tsx
- apps/hy-component-preview/src/pages/InventoryPage.tsx
- packages/hy-ai-rum/src/db/queries.ts

Task requirements:
1. Read the blind packet and follow `system_prompt` constraints exactly.
1a. If previously flagged issues are listed above, use them as context for your review.
    Verify whether each still applies to the current code. Do not re-report fixed or
    wontfix issues. Use them as starting points to look deeper — inspect adjacent code
    and related modules for defects the prior review may have missed.
1c. Think structurally: when you spot multiple individual issues that share a common
    root cause (missing abstraction, duplicated pattern, inconsistent convention),
    explain the deeper structural issue in the finding, not just the surface symptom.
    If the pattern is significant enough, report the structural issue as its own finding
    with appropriate fix_scope ('multi_file_refactor' or 'architectural_change') and
    use `root_cause_cluster` to connect related symptom findings together.
2. Evaluate ONLY listed files and ONLY listed dimensions for this batch.
3. Return 0-10 high-quality findings for this batch (empty array allowed).
3a. Do not suppress real defects to keep scores high; report every material issue you can support with evidence.
3b. Do not default to 100. Reserve 100 for genuinely exemplary evidence in this batch.
4. Score/finding consistency is required: broader or more severe findings MUST lower dimension scores.
4a. Any dimension scored below 85.0 MUST include explicit feedback: add at least one finding with the same `dimension` and a non-empty actionable `suggestion`.
5. Every finding must include `related_files` with at least 2 files when possible.
6. Every finding must include `dimension`, `identifier`, `summary`, `evidence`, `suggestion`, and `confidence`.
7. Every finding must include `impact_scope` and `fix_scope`.
8. Every scored dimension MUST include dimension_notes with concrete evidence.
9. If a dimension score is >85.0, include `issues_preventing_higher_score` in dimension_notes.
10. Use exactly one decimal place for every assessment and abstraction sub-axis score.
11. Ignore prior chat context and any target-threshold assumptions.
12. Do not edit repository files.
13. Return ONLY valid JSON, no markdown fences.

Scope enums:
- impact_scope: "local" | "module" | "subsystem" | "codebase"
- fix_scope: "single_edit" | "multi_file_refactor" | "architectural_change"

Output schema:
{
  "batch": "Design coherence — Mechanical Concern Signals",
  "batch_index": 8,
  "assessments": {"<dimension>": <0-100 with one decimal place>},
  "dimension_notes": {
    "<dimension>": {
      "evidence": ["specific code observations"],
      "impact_scope": "local|module|subsystem|codebase",
      "fix_scope": "single_edit|multi_file_refactor|architectural_change",
      "confidence": "high|medium|low",
      "issues_preventing_higher_score": "required when score >85.0",
      "sub_axes": {"abstraction_leverage": 0-100 with one decimal place, "indirection_cost": 0-100 with one decimal place, "interface_honesty": 0-100 with one decimal place}  // required for abstraction_fitness when evidence supports it
    }
  },
  "findings": [{
    "dimension": "<dimension>",
    "identifier": "short_id",
    "summary": "one-line defect summary",
    "related_files": ["relative/path.py"],
    "evidence": ["specific code observation"],
    "suggestion": "concrete fix recommendation",
    "confidence": "high|medium|low",
    "impact_scope": "local|module|subsystem|codebase",
    "fix_scope": "single_edit|multi_file_refactor|architectural_change",
    "root_cause_cluster": "optional_cluster_name_when_supported_by_history"
  }],
  "retrospective": {
    "root_causes": ["optional: concise root-cause hypotheses"],
    "likely_symptoms": ["optional: identifiers that look symptom-level"],
    "possible_false_positives": ["optional: prior concept keys likely mis-scoped"]
  }
}
