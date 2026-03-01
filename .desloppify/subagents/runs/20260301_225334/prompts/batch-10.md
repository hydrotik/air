You are a focused subagent reviewer for a single holistic investigation batch.

Repository root: /Users/donovanadams/Desktop/hydrotik
Blind packet: /Users/donovanadams/Desktop/hydrotik/.desloppify/review_packet_blind.json
Batch index: 10
Batch name: Full Codebase Sweep
Batch dimensions: cross_module_architecture, convention_outlier, error_consistency, abstraction_fitness, api_surface_coherence, authorization_consistency, ai_generated_debt, incomplete_migration, package_organization, high_level_elegance, mid_level_elegance, low_level_elegance, design_coherence
Batch rationale: thorough default: evaluate cross-cutting quality across all production files

Files assigned:
- .pi/extensions/ai-rum-collector/index.ts
- apps/hy-bff-fastify/src/server.ts
- apps/hy-component-preview/playwright.config.ts
- apps/hy-component-preview/src/App.css.ts
- apps/hy-component-preview/src/App.tsx
- apps/hy-component-preview/src/cards/AppearanceSettings.tsx
- apps/hy-component-preview/src/cards/ButtonGroupDemo.tsx
- apps/hy-component-preview/src/cards/ButtonGroupInputGroup.tsx
- apps/hy-component-preview/src/cards/ButtonGroupNested.tsx
- apps/hy-component-preview/src/cards/ButtonGroupPopover.tsx
- apps/hy-component-preview/src/cards/EmptyAvatarGroup.tsx
- apps/hy-component-preview/src/cards/EmptyInputGroup.tsx
- apps/hy-component-preview/src/cards/FieldCheckbox.tsx
- apps/hy-component-preview/src/cards/FieldDemo.tsx
- apps/hy-component-preview/src/cards/FieldHear.tsx
- apps/hy-component-preview/src/cards/FieldSlider.tsx
- apps/hy-component-preview/src/cards/InputGroupButton.tsx
- apps/hy-component-preview/src/cards/InputGroupDemo.tsx
- apps/hy-component-preview/src/cards/InputGroupTextarea.tsx
- apps/hy-component-preview/src/cards/ItemAvatar.tsx
- apps/hy-component-preview/src/cards/ItemDemo.tsx
- apps/hy-component-preview/src/cards/NotionPromptForm.tsx
- apps/hy-component-preview/src/cards/SpinnerBadge.tsx
- apps/hy-component-preview/src/cards/SpinnerEmpty.tsx
- apps/hy-component-preview/src/cards/index.ts
- apps/hy-component-preview/src/main.tsx
- apps/hy-component-preview/src/pages/DashboardPage.css.ts
- apps/hy-component-preview/src/pages/DashboardPage.tsx
- apps/hy-component-preview/src/pages/DataGridPage.css.ts
- apps/hy-component-preview/src/pages/DataGridPage.tsx
- apps/hy-component-preview/src/pages/EcommercePage.css.ts
- apps/hy-component-preview/src/pages/EcommercePage.tsx
- apps/hy-component-preview/src/pages/EditorialPage.css.ts
- apps/hy-component-preview/src/pages/EditorialPage.tsx
- apps/hy-component-preview/src/pages/HomePage.tsx
- apps/hy-component-preview/src/pages/InventoryPage.css.ts
- apps/hy-component-preview/src/pages/InventoryPage.tsx
- apps/hy-component-preview/src/pages/PluginPage.css.ts
- apps/hy-component-preview/src/pages/PluginPage.tsx
- apps/hy-component-preview/src/pages/SinkPage.css.ts
- apps/hy-component-preview/src/pages/SinkPage.tsx
- apps/hy-component-preview/src/pages/index.ts
- apps/hy-component-preview/vite.config.ts
- apps/hy-storybook/.storybook/main.ts
- apps/hy-storybook/.storybook/manager.ts
- apps/hy-storybook/.storybook/preview.tsx
- docs/reference/dashboard-03/components/analytics-date-picker.tsx
- docs/reference/dashboard-03/components/app-sidebar.tsx
- docs/reference/dashboard-03/components/chart-revenue.tsx
- docs/reference/dashboard-03/components/chart-visitors.tsx
- docs/reference/dashboard-03/components/mode-toggle.tsx
- docs/reference/dashboard-03/components/nav-main.tsx
- docs/reference/dashboard-03/components/nav-secondary.tsx
- docs/reference/dashboard-03/components/nav-user.tsx
- docs/reference/dashboard-03/components/products-table.tsx
- docs/reference/dashboard-03/components/search-form.tsx
- docs/reference/dashboard-03/components/site-header.tsx
- docs/reference/dashboard-03/customers/page.tsx
- docs/reference/dashboard-03/layout.tsx
- docs/reference/dashboard-03/page.tsx
- docs/reference/dashboard-03/settings/page.tsx
- docs/reference/sink/component-wrapper.tsx
- packages/hy-ai-rum/src/collector/index.ts
- packages/hy-ai-rum/src/dashboard/components/EventFeed.tsx
- packages/hy-ai-rum/src/dashboard/components/KpiCard.tsx
- packages/hy-ai-rum/src/dashboard/components/SessionSelector.tsx
- packages/hy-ai-rum/src/dashboard/dashboard.css.ts
- packages/hy-ai-rum/src/dashboard/hooks/useTelemetry.ts
- packages/hy-ai-rum/src/dashboard/main.tsx
- packages/hy-ai-rum/src/dashboard/pages/DashboardPage.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/ActivitySparklines.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/ContextTreemap.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/ContextUtilizationChart.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/CostPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/DriftPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/LatencyPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/McpStatsPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/PromptPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/ProviderRegistryPanel.tsx
- packages/hy-ai-rum/src/dashboard/visualizations/QualityPanel.tsx

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
3. Return 0-13 high-quality findings for this batch (empty array allowed).
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
9a. For package_organization, ground scoring in objective structure signals from `holistic_context.structure` (root_files fan_in/fan_out roles, directory_profiles, coupling_matrix). Prefer thresholded evidence (for example: fan_in < 5 for root stragglers, import-affinity > 60%, directories > 10 files with mixed concerns).
9b. Suggestions must include a staged reorg plan (target folders, move order, and import-update/validation commands).
11. Ignore prior chat context and any target-threshold assumptions.
12. Do not edit repository files.
13. Return ONLY valid JSON, no markdown fences.

Scope enums:
- impact_scope: "local" | "module" | "subsystem" | "codebase"
- fix_scope: "single_edit" | "multi_file_refactor" | "architectural_change"

Output schema:
{
  "batch": "Full Codebase Sweep",
  "batch_index": 10,
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
