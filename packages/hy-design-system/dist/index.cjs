Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) {
				__defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
		}
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react = require("react");
react = __toESM(react);
let _radix_ui_react_accordion = require("@radix-ui/react-accordion");
_radix_ui_react_accordion = __toESM(_radix_ui_react_accordion);
let lucide_react = require("lucide-react");
lucide_react = __toESM(lucide_react);
let _vanilla_extract_css = require("@vanilla-extract/css");
let _hydrotik_tokens = require("@hydrotik/tokens");
let react_jsx_runtime = require("react/jsx-runtime");
let _vanilla_extract_recipes = require("@vanilla-extract/recipes");
let _radix_ui_react_alert_dialog = require("@radix-ui/react-alert-dialog");
_radix_ui_react_alert_dialog = __toESM(_radix_ui_react_alert_dialog);
let _radix_ui_react_aspect_ratio = require("@radix-ui/react-aspect-ratio");
_radix_ui_react_aspect_ratio = __toESM(_radix_ui_react_aspect_ratio);
let _radix_ui_react_avatar = require("@radix-ui/react-avatar");
_radix_ui_react_avatar = __toESM(_radix_ui_react_avatar);
let _radix_ui_react_slot = require("@radix-ui/react-slot");
let _radix_ui_react_checkbox = require("@radix-ui/react-checkbox");
_radix_ui_react_checkbox = __toESM(_radix_ui_react_checkbox);
let _radix_ui_react_collapsible = require("@radix-ui/react-collapsible");
_radix_ui_react_collapsible = __toESM(_radix_ui_react_collapsible);
let _radix_ui_react_context_menu = require("@radix-ui/react-context-menu");
_radix_ui_react_context_menu = __toESM(_radix_ui_react_context_menu);
let _radix_ui_react_dialog = require("@radix-ui/react-dialog");
_radix_ui_react_dialog = __toESM(_radix_ui_react_dialog);
let _radix_ui_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
_radix_ui_react_dropdown_menu = __toESM(_radix_ui_react_dropdown_menu);
let _radix_ui_react_hover_card = require("@radix-ui/react-hover-card");
_radix_ui_react_hover_card = __toESM(_radix_ui_react_hover_card);
let _radix_ui_react_label = require("@radix-ui/react-label");
_radix_ui_react_label = __toESM(_radix_ui_react_label);
let _radix_ui_react_menubar = require("@radix-ui/react-menubar");
_radix_ui_react_menubar = __toESM(_radix_ui_react_menubar);
let _radix_ui_react_navigation_menu = require("@radix-ui/react-navigation-menu");
_radix_ui_react_navigation_menu = __toESM(_radix_ui_react_navigation_menu);
let _radix_ui_react_popover = require("@radix-ui/react-popover");
_radix_ui_react_popover = __toESM(_radix_ui_react_popover);
let _radix_ui_react_progress = require("@radix-ui/react-progress");
_radix_ui_react_progress = __toESM(_radix_ui_react_progress);
let _radix_ui_react_radio_group = require("@radix-ui/react-radio-group");
_radix_ui_react_radio_group = __toESM(_radix_ui_react_radio_group);
let _radix_ui_react_scroll_area = require("@radix-ui/react-scroll-area");
_radix_ui_react_scroll_area = __toESM(_radix_ui_react_scroll_area);
let _radix_ui_react_select = require("@radix-ui/react-select");
_radix_ui_react_select = __toESM(_radix_ui_react_select);
let _radix_ui_react_separator = require("@radix-ui/react-separator");
_radix_ui_react_separator = __toESM(_radix_ui_react_separator);
let _radix_ui_react_slider = require("@radix-ui/react-slider");
_radix_ui_react_slider = __toESM(_radix_ui_react_slider);
let _radix_ui_react_switch = require("@radix-ui/react-switch");
_radix_ui_react_switch = __toESM(_radix_ui_react_switch);
let _radix_ui_react_tabs = require("@radix-ui/react-tabs");
_radix_ui_react_tabs = __toESM(_radix_ui_react_tabs);
let _radix_ui_react_toast = require("@radix-ui/react-toast");
_radix_ui_react_toast = __toESM(_radix_ui_react_toast);
let _radix_ui_react_toggle = require("@radix-ui/react-toggle");
_radix_ui_react_toggle = __toESM(_radix_ui_react_toggle);
let _radix_ui_react_toggle_group = require("@radix-ui/react-toggle-group");
_radix_ui_react_toggle_group = __toESM(_radix_ui_react_toggle_group);
let _radix_ui_react_tooltip = require("@radix-ui/react-tooltip");
_radix_ui_react_tooltip = __toESM(_radix_ui_react_tooltip);

//#region src/components/Accordion/Accordion.css.ts
const slideDown = (0, _vanilla_extract_css.keyframes)({
	from: { height: "0" },
	to: { height: "var(--radix-accordion-content-height)" }
});
const slideUp = (0, _vanilla_extract_css.keyframes)({
	from: { height: "var(--radix-accordion-content-height)" },
	to: { height: "0" }
});
/**
* Accordion — shadcn v4 aligned.
* No wrapping border container — items separated by bottom border.
*/
const accordionRoot = (0, _vanilla_extract_css.style)({});
const accordionItem = (0, _vanilla_extract_css.style)({
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	selectors: { "&:last-child": { borderBottom: "none" } }
});
const accordionTrigger = (0, _vanilla_extract_css.style)({
	display: "flex",
	flex: 1,
	alignItems: "flex-start",
	justifyContent: "space-between",
	gap: _hydrotik_tokens.vars.space["4"],
	width: "100%",
	padding: `${_hydrotik_tokens.vars.space["4"]} 0`,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	borderRadius: _hydrotik_tokens.vars.radii.md,
	cursor: "pointer",
	textAlign: "left",
	outline: "none",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { textDecoration: "underline" },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px",
			boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
			pointerEvents: "none"
		}
	}
});
const accordionChevron = (0, _vanilla_extract_css.style)({
	transition: `transform ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
	flexShrink: 0,
	color: _hydrotik_tokens.vars.color.textMuted,
	marginTop: "2px",
	width: "16px",
	height: "16px",
	pointerEvents: "none"
});
(0, _vanilla_extract_css.globalStyle)(`${accordionTrigger}[data-state="open"] ${accordionChevron}`, { transform: "rotate(180deg)" });
const accordionContent = (0, _vanilla_extract_css.style)({
	overflow: "hidden",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	selectors: {
		"&[data-state=\"open\"]": { animation: `${slideDown} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` },
		"&[data-state=\"closed\"]": { animation: `${slideUp} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` }
	}
});
const accordionContentInner = (0, _vanilla_extract_css.style)({
	paddingTop: 0,
	paddingBottom: _hydrotik_tokens.vars.space["4"]
});

//#endregion
//#region src/components/Accordion/Accordion.tsx
const Accordion = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Root, {
	ref,
	className: [accordionRoot, className].filter(Boolean).join(" "),
	...props
}));
Accordion.displayName = "Accordion";
const AccordionItem = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Item, {
	ref,
	className: [accordionItem, className].filter(Boolean).join(" "),
	...props
}));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Header, {
	style: { display: "flex" },
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_accordion.Trigger, {
		ref,
		className: [accordionTrigger, className].filter(Boolean).join(" "),
		...props,
		children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
			className: accordionChevron,
			"aria-hidden": true
		})]
	})
}));
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Content, {
	ref,
	className: [accordionContent, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: accordionContentInner,
		children
	})
}));
AccordionContent.displayName = "AccordionContent";

//#endregion
//#region src/components/Alert/Alert.css.ts
/**
* Alert — shadcn v4 aligned.
* Grid layout: when an SVG icon is present as direct child, the icon gets
* column 1 (16px wide) and the text gets column 2. Without an icon, column 1
* collapses to 0.
*/
const alertRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		position: "relative",
		width: "100%",
		borderRadius: _hydrotik_tokens.vars.radii.lg,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		padding: `${_hydrotik_tokens.vars.space["3"]} ${_hydrotik_tokens.vars.space["4"]}`,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
		display: "grid",
		gridTemplateColumns: "0 1fr",
		gap: `${_hydrotik_tokens.vars.space["0_5"]} 0`,
		alignItems: "start"
	},
	variants: { variant: {
		default: {
			backgroundColor: _hydrotik_tokens.vars.color.surface,
			color: _hydrotik_tokens.vars.color.text
		},
		destructive: {
			backgroundColor: _hydrotik_tokens.vars.color.surface,
			color: _hydrotik_tokens.vars.color.destructive
		}
	} },
	defaultVariants: { variant: "default" }
});
/**
* When the alert has a direct SVG child (icon), expand the grid to fit it.
* We use a CSS class that the Alert component applies conditionally when
* an icon prop is provided.
*/
const alertWithIcon = (0, _vanilla_extract_css.style)({
	gridTemplateColumns: `${_hydrotik_tokens.vars.space["4"]} 1fr`,
	columnGap: _hydrotik_tokens.vars.space["3"]
});
const alertIcon = (0, _vanilla_extract_css.style)({
	gridColumn: "1",
	gridRow: "1 / -1",
	width: _hydrotik_tokens.vars.space["4"],
	height: _hydrotik_tokens.vars.space["4"],
	marginTop: "2px",
	flexShrink: 0,
	color: "currentColor"
});
const alertTitle = (0, _vanilla_extract_css.style)({
	gridColumn: "2",
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.tight,
	minHeight: _hydrotik_tokens.vars.space["4"]
});
const alertDescription = (0, _vanilla_extract_css.style)({
	gridColumn: "2",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	selectors: { [`${alertRecipe.classNames.variants.variant.destructive} &`]: { color: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.destructive} 90%, transparent)` } }
});

//#endregion
//#region src/components/Alert/Alert.tsx
const Alert = react.default.forwardRef(({ variant = "default", icon, className, children, ...props }, ref) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		role: "alert",
		className: [
			alertRecipe({ variant }),
			icon ? alertWithIcon : "",
			className
		].filter(Boolean).join(" "),
		...props,
		children: [icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: alertIcon,
			children: icon
		}), children]
	});
});
Alert.displayName = "Alert";
const AlertTitle = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h5", {
	ref,
	className: [alertTitle, className].filter(Boolean).join(" "),
	...props
}));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [alertDescription, className].filter(Boolean).join(" "),
	...props
}));
AlertDescription.displayName = "AlertDescription";

//#endregion
//#region src/styles/overlay.css.ts
/**
* Shared overlay/modal styles used by Dialog, AlertDialog, and Sheet.
* Extracted to reduce boilerplate duplication across modal components.
*/
const overlayShow$1 = (0, _vanilla_extract_css.keyframes)({
	from: { opacity: "0" },
	to: { opacity: "1" }
});
const contentShow = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "translate(-50%, -48%) scale(0.95)"
	},
	to: {
		opacity: "1",
		transform: "translate(-50%, -50%) scale(1)"
	}
});
/** Standard modal overlay — rgba(0,0,0,0.5) per shadcn convention */
const baseOverlay = (0, _vanilla_extract_css.style)({
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	position: "fixed",
	inset: 0,
	zIndex: _hydrotik_tokens.vars.zIndex.overlay,
	animation: `${overlayShow$1} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
});
/** Standard centered modal content container */
const baseModalContent = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.background,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90vw",
	maxWidth: "32rem",
	maxHeight: "85vh",
	padding: _hydrotik_tokens.vars.space["6"],
	zIndex: _hydrotik_tokens.vars.zIndex.modal,
	display: "grid",
	gap: _hydrotik_tokens.vars.space["4"],
	animation: `${contentShow} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
	outline: "none"
});
/** Shared modal header layout */
const baseModalHeader = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space["2"]
});
/** Shared responsive modal footer */
const baseModalFooter = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column-reverse",
	gap: _hydrotik_tokens.vars.space["2"],
	"@media": { "screen and (min-width: 640px)": {
		flexDirection: "row",
		justifyContent: "flex-end"
	} }
});
/** Shared modal title */
const baseModalTitle = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.lg,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight
});
/** Shared modal description */
const baseModalDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed
});

//#endregion
//#region src/components/AlertDialog/AlertDialog.css.ts
/**
* AlertDialog — shadcn v4 aligned.
* Uses shared overlay/modal styles. Same as Dialog but without close button.
*/
const alertDialogOverlay = baseOverlay;
const alertDialogContent = baseModalContent;
const alertDialogHeader = baseModalHeader;
const alertDialogFooter = baseModalFooter;
const alertDialogTitle = baseModalTitle;
const alertDialogDescription = baseModalDescription;

//#endregion
//#region src/components/AlertDialog/AlertDialog.tsx
const AlertDialog = _radix_ui_react_alert_dialog.Root;
const AlertDialogTrigger = _radix_ui_react_alert_dialog.Trigger;
const AlertDialogPortal = _radix_ui_react_alert_dialog.Portal;
const AlertDialogAction = _radix_ui_react_alert_dialog.Action;
const AlertDialogCancel = _radix_ui_react_alert_dialog.Cancel;
const AlertDialogOverlay = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_alert_dialog.Overlay, {
	ref,
	className: [alertDialogOverlay, className].filter(Boolean).join(" "),
	...props
}));
AlertDialogOverlay.displayName = "AlertDialogOverlay";
const AlertDialogContent = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_alert_dialog.Content, {
	ref,
	className: [alertDialogContent, className].filter(Boolean).join(" "),
	...props,
	children
})] }));
AlertDialogContent.displayName = "AlertDialogContent";
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [alertDialogHeader, className].filter(Boolean).join(" "),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [alertDialogFooter, className].filter(Boolean).join(" "),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_alert_dialog.Title, {
	ref,
	className: [alertDialogTitle, className].filter(Boolean).join(" "),
	...props
}));
AlertDialogTitle.displayName = "AlertDialogTitle";
const AlertDialogDescription = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_alert_dialog.Description, {
	ref,
	className: [alertDialogDescription, className].filter(Boolean).join(" "),
	...props
}));
AlertDialogDescription.displayName = "AlertDialogDescription";

//#endregion
//#region src/components/AspectRatio/AspectRatio.tsx
const AspectRatio = _radix_ui_react_aspect_ratio.Root;
AspectRatio.displayName = "AspectRatio";

//#endregion
//#region src/components/Avatar/Avatar.css.ts
const avatarRoot = (0, _vanilla_extract_recipes.recipe)({
	base: {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		overflow: "hidden",
		borderRadius: _hydrotik_tokens.vars.radii.full,
		backgroundColor: _hydrotik_tokens.vars.color.secondary,
		flexShrink: 0
	},
	variants: { size: {
		sm: {
			width: _hydrotik_tokens.vars.space["6"],
			height: _hydrotik_tokens.vars.space["6"]
		},
		md: {
			width: _hydrotik_tokens.vars.space["8"],
			height: _hydrotik_tokens.vars.space["8"]
		},
		lg: {
			width: _hydrotik_tokens.vars.space["10"],
			height: _hydrotik_tokens.vars.space["10"]
		},
		xl: {
			width: _hydrotik_tokens.vars.space["14"],
			height: _hydrotik_tokens.vars.space["14"]
		}
	} },
	defaultVariants: { size: "md" }
});
const avatarImage = (0, _vanilla_extract_css.style)({
	width: "100%",
	height: "100%",
	objectFit: "cover",
	borderRadius: "inherit"
});
const avatarFallback = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	backgroundColor: _hydrotik_tokens.vars.color.secondary,
	color: _hydrotik_tokens.vars.color.secondaryForeground,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	lineHeight: "1"
});

//#endregion
//#region src/components/Avatar/Avatar.tsx
const Avatar = react.default.forwardRef(({ size = "md", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_avatar.Root, {
	ref,
	className: [avatarRoot({ size }), className].filter(Boolean).join(" "),
	...props
}));
Avatar.displayName = "Avatar";
const AvatarImage = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_avatar.Image, {
	ref,
	className: [avatarImage, className].filter(Boolean).join(" "),
	...props
}));
AvatarImage.displayName = "AvatarImage";
const AvatarFallback = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_avatar.Fallback, {
	ref,
	className: [avatarFallback, className].filter(Boolean).join(" "),
	...props
}));
AvatarFallback.displayName = "AvatarFallback";

//#endregion
//#region src/components/Badge/Badge.css.ts
/**
* Badge recipe — shadcn v4 aligned.
* - `default` = solid primary bg (was missing)
* - `secondary` = muted bg
* - `destructive` = solid destructive bg
* - `outline` = transparent with border
* - Kept `success` / `warning` as useful extensions
* - Rounded full (pill), no size variants (shadcn has single size)
*/
const badgeRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: _hydrotik_tokens.vars.radii.full,
		border: "1px solid transparent",
		fontWeight: _hydrotik_tokens.vars.font.weight.medium,
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontSize: _hydrotik_tokens.vars.font.size.xs,
		whiteSpace: "nowrap",
		lineHeight: "1",
		padding: `${_hydrotik_tokens.vars.space["0_5"]} ${_hydrotik_tokens.vars.space["2_5"]}`,
		gap: _hydrotik_tokens.vars.space["1"],
		width: "fit-content",
		flexShrink: 0,
		overflow: "hidden",
		transition: `color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
	},
	variants: { variant: {
		default: {
			backgroundColor: _hydrotik_tokens.vars.color.primary,
			color: _hydrotik_tokens.vars.color.primaryForeground
		},
		secondary: {
			backgroundColor: _hydrotik_tokens.vars.color.secondary,
			color: _hydrotik_tokens.vars.color.secondaryForeground
		},
		destructive: {
			backgroundColor: _hydrotik_tokens.vars.color.destructive,
			color: _hydrotik_tokens.vars.color.destructiveForeground
		},
		outline: {
			backgroundColor: "transparent",
			color: _hydrotik_tokens.vars.color.text,
			borderColor: _hydrotik_tokens.vars.color.border
		},
		success: {
			backgroundColor: _hydrotik_tokens.vars.color.success,
			color: _hydrotik_tokens.vars.color.successForeground
		},
		warning: {
			backgroundColor: _hydrotik_tokens.vars.color.warning,
			color: _hydrotik_tokens.vars.color.warningForeground
		}
	} },
	defaultVariants: { variant: "default" }
});

//#endregion
//#region src/components/Badge/Badge.tsx
const Badge = react.default.forwardRef(({ variant = "default", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	ref,
	className: [badgeRecipe({ variant }), className].filter(Boolean).join(" "),
	...props
}));
Badge.displayName = "Badge";

//#endregion
//#region src/components/Breadcrumb/Breadcrumb.css.ts
const breadcrumbNav = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center"
});
const breadcrumbList = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1_5"],
	flexWrap: "wrap",
	listStyle: "none",
	margin: 0,
	padding: 0,
	fontSize: _hydrotik_tokens.vars.font.size.sm
});
const breadcrumbItem = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1_5"]
});
const breadcrumbLink = (0, _vanilla_extract_css.style)({
	color: _hydrotik_tokens.vars.color.textMuted,
	textDecoration: "none",
	transition: `color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { color: _hydrotik_tokens.vars.color.text },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px",
			borderRadius: _hydrotik_tokens.vars.radii.sm
		}
	}
});
const breadcrumbPage = (0, _vanilla_extract_css.style)({
	color: _hydrotik_tokens.vars.color.text,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium
});
const breadcrumbSeparator = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	color: _hydrotik_tokens.vars.color.textMuted
});
const breadcrumbEllipsis = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: _hydrotik_tokens.vars.space["8"],
	height: _hydrotik_tokens.vars.space["8"],
	color: _hydrotik_tokens.vars.color.textMuted
});

//#endregion
//#region src/components/Breadcrumb/Breadcrumb.tsx
const Breadcrumb = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("nav", {
	ref,
	"aria-label": "breadcrumb",
	className: [breadcrumbNav, className].filter(Boolean).join(" "),
	...props
}));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
	ref,
	className: [breadcrumbList, className].filter(Boolean).join(" "),
	...props
}));
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
	ref,
	className: [breadcrumbItem, className].filter(Boolean).join(" "),
	...props
}));
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = react.default.forwardRef(({ asChild, className, ...props }, ref) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(asChild ? _radix_ui_react_slot.Slot : "a", {
		ref,
		className: [breadcrumbLink, className].filter(Boolean).join(" "),
		...props
	});
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	ref,
	role: "link",
	"aria-disabled": "true",
	"aria-current": "page",
	className: [breadcrumbPage, className].filter(Boolean).join(" "),
	...props
}));
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({ className, children, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
	role: "presentation",
	"aria-hidden": "true",
	className: [breadcrumbSeparator, className].filter(Boolean).join(" "),
	...props,
	children: children ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const BreadcrumbEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
	role: "presentation",
	"aria-hidden": "true",
	className: [breadcrumbEllipsis, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.MoreHorizontal, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "sr-only",
		children: "More"
	})]
});
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

//#endregion
//#region src/components/Button/Button.css.ts
const spin$1 = (0, _vanilla_extract_css.keyframes)({ to: { transform: "rotate(360deg)" } });
const spinner = (0, _vanilla_extract_css.style)({
	display: "inline-block",
	width: "1em",
	height: "1em",
	border: `2px solid currentColor`,
	borderTopColor: "transparent",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	animation: `${spin$1} 0.6s linear infinite`,
	flexShrink: 0
});
/**
* Button recipe — shadcn v4 aligned.
* - `default` = primary CTA (was `primary`)
* - Added `link` variant
* - Uses `shadow.xs` on applicable variants
* - High-density sizing (sm=28, md=32, lg=40)
*/
const buttonRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: _hydrotik_tokens.vars.space["2"],
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontWeight: _hydrotik_tokens.vars.font.weight.medium,
		letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.normal,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		borderRadius: _hydrotik_tokens.vars.radii.md,
		border: "1px solid transparent",
		cursor: "pointer",
		textDecoration: "none",
		whiteSpace: "nowrap",
		flexShrink: 0,
		outline: "none",
		transition: [
			`background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`border-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`opacity ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
		].join(", "),
		selectors: {
			"&:focus-visible": {
				borderColor: _hydrotik_tokens.vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
			},
			"&:disabled, &[aria-disabled=\"true\"]": {
				opacity: "0.5",
				cursor: "not-allowed",
				pointerEvents: "none"
			}
		}
	},
	variants: {
		variant: {
			default: {
				backgroundColor: _hydrotik_tokens.vars.color.primary,
				color: _hydrotik_tokens.vars.color.primaryForeground,
				borderColor: _hydrotik_tokens.vars.color.primary,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(0.9)" } }
			},
			destructive: {
				backgroundColor: _hydrotik_tokens.vars.color.destructive,
				color: _hydrotik_tokens.vars.color.destructiveForeground,
				borderColor: _hydrotik_tokens.vars.color.destructive,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(0.9)" } }
			},
			outline: {
				backgroundColor: "transparent",
				color: _hydrotik_tokens.vars.color.text,
				borderColor: _hydrotik_tokens.vars.color.border,
				boxShadow: _hydrotik_tokens.vars.shadow.xs,
				selectors: { "&:hover:not(:disabled)": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } }
			},
			secondary: {
				backgroundColor: _hydrotik_tokens.vars.color.secondary,
				color: _hydrotik_tokens.vars.color.secondaryForeground,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(0.8)" } }
			},
			ghost: {
				backgroundColor: "transparent",
				color: _hydrotik_tokens.vars.color.text,
				borderColor: "transparent",
				selectors: { "&:hover:not(:disabled)": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } }
			},
			link: {
				backgroundColor: "transparent",
				color: _hydrotik_tokens.vars.color.primary,
				borderColor: "transparent",
				textDecoration: "none",
				selectors: { "&:hover:not(:disabled)": {
					textDecoration: "underline",
					textUnderlineOffset: "4px"
				} }
			}
		},
		size: {
			sm: {
				height: _hydrotik_tokens.vars.space["7"],
				paddingLeft: _hydrotik_tokens.vars.space["3"],
				paddingRight: _hydrotik_tokens.vars.space["3"],
				fontSize: _hydrotik_tokens.vars.font.size.xs,
				gap: _hydrotik_tokens.vars.space["1_5"]
			},
			md: {
				height: _hydrotik_tokens.vars.space["8"],
				paddingLeft: _hydrotik_tokens.vars.space["3"],
				paddingRight: _hydrotik_tokens.vars.space["3"],
				fontSize: _hydrotik_tokens.vars.font.size.sm
			},
			lg: {
				height: _hydrotik_tokens.vars.space["10"],
				paddingLeft: _hydrotik_tokens.vars.space["5"],
				paddingRight: _hydrotik_tokens.vars.space["5"],
				fontSize: _hydrotik_tokens.vars.font.size.sm
			},
			icon: {
				width: _hydrotik_tokens.vars.space["8"],
				height: _hydrotik_tokens.vars.space["8"],
				padding: 0
			},
			"icon-sm": {
				width: _hydrotik_tokens.vars.space["7"],
				height: _hydrotik_tokens.vars.space["7"],
				padding: 0
			},
			"icon-lg": {
				width: _hydrotik_tokens.vars.space["10"],
				height: _hydrotik_tokens.vars.space["10"],
				padding: 0
			}
		},
		loading: {
			true: {
				cursor: "not-allowed",
				opacity: "0.7",
				pointerEvents: "none"
			},
			false: {}
		},
		fullWidth: {
			true: { width: "100%" },
			false: {}
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md",
		loading: false,
		fullWidth: false
	}
});

//#endregion
//#region src/components/Button/Button.tsx
/**
* Button — primary interactive element (shadcn v4 aligned).
*
* @example
* ```tsx
* <Button variant="default" size="md">Save changes</Button>
* <Button variant="outline" loading>Submitting...</Button>
* <Button asChild><a href="/dashboard">Go to dashboard</a></Button>
* ```
*/
const Button = (0, react.forwardRef)(({ variant = "default", size = "md", loading = false, fullWidth = false, asChild = false, className, children, disabled, ...props }, ref) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(asChild ? _radix_ui_react_slot.Slot : "button", {
		ref,
		className: [buttonRecipe({
			variant,
			size,
			loading,
			fullWidth
		}), className].filter(Boolean).join(" "),
		disabled: disabled || loading,
		"aria-disabled": disabled || loading,
		...props,
		children: [loading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: spinner,
			"aria-hidden": "true"
		}), children]
	});
});
Button.displayName = "Button";

//#endregion
//#region src/components/Card/Card.css.ts
/**
* Card — shadcn v4 aligned.
* Simple flex column, border + rounded-lg, no internal header/footer borders.
* Uses bg-surface (like shadcn bg-card).
*/
const cardRoot = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	boxShadow: _hydrotik_tokens.vars.shadow.sm,
	overflow: "hidden"
});
const cardHeader = (0, _vanilla_extract_css.style)({
	display: "grid",
	gridAutoRows: "min-content",
	alignItems: "start",
	gap: _hydrotik_tokens.vars.space["1_5"],
	padding: _hydrotik_tokens.vars.space["6"]
});
const cardTitle = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.lg,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight
});
const cardDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal
});
const cardContent = (0, _vanilla_extract_css.style)({ padding: `0 ${_hydrotik_tokens.vars.space["6"]} ${_hydrotik_tokens.vars.space["6"]}` });
const cardFooter = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	padding: `0 ${_hydrotik_tokens.vars.space["6"]} ${_hydrotik_tokens.vars.space["6"]}`
});

//#endregion
//#region src/components/Card/Card.tsx
const Card = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [cardRoot, className].filter(Boolean).join(" "),
	...props
}));
Card.displayName = "Card";
const CardHeader = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [cardHeader, className].filter(Boolean).join(" "),
	...props
}));
CardHeader.displayName = "CardHeader";
const CardTitle = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
	ref,
	className: [cardTitle, className].filter(Boolean).join(" "),
	...props
}));
CardTitle.displayName = "CardTitle";
const CardDescription = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
	ref,
	className: [cardDescription, className].filter(Boolean).join(" "),
	...props
}));
CardDescription.displayName = "CardDescription";
const CardContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [cardContent, className].filter(Boolean).join(" "),
	...props
}));
CardContent.displayName = "CardContent";
const CardFooter = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [cardFooter, className].filter(Boolean).join(" "),
	...props
}));
CardFooter.displayName = "CardFooter";

//#endregion
//#region src/components/Checkbox/Checkbox.css.ts
/**
* Checkbox — shadcn v4 aligned.
* 16px square, rounded-[4px], shadow-xs, primary bg when checked.
*/
const checkboxRoot = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "16px",
	height: "16px",
	borderRadius: "4px",
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	boxShadow: _hydrotik_tokens.vars.shadow.xs,
	cursor: "pointer",
	flexShrink: 0,
	outline: "none",
	transition: `box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:focus-visible": {
			borderColor: _hydrotik_tokens.vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
		},
		"&[data-state=\"checked\"], &[data-state=\"indeterminate\"]": {
			backgroundColor: _hydrotik_tokens.vars.color.primary,
			borderColor: _hydrotik_tokens.vars.color.primary,
			color: _hydrotik_tokens.vars.color.primaryForeground
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});
const checkboxIndicator = (0, _vanilla_extract_css.style)({
	display: "grid",
	placeContent: "center",
	color: "currentColor"
});

//#endregion
//#region src/components/Checkbox/Checkbox.tsx
const Checkbox = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_checkbox.Root, {
	ref,
	className: [checkboxRoot, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_checkbox.Indicator, {
		className: checkboxIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { size: 14 })
	})
}));
Checkbox.displayName = "Checkbox";

//#endregion
//#region src/components/Collapsible/Collapsible.tsx
const Collapsible = _radix_ui_react_collapsible.Root;
const CollapsibleTrigger = _radix_ui_react_collapsible.Trigger;
const CollapsibleContent = _radix_ui_react_collapsible.Content;

//#endregion
//#region src/components/Command/Command.css.ts
const commandRoot = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated
});
const commandInput = (0, _vanilla_extract_css.style)({
	display: "flex",
	width: "100%",
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`
});
const commandInputField = (0, _vanilla_extract_css.style)({
	flex: 1,
	height: _hydrotik_tokens.vars.space["9"],
	padding: `0 ${_hydrotik_tokens.vars.space["3"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	color: _hydrotik_tokens.vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	outline: "none",
	selectors: { "&::placeholder": { color: _hydrotik_tokens.vars.color.placeholder } }
});
const commandList = (0, _vanilla_extract_css.style)({
	maxHeight: "300px",
	overflow: "auto",
	padding: _hydrotik_tokens.vars.space["1"]
});
const commandEmpty = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["6"]} 0`,
	textAlign: "center",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted
});
const commandGroup = (0, _vanilla_extract_css.style)({
	overflow: "hidden",
	padding: _hydrotik_tokens.vars.space["1"]
});
const commandGroupHeading = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.textMuted,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide,
	textTransform: "uppercase"
});
const commandItem = (0, _vanilla_extract_css.style)({
	position: "relative",
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.text,
	cursor: "pointer",
	outline: "none",
	userSelect: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[aria-selected=\"true\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[data-disabled=\"true\"]": {
			color: _hydrotik_tokens.vars.color.textDisabled,
			pointerEvents: "none"
		}
	}
});
const commandSeparator = (0, _vanilla_extract_css.style)({
	height: "1px",
	margin: `${_hydrotik_tokens.vars.space["1"]} 0`,
	backgroundColor: _hydrotik_tokens.vars.color.borderSubtle
});
const commandShortcut = (0, _vanilla_extract_css.style)({
	marginLeft: "auto",
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	color: _hydrotik_tokens.vars.color.textMuted,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide
});
const commandInputIcon = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	paddingLeft: _hydrotik_tokens.vars.space["3"],
	color: _hydrotik_tokens.vars.color.textMuted,
	flexShrink: 0
});

//#endregion
//#region src/components/Command/Command.tsx
/**
* Command palette — a simple searchable list component.
* For a full cmdk-style experience, pair with the `cmdk` package.
* This provides the styled shell + primitives.
*/
const Command = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [commandRoot, className].filter(Boolean).join(" "),
	...props
}));
Command.displayName = "Command";
const CommandInput = react.default.forwardRef(({ className, icon, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	className: commandInput,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: commandInputIcon,
		children: icon ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Search, { size: 15 })
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
		ref,
		className: [commandInputField, className].filter(Boolean).join(" "),
		type: "text",
		role: "combobox",
		...props
	})]
}));
CommandInput.displayName = "CommandInput";
const CommandList = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [commandList, className].filter(Boolean).join(" "),
	role: "listbox",
	...props
}));
CommandList.displayName = "CommandList";
const CommandEmpty = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [commandEmpty, className].filter(Boolean).join(" "),
	...props
}));
CommandEmpty.displayName = "CommandEmpty";
const CommandGroup = react.default.forwardRef(({ className, heading, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	ref,
	className: [commandGroup, className].filter(Boolean).join(" "),
	role: "group",
	...props,
	children: [heading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: commandGroupHeading,
		children: heading
	}), children]
}));
CommandGroup.displayName = "CommandGroup";
const CommandItem = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [commandItem, className].filter(Boolean).join(" "),
	role: "option",
	tabIndex: 0,
	...props
}));
CommandItem.displayName = "CommandItem";
const CommandSeparator = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [commandSeparator, className].filter(Boolean).join(" "),
	role: "separator",
	...props
}));
CommandSeparator.displayName = "CommandSeparator";
const CommandShortcut = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	className: [commandShortcut, className].filter(Boolean).join(" "),
	...props
});
CommandShortcut.displayName = "CommandShortcut";

//#endregion
//#region src/styles/menu-item.css.ts
/**
* Shared menu item styles used by DropdownMenu, ContextMenu, Command, Menubar, Select.
* Extracted to reduce boilerplate duplication across menu-like components.
*/
/** Base menu item — flex row with hover highlight */
const baseMenuItem = (0, _vanilla_extract_css.style)({
	position: "relative",
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.text,
	cursor: "default",
	outline: "none",
	userSelect: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[data-disabled]": {
			opacity: "0.5",
			pointerEvents: "none"
		}
	}
});
/** Menu separator line */
const baseMenuSeparator = (0, _vanilla_extract_css.style)({
	height: "1px",
	margin: `${_hydrotik_tokens.vars.space["1"]} -${_hydrotik_tokens.vars.space["1"]}`,
	backgroundColor: _hydrotik_tokens.vars.color.borderSubtle
});
/** Menu label (group header) */
const baseMenuLabel = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium
});
/** Menu shortcut text */
const baseMenuShortcut = (0, _vanilla_extract_css.style)({
	marginLeft: "auto",
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide,
	color: _hydrotik_tokens.vars.color.textMuted
});
/** Item indicator container (for checkboxes/radios) */
const baseMenuItemIndicator = (0, _vanilla_extract_css.style)({
	position: "absolute",
	left: _hydrotik_tokens.vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "14px",
	height: "14px"
});

//#endregion
//#region src/components/ContextMenu/ContextMenu.css.ts
const slideIn$2 = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "scale(0.96)"
	},
	to: {
		opacity: "1",
		transform: "scale(1)"
	}
});
/**
* ContextMenu — shadcn v4 aligned.
* Uses shared menu-item styles.
*/
const contextMenuContent = (0, _vanilla_extract_css.style)({
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	minWidth: "8rem",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	padding: _hydrotik_tokens.vars.space["1"],
	boxShadow: _hydrotik_tokens.vars.shadow.md,
	animation: `${slideIn$2} ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
});
const contextMenuItem = baseMenuItem;
const contextMenuCheckboxItem = baseMenuItem;
const contextMenuRadioItem = baseMenuItem;
const contextMenuLabel = baseMenuLabel;
const contextMenuSeparator = baseMenuSeparator;
const contextMenuShortcut = baseMenuShortcut;
const contextMenuItemIndicator = baseMenuItemIndicator;
const contextMenuSubTrigger = (0, _vanilla_extract_css.style)([baseMenuItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } } }]);
const contextMenuSubContent = (0, _vanilla_extract_css.style)([contextMenuContent, {}]);

//#endregion
//#region src/components/ContextMenu/ContextMenu.tsx
const ContextMenu = _radix_ui_react_context_menu.Root;
const ContextMenuTrigger = _radix_ui_react_context_menu.Trigger;
const ContextMenuGroup = _radix_ui_react_context_menu.Group;
const ContextMenuPortal = _radix_ui_react_context_menu.Portal;
const ContextMenuSub = _radix_ui_react_context_menu.Sub;
const ContextMenuRadioGroup = _radix_ui_react_context_menu.RadioGroup;
const ContextMenuContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.Content, {
	ref,
	className: [contextMenuContent, className].filter(Boolean).join(" "),
	...props
}) }));
ContextMenuContent.displayName = "ContextMenuContent";
const ContextMenuItem = react.default.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.Item, {
	ref,
	className: [contextMenuItem, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
ContextMenuItem.displayName = "ContextMenuItem";
const ContextMenuCheckboxItem = react.default.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_context_menu.CheckboxItem, {
	ref,
	className: [contextMenuCheckboxItem, className].filter(Boolean).join(" "),
	checked,
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: contextMenuItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { size: 16 }) })
	}), children]
}));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
const ContextMenuRadioItem = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_context_menu.RadioItem, {
	ref,
	className: [contextMenuRadioItem, className].filter(Boolean).join(" "),
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: contextMenuItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Circle, {
			size: 8,
			fill: "currentColor"
		}) })
	}), children]
}));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
const ContextMenuLabel = react.default.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.Label, {
	ref,
	className: [contextMenuLabel, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
ContextMenuLabel.displayName = "ContextMenuLabel";
const ContextMenuSeparator = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.Separator, {
	ref,
	className: [contextMenuSeparator, className].filter(Boolean).join(" "),
	...props
}));
ContextMenuSeparator.displayName = "ContextMenuSeparator";
const ContextMenuShortcut = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	className: [contextMenuShortcut, className].filter(Boolean).join(" "),
	...props
});
ContextMenuShortcut.displayName = "ContextMenuShortcut";
const ContextMenuSubTrigger = react.default.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_context_menu.SubTrigger, {
	ref,
	className: [contextMenuSubTrigger, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props,
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {
		size: 16,
		style: { marginLeft: "auto" },
		"aria-hidden": true
	})]
}));
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
const ContextMenuSubContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.SubContent, {
	ref,
	className: [contextMenuSubContent, className].filter(Boolean).join(" "),
	...props
}));
ContextMenuSubContent.displayName = "ContextMenuSubContent";

//#endregion
//#region src/components/Dialog/Dialog.css.ts
/**
* Dialog — shadcn v4 aligned.
* Uses shared overlay/modal styles.
*/
const dialogOverlay = baseOverlay;
const dialogContent = baseModalContent;
const dialogHeader = baseModalHeader;
const dialogFooter = baseModalFooter;
const dialogTitle = baseModalTitle;
const dialogDescription = baseModalDescription;
const dialogClose = (0, _vanilla_extract_css.style)({
	position: "absolute",
	right: _hydrotik_tokens.vars.space["4"],
	top: _hydrotik_tokens.vars.space["4"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	opacity: "0.7",
	cursor: "pointer",
	background: "none",
	border: "none",
	padding: 0,
	color: _hydrotik_tokens.vars.color.text,
	transition: `opacity ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: { "&:hover": { opacity: "1" } }
});

//#endregion
//#region src/components/Dialog/Dialog.tsx
const Dialog = _radix_ui_react_dialog.Root;
const DialogTrigger = _radix_ui_react_dialog.Trigger;
const DialogPortal = _radix_ui_react_dialog.Portal;
const DialogClose = _radix_ui_react_dialog.Close;
const DialogOverlay = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Overlay, {
	ref,
	className: [dialogOverlay, className].filter(Boolean).join(" "),
	...props
}));
DialogOverlay.displayName = "DialogOverlay";
const DialogContent = react.default.forwardRef(({ className, children, showCloseButton = true, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Content, {
	ref,
	className: [dialogContent, className].filter(Boolean).join(" "),
	...props,
	children: [children, showCloseButton && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Close, {
		className: dialogClose,
		"aria-label": "Close dialog",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = "DialogContent";
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [dialogHeader, className].filter(Boolean).join(" "),
	...props
});
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [dialogFooter, className].filter(Boolean).join(" "),
	...props
});
DialogFooter.displayName = "DialogFooter";
const DialogTitle = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Title, {
	ref,
	className: [dialogTitle, className].filter(Boolean).join(" "),
	...props
}));
DialogTitle.displayName = "DialogTitle";
const DialogDescription = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Description, {
	ref,
	className: [dialogDescription, className].filter(Boolean).join(" "),
	...props
}));
DialogDescription.displayName = "DialogDescription";

//#endregion
//#region src/components/DropdownMenu/DropdownMenu.css.ts
const slideDownAndFade$1 = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "translateY(-4px)"
	},
	to: {
		opacity: 1,
		transform: "translateY(0)"
	}
});
const slideUpAndFade$1 = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "translateY(4px)"
	},
	to: {
		opacity: 1,
		transform: "translateY(0)"
	}
});
const slideLeftAndFade = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "translateX(4px)"
	},
	to: {
		opacity: 1,
		transform: "translateX(0)"
	}
});
const slideRightAndFade = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "translateX(-4px)"
	},
	to: {
		opacity: 1,
		transform: "translateX(0)"
	}
});
/**
* DropdownMenu — shadcn v4 aligned.
* Uses shared menu-item styles + directional animations.
*/
const dropdownContent = (0, _vanilla_extract_css.style)({
	minWidth: "8rem",
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	color: _hydrotik_tokens.vars.color.text,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	boxShadow: _hydrotik_tokens.vars.shadow.md,
	padding: _hydrotik_tokens.vars.space["1"],
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	overflow: "hidden",
	animationDuration: _hydrotik_tokens.vars.motion.duration.normal,
	animationTimingFunction: _hydrotik_tokens.vars.motion.easing.default,
	selectors: {
		"&[data-side=\"top\"]": { animationName: slideUpAndFade$1 },
		"&[data-side=\"bottom\"]": { animationName: slideDownAndFade$1 },
		"&[data-side=\"left\"]": { animationName: slideLeftAndFade },
		"&[data-side=\"right\"]": { animationName: slideRightAndFade }
	}
});
const dropdownItem = baseMenuItem;
const dropdownDestructiveItem = (0, _vanilla_extract_css.style)([baseMenuItem, {
	color: _hydrotik_tokens.vars.color.destructive,
	selectors: { "&[data-highlighted]": {
		backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.destructive} 10%, transparent)`,
		color: _hydrotik_tokens.vars.color.destructive
	} }
}]);
const dropdownLabel = baseMenuLabel;
const dropdownSeparator = baseMenuSeparator;
const dropdownItemIndicator = baseMenuItemIndicator;
const dropdownShortcut = baseMenuShortcut;
const dropdownCheckboxItem = (0, _vanilla_extract_css.style)([baseMenuItem, { paddingLeft: _hydrotik_tokens.vars.space["8"] }]);
const dropdownRadioItem = (0, _vanilla_extract_css.style)([dropdownCheckboxItem]);
const dropdownSubTrigger = (0, _vanilla_extract_css.style)([baseMenuItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } } }]);
const dropdownSubContent = (0, _vanilla_extract_css.style)([dropdownContent]);

//#endregion
//#region src/components/DropdownMenu/DropdownMenu.tsx
const DropdownMenu = _radix_ui_react_dropdown_menu.Root;
const DropdownMenuTrigger = _radix_ui_react_dropdown_menu.Trigger;
const DropdownMenuGroup = _radix_ui_react_dropdown_menu.Group;
const DropdownMenuPortal = _radix_ui_react_dropdown_menu.Portal;
const DropdownMenuRadioGroup = _radix_ui_react_dropdown_menu.RadioGroup;
const DropdownMenuSubTrigger = react.default.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dropdown_menu.SubTrigger, {
	ref,
	className: [dropdownSubTrigger, className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {
		size: 16,
		style: { marginLeft: "auto" },
		"aria-hidden": true
	})]
}));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
const DropdownMenuSubContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.SubContent, {
	ref,
	className: [dropdownSubContent, className].filter(Boolean).join(" "),
	sideOffset: 2,
	alignOffset: -4,
	...props
}));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
const DropdownMenuContent = react.default.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Content, {
	ref,
	className: [dropdownContent, className].filter(Boolean).join(" "),
	sideOffset,
	...props
}) }));
DropdownMenuContent.displayName = "DropdownMenuContent";
const DropdownMenuItem = react.default.forwardRef(({ className, destructive, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Item, {
	ref,
	className: [destructive ? dropdownDestructiveItem : dropdownItem, className].filter(Boolean).join(" "),
	...props
}));
DropdownMenuItem.displayName = "DropdownMenuItem";
const DropdownMenuCheckboxItem = react.default.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dropdown_menu.CheckboxItem, {
	ref,
	className: [dropdownCheckboxItem, className].filter(Boolean).join(" "),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: dropdownItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { size: 16 }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
const DropdownMenuRadioItem = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dropdown_menu.RadioItem, {
	ref,
	className: [dropdownRadioItem, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: dropdownItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Circle, {
			size: 8,
			fill: "currentColor"
		}) })
	}), children]
}));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
const DropdownMenuLabel = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Label, {
	ref,
	className: [dropdownLabel, className].filter(Boolean).join(" "),
	...props
}));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
const DropdownMenuSeparator = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Separator, {
	ref,
	className: [dropdownSeparator, className].filter(Boolean).join(" "),
	...props
}));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
const DropdownMenuShortcut = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	className: [dropdownShortcut, className].filter(Boolean).join(" "),
	...props
});
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
const DropdownMenuSub = _radix_ui_react_dropdown_menu.Sub;

//#endregion
//#region src/components/FieldMessage/FieldMessage.css.ts
const fieldMessageRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "flex",
		alignItems: "center",
		gap: _hydrotik_tokens.vars.space["1"],
		fontSize: _hydrotik_tokens.vars.font.size.xs,
		lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal
	},
	variants: { variant: {
		default: { color: _hydrotik_tokens.vars.color.textMuted },
		error: { color: _hydrotik_tokens.vars.color.destructive },
		success: { color: _hydrotik_tokens.vars.color.success }
	} },
	defaultVariants: { variant: "default" }
});

//#endregion
//#region src/components/FieldMessage/FieldMessage.tsx
const FieldMessage = react.default.forwardRef(({ variant = "default", className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
	ref,
	className: [fieldMessageRecipe({ variant }), className].filter(Boolean).join(" "),
	role: variant === "error" ? "alert" : void 0,
	...props,
	children
}));
FieldMessage.displayName = "FieldMessage";

//#endregion
//#region src/components/HoverCard/HoverCard.css.ts
const slideIn$1 = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "translateY(2px)"
	},
	to: {
		opacity: "1",
		transform: "translateY(0)"
	}
});
const hoverCardContent = (0, _vanilla_extract_css.style)({
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	width: "280px",
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	padding: _hydrotik_tokens.vars.space["3"],
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	outline: "none",
	animation: `${slideIn$1} ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
});

//#endregion
//#region src/components/HoverCard/HoverCard.tsx
const HoverCard = _radix_ui_react_hover_card.Root;
const HoverCardTrigger = _radix_ui_react_hover_card.Trigger;
const HoverCardContent = react.default.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_hover_card.Content, {
	ref,
	align,
	sideOffset,
	className: [hoverCardContent, className].filter(Boolean).join(" "),
	...props
}));
HoverCardContent.displayName = "HoverCardContent";

//#endregion
//#region src/components/Input/Input.css.ts
const inputWrapperRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "flex",
		flexDirection: "column",
		gap: _hydrotik_tokens.vars.space["1_5"]
	},
	variants: { fullWidth: {
		true: { width: "100%" },
		false: {}
	} },
	defaultVariants: { fullWidth: false }
});
/**
* Input — shadcn v4 aligned.
* Uses shadow-xs, border-input, dark bg-input/30 pattern.
*/
const inputRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		width: "100%",
		minWidth: 0,
		backgroundColor: _hydrotik_tokens.vars.color.input,
		color: _hydrotik_tokens.vars.color.text,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		borderRadius: _hydrotik_tokens.vars.radii.md,
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
		boxShadow: _hydrotik_tokens.vars.shadow.xs,
		outline: "none",
		transition: [`color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`, `box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`].join(", "),
		selectors: {
			"&::placeholder": { color: _hydrotik_tokens.vars.color.placeholder },
			"&:focus-visible": {
				borderColor: _hydrotik_tokens.vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
			},
			"&:disabled": {
				opacity: "0.5",
				cursor: "not-allowed",
				pointerEvents: "none"
			},
			"&[aria-invalid=\"true\"]": {
				borderColor: _hydrotik_tokens.vars.color.destructive,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.destructive} 20%, transparent)`
			}
		}
	},
	variants: { size: {
		sm: {
			height: _hydrotik_tokens.vars.space["7"],
			paddingLeft: _hydrotik_tokens.vars.space["2"],
			paddingRight: _hydrotik_tokens.vars.space["2"],
			fontSize: _hydrotik_tokens.vars.font.size.xs
		},
		md: {
			height: _hydrotik_tokens.vars.space["8"],
			paddingLeft: _hydrotik_tokens.vars.space["3"],
			paddingRight: _hydrotik_tokens.vars.space["3"],
			fontSize: _hydrotik_tokens.vars.font.size.sm
		},
		lg: {
			height: _hydrotik_tokens.vars.space["10"],
			paddingLeft: _hydrotik_tokens.vars.space["3"],
			paddingRight: _hydrotik_tokens.vars.space["3"],
			fontSize: _hydrotik_tokens.vars.font.size.sm
		}
	} },
	defaultVariants: { size: "md" }
});

//#endregion
//#region src/components/Input/Input.tsx
/**
* Input — text input with optional label and field message.
*
* @example
* ```tsx
* <Input label="Email" type="email" placeholder="you@example.com" />
* <Input label="Username" error message="Username is taken" />
* ```
*/
const Input = (0, react.forwardRef)(({ inputSize = "md", label, message, error = false, fullWidth = false, className, id: idProp, disabled, ...props }, ref) => {
	const autoId = (0, react.useId)();
	const id = idProp ?? autoId;
	const messageId = `${id}-message`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: inputWrapperRecipe({ fullWidth }),
		children: [
			label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
				htmlFor: id,
				style: {
					fontSize: "var(--font-size-sm, 0.875rem)",
					fontWeight: 500
				},
				children: label
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				ref,
				id,
				className: [inputRecipe({ size: inputSize }), className].filter(Boolean).join(" "),
				disabled,
				"aria-invalid": error || void 0,
				"aria-describedby": message ? messageId : void 0,
				...props
			}),
			message && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				id: messageId,
				role: error ? "alert" : void 0,
				style: {
					fontSize: "var(--font-size-xs, 0.75rem)",
					color: error ? "var(--color-destructive)" : "var(--color-text-muted)"
				},
				children: message
			})
		]
	});
});
Input.displayName = "Input";

//#endregion
//#region src/components/InputGroup/InputGroup.css.ts
/**
* InputGroup — shadcn v4 aligned.
*
* The wrapper div owns border, shadow, border-radius, and background.
* Child inputs/textareas strip their own chrome via `inputGroupInput`.
*/
const inputGroupRoot = (0, _vanilla_extract_css.style)({
	position: "relative",
	display: "flex",
	width: "100%",
	alignItems: "center",
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	boxShadow: _hydrotik_tokens.vars.shadow.xs,
	height: _hydrotik_tokens.vars.space["8"],
	minWidth: 0,
	transition: "color 0.15s, box-shadow 0.15s",
	selectors: { "&:focus-within": {
		borderColor: _hydrotik_tokens.vars.color.focusRing,
		boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
	} }
});
/** Auto-height variant (for textareas) */
const inputGroupColumn = (0, _vanilla_extract_css.style)({
	flexDirection: "column",
	height: "auto"
});
/**
* Addon — text, icon, or button slot next to the input.
*/
const inputGroupAddon = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	padding: `0 ${_hydrotik_tokens.vars.space["3"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: "500",
	color: _hydrotik_tokens.vars.color.textMuted,
	whiteSpace: "nowrap",
	userSelect: "none",
	flexShrink: 0
});
/**
* Toolbar — row at the end of a column-layout group (below textarea).
*/
const inputGroupToolbar = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap",
	gap: _hydrotik_tokens.vars.space["1"],
	width: "100%",
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	borderTop: `1px solid color-mix(in srgb, ${_hydrotik_tokens.vars.color.border} 50%, transparent)`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	color: _hydrotik_tokens.vars.color.textMuted
});
/**
* Strip all chrome from an Input or Textarea inside an InputGroup.
* The group wrapper provides the visual container.
*/
const inputGroupInput = (0, _vanilla_extract_css.style)({
	border: "none !important",
	borderRadius: "0 !important",
	backgroundColor: "transparent !important",
	boxShadow: "none !important",
	outline: "none !important",
	flex: 1,
	minWidth: 0
});

//#endregion
//#region src/components/InputGroup/InputGroup.tsx
/**
* InputGroup — wrapper that provides a unified border, shadow, and
* border-radius for a group of input-related elements.
*
* Children should use `InputGroupInput` for the text field and
* `InputGroupAddon` / `InputGroupToolbar` for decorations.
*
* @example
* ```tsx
* <InputGroup>
*   <InputGroupAddon>https://</InputGroupAddon>
*   <InputGroupInput><Input fullWidth /></InputGroupInput>
* </InputGroup>
* ```
*/
const InputGroup = (0, react.forwardRef)(({ className, column = false, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	role: "group",
	className: [
		inputGroupRoot,
		column && inputGroupColumn,
		className
	].filter(Boolean).join(" "),
	...props
}));
InputGroup.displayName = "InputGroup";
/**
* InputGroupAddon — non-interactive text / icon slot inside a group.
*/
const InputGroupAddon = (0, react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	ref,
	className: [inputGroupAddon, className].filter(Boolean).join(" "),
	...props
}));
InputGroupAddon.displayName = "InputGroupAddon";
/**
* InputGroupToolbar — row at the bottom of a column InputGroup.
*/
const InputGroupToolbar = (0, react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [inputGroupToolbar, className].filter(Boolean).join(" "),
	...props
}));
InputGroupToolbar.displayName = "InputGroupToolbar";

//#endregion
//#region src/components/Kbd/Kbd.css.ts
const kbdRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: _hydrotik_tokens.vars.font.family.mono,
		fontWeight: _hydrotik_tokens.vars.font.weight.medium,
		borderRadius: _hydrotik_tokens.vars.radii.sm,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		backgroundColor: _hydrotik_tokens.vars.color.secondary,
		color: _hydrotik_tokens.vars.color.text,
		boxShadow: `0 1px 0 1px ${_hydrotik_tokens.vars.color.borderSubtle}`,
		whiteSpace: "nowrap",
		lineHeight: "1"
	},
	variants: { size: {
		sm: {
			height: "20px",
			minWidth: "20px",
			padding: `0 ${_hydrotik_tokens.vars.space["1"]}`,
			fontSize: _hydrotik_tokens.vars.font.size.xs
		},
		md: {
			height: "24px",
			minWidth: "24px",
			padding: `0 ${_hydrotik_tokens.vars.space["1_5"]}`,
			fontSize: _hydrotik_tokens.vars.font.size.xs
		}
	} },
	defaultVariants: { size: "md" }
});

//#endregion
//#region src/components/Kbd/Kbd.tsx
const Kbd = react.default.forwardRef(({ size = "md", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("kbd", {
	ref,
	className: [kbdRecipe({ size }), className].filter(Boolean).join(" "),
	...props
}));
Kbd.displayName = "Kbd";

//#endregion
//#region src/components/Label/Label.css.ts
const label = (0, _vanilla_extract_css.style)({
	display: "block",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.text,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
	userSelect: "none",
	selectors: { "&[data-disabled]": {
		opacity: "0.5",
		cursor: "not-allowed"
	} }
});

//#endregion
//#region src/components/Label/Label.tsx
const Label = react.default.forwardRef(({ className, disabled, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_label.Root, {
	ref,
	className: [label, className].filter(Boolean).join(" "),
	"data-disabled": disabled ? "" : void 0,
	...props
}));
Label.displayName = "Label";

//#endregion
//#region src/components/Menubar/Menubar.css.ts
const slideIn = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "scale(0.96)"
	},
	to: {
		opacity: "1",
		transform: "scale(1)"
	}
});
const menubarRoot = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	padding: _hydrotik_tokens.vars.space["1"],
	boxShadow: _hydrotik_tokens.vars.shadow.sm
});
const menubarTrigger = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	padding: `${_hydrotik_tokens.vars.space["1"]} ${_hydrotik_tokens.vars.space["2_5"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	outline: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[data-state=\"open\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "-2px"
		}
	}
});
const menubarContent = (0, _vanilla_extract_css.style)({
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	minWidth: "200px",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	padding: _hydrotik_tokens.vars.space["1"],
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	animation: `${slideIn} ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
});
const menubarItem = baseMenuItem;
const menubarSeparator = baseMenuSeparator;
const menubarLabel = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.textMuted
});
const menubarShortcut = baseMenuShortcut;
const menubarItemIndicator = baseMenuItemIndicator;
const menubarSubTrigger = (0, _vanilla_extract_css.style)([baseMenuItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } } }]);
const menubarSubContent = (0, _vanilla_extract_css.style)([menubarContent, {}]);
const menubarCheckboxItem = baseMenuItem;
const menubarRadioItem = baseMenuItem;

//#endregion
//#region src/components/Menubar/Menubar.tsx
const Menubar = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.Root, {
	ref,
	className: [menubarRoot, className].filter(Boolean).join(" "),
	...props
}));
Menubar.displayName = "Menubar";
const MenubarMenu = _radix_ui_react_menubar.Menu;
const MenubarGroup = _radix_ui_react_menubar.Group;
const MenubarPortal = _radix_ui_react_menubar.Portal;
const MenubarSub = _radix_ui_react_menubar.Sub;
const MenubarRadioGroup = _radix_ui_react_menubar.RadioGroup;
const MenubarTrigger = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.Trigger, {
	ref,
	className: [menubarTrigger, className].filter(Boolean).join(" "),
	...props
}));
MenubarTrigger.displayName = "MenubarTrigger";
const MenubarContent = react.default.forwardRef(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.Content, {
	ref,
	align,
	alignOffset,
	sideOffset,
	className: [menubarContent, className].filter(Boolean).join(" "),
	...props
}) }));
MenubarContent.displayName = "MenubarContent";
const MenubarItem = react.default.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.Item, {
	ref,
	className: [menubarItem, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
MenubarItem.displayName = "MenubarItem";
const MenubarCheckboxItem = react.default.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_menubar.CheckboxItem, {
	ref,
	className: [menubarCheckboxItem, className].filter(Boolean).join(" "),
	checked,
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: menubarItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { size: 16 }) })
	}), children]
}));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";
const MenubarRadioItem = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_menubar.RadioItem, {
	ref,
	className: [menubarRadioItem, className].filter(Boolean).join(" "),
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: menubarItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Circle, {
			size: 8,
			fill: "currentColor"
		}) })
	}), children]
}));
MenubarRadioItem.displayName = "MenubarRadioItem";
const MenubarLabel = react.default.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.Label, {
	ref,
	className: [menubarLabel, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
MenubarLabel.displayName = "MenubarLabel";
const MenubarSeparator = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.Separator, {
	ref,
	className: [menubarSeparator, className].filter(Boolean).join(" "),
	...props
}));
MenubarSeparator.displayName = "MenubarSeparator";
const MenubarShortcut = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	className: [menubarShortcut, className].filter(Boolean).join(" "),
	...props
});
MenubarShortcut.displayName = "MenubarShortcut";
const MenubarSubTrigger = react.default.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_menubar.SubTrigger, {
	ref,
	className: [menubarSubTrigger, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props,
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {
		size: 16,
		style: { marginLeft: "auto" },
		"aria-hidden": true
	})]
}));
MenubarSubTrigger.displayName = "MenubarSubTrigger";
const MenubarSubContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.SubContent, {
	ref,
	className: [menubarSubContent, className].filter(Boolean).join(" "),
	...props
}));
MenubarSubContent.displayName = "MenubarSubContent";

//#endregion
//#region src/components/NavigationMenu/NavigationMenu.css.ts
const enterFromRight = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "translateX(200px)"
	},
	to: {
		opacity: "1",
		transform: "translateX(0)"
	}
});
const enterFromLeft = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "translateX(-200px)"
	},
	to: {
		opacity: "1",
		transform: "translateX(0)"
	}
});
const scaleIn = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "rotateX(-30deg) scale(0.9)"
	},
	to: {
		opacity: "1",
		transform: "rotateX(0deg) scale(1)"
	}
});
const scaleOut = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "1",
		transform: "rotateX(0deg) scale(1)"
	},
	to: {
		opacity: "0",
		transform: "rotateX(-10deg) scale(0.95)"
	}
});
const navigationMenuRoot = (0, _vanilla_extract_css.style)({
	position: "relative",
	display: "flex",
	justifyContent: "center",
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown
});
const navigationMenuList = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	listStyle: "none",
	margin: 0,
	padding: _hydrotik_tokens.vars.space["1"],
	borderRadius: _hydrotik_tokens.vars.radii.md,
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`
});
const navigationMenuTrigger = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2_5"]}`,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	outline: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[data-state=\"open\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "-2px"
		}
	}
});
const navigationMenuLink = (0, _vanilla_extract_css.style)([navigationMenuTrigger, { textDecoration: "none" }]);
const navigationMenuContent = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: "100%",
	left: 0,
	width: "auto",
	selectors: {
		"&[data-motion=\"from-start\"]": { animation: `${enterFromLeft} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` },
		"&[data-motion=\"from-end\"]": { animation: `${enterFromRight} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` },
		"&[data-motion=\"to-start\"]": {
			animation: `${enterFromRight} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
			animationDirection: "reverse"
		},
		"&[data-motion=\"to-end\"]": {
			animation: `${enterFromLeft} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
			animationDirection: "reverse"
		}
	}
});
const navigationMenuViewport = (0, _vanilla_extract_css.style)({
	position: "relative",
	marginTop: _hydrotik_tokens.vars.space["2"],
	width: "var(--radix-navigation-menu-viewport-width)",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	height: "var(--radix-navigation-menu-viewport-height)",
	transition: `width ${_hydrotik_tokens.vars.motion.duration.normal}, height ${_hydrotik_tokens.vars.motion.duration.normal}`,
	selectors: {
		"&[data-state=\"open\"]": { animation: `${scaleIn} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` },
		"&[data-state=\"closed\"]": { animation: `${scaleOut} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` }
	}
});
const navigationMenuIndicator = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	height: "10px",
	top: "100%",
	overflow: "hidden",
	zIndex: 1,
	transition: `width ${_hydrotik_tokens.vars.motion.duration.normal}, transform ${_hydrotik_tokens.vars.motion.duration.normal}`
});
const navigationMenuIndicatorArrow = (0, _vanilla_extract_css.style)({
	position: "relative",
	top: "70%",
	width: "10px",
	height: "10px",
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderBottomColor: "transparent",
	borderRightColor: "transparent",
	transform: "rotate(45deg)",
	borderRadius: `${_hydrotik_tokens.vars.radii.sm} 0 0 0`
});

//#endregion
//#region src/components/NavigationMenu/NavigationMenu.tsx
const NavigationMenu = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_navigation_menu.Root, {
	ref,
	className: [navigationMenuRoot, className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NavigationMenuViewport, {})]
}));
NavigationMenu.displayName = "NavigationMenu";
const NavigationMenuList = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_navigation_menu.List, {
	ref,
	className: [navigationMenuList, className].filter(Boolean).join(" "),
	...props
}));
NavigationMenuList.displayName = "NavigationMenuList";
const NavigationMenuItem = _radix_ui_react_navigation_menu.Item;
const NavigationMenuTrigger = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_navigation_menu.Trigger, {
	ref,
	className: [navigationMenuTrigger, className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
		size: 12,
		"aria-hidden": true,
		style: { transition: "transform 200ms" }
	})]
}));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
const NavigationMenuContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_navigation_menu.Content, {
	ref,
	className: [navigationMenuContent, className].filter(Boolean).join(" "),
	...props
}));
NavigationMenuContent.displayName = "NavigationMenuContent";
const NavigationMenuLink = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_navigation_menu.Link, {
	ref,
	className: [navigationMenuLink, className].filter(Boolean).join(" "),
	...props
}));
NavigationMenuLink.displayName = "NavigationMenuLink";
const NavigationMenuViewport = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	style: {
		position: "absolute",
		left: 0,
		top: "100%",
		display: "flex",
		justifyContent: "center",
		width: "100%"
	},
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_navigation_menu.Viewport, {
		ref,
		className: [navigationMenuViewport, className].filter(Boolean).join(" "),
		...props
	})
}));
NavigationMenuViewport.displayName = "NavigationMenuViewport";
const NavigationMenuIndicator = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_navigation_menu.Indicator, {
	ref,
	className: [navigationMenuIndicator, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: navigationMenuIndicatorArrow })
}));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

//#endregion
//#region src/components/Pagination/Pagination.css.ts
const paginationNav = (0, _vanilla_extract_css.style)({
	display: "flex",
	justifyContent: "center",
	width: "100%"
});
const paginationContent = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	listStyle: "none",
	margin: 0,
	padding: 0
});
const paginationItem = (0, _vanilla_extract_css.style)({ display: "inline-flex" });
const paginationLink = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: _hydrotik_tokens.vars.space["1"],
		minWidth: _hydrotik_tokens.vars.space["8"],
		height: _hydrotik_tokens.vars.space["8"],
		paddingLeft: _hydrotik_tokens.vars.space["2_5"],
		paddingRight: _hydrotik_tokens.vars.space["2_5"],
		borderRadius: _hydrotik_tokens.vars.radii.md,
		border: `1px solid transparent`,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		fontWeight: _hydrotik_tokens.vars.font.weight.medium,
		color: _hydrotik_tokens.vars.color.text,
		backgroundColor: "transparent",
		cursor: "pointer",
		textDecoration: "none",
		transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
		selectors: {
			"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
			"&:focus-visible": {
				outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
				outlineOffset: "2px"
			}
		}
	},
	variants: { isActive: {
		true: {
			borderColor: _hydrotik_tokens.vars.color.border,
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover
		},
		false: {}
	} },
	defaultVariants: { isActive: false }
});
const paginationEllipsis = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: _hydrotik_tokens.vars.space["8"],
	height: _hydrotik_tokens.vars.space["8"],
	color: _hydrotik_tokens.vars.color.textMuted,
	fontSize: _hydrotik_tokens.vars.font.size.sm
});

//#endregion
//#region src/components/Pagination/Pagination.tsx
const Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: [paginationNav, className].filter(Boolean).join(" "),
	...props
});
Pagination.displayName = "Pagination";
const PaginationContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
	ref,
	className: [paginationContent, className].filter(Boolean).join(" "),
	...props
}));
PaginationContent.displayName = "PaginationContent";
const PaginationItem = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
	ref,
	className: [paginationItem, className].filter(Boolean).join(" "),
	...props
}));
PaginationItem.displayName = "PaginationItem";
const PaginationLink = ({ isActive = false, className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
	"aria-current": isActive ? "page" : void 0,
	className: [paginationLink({ isActive }), className].filter(Boolean).join(" "),
	...props
});
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to previous page",
	className,
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Previous" })]
});
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to next page",
	className,
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Next" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })]
});
PaginationNext.displayName = "PaginationNext";
const PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
	"aria-hidden": true,
	className: [paginationEllipsis, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.MoreHorizontal, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";

//#endregion
//#region src/components/Popover/Popover.css.ts
const fadeIn$1 = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "scale(0.96) translateY(-2px)"
	},
	to: {
		opacity: 1,
		transform: "scale(1) translateY(0)"
	}
});
const popoverContent = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	padding: _hydrotik_tokens.vars.space["3"],
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	maxWidth: "280px",
	width: "var(--radix-popover-trigger-width, auto)",
	animationName: fadeIn$1,
	animationDuration: _hydrotik_tokens.vars.motion.duration.normal,
	animationTimingFunction: _hydrotik_tokens.vars.motion.easing.default,
	outline: "none"
});
const popoverArrow = (0, _vanilla_extract_css.style)({
	fill: _hydrotik_tokens.vars.color.surfaceElevated,
	filter: `drop-shadow(0 1px 0 ${_hydrotik_tokens.vars.color.border})`
});
const popoverClose = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: _hydrotik_tokens.vars.space["2"],
	right: _hydrotik_tokens.vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "24px",
	height: "24px",
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	border: "none",
	backgroundColor: "transparent",
	color: _hydrotik_tokens.vars.color.textMuted,
	cursor: "pointer",
	outline: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": {
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
			color: _hydrotik_tokens.vars.color.text
		},
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
		}
	}
});

//#endregion
//#region src/components/Popover/Popover.tsx
const Popover = _radix_ui_react_popover.Root;
const PopoverTrigger = _radix_ui_react_popover.Trigger;
const PopoverAnchor = _radix_ui_react_popover.Anchor;
const PopoverContent = react.default.forwardRef(({ className, align = "center", sideOffset = 4, showArrow = false, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_popover.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_popover.Content, {
	ref,
	align,
	sideOffset,
	className: [popoverContent, className].filter(Boolean).join(" "),
	...props,
	children: [props.children, showArrow && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_popover.Arrow, { className: popoverArrow })]
}) }));
PopoverContent.displayName = "PopoverContent";
const PopoverClose = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_popover.Close, {
	ref,
	className: [popoverClose, className].filter(Boolean).join(" "),
	"aria-label": "Close",
	...props,
	children: children ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: 14 })
}));
PopoverClose.displayName = "PopoverClose";

//#endregion
//#region src/components/Progress/Progress.css.ts
/**
* Progress — shadcn v4 aligned.
* Track: primary/20 (20% of primary color)
* Indicator: solid primary
* Height: 8px (h-2)
*/
const progressRoot = (0, _vanilla_extract_css.style)({
	position: "relative",
	width: "100%",
	height: "8px",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.primary} 20%, transparent)`
});
const progressIndicator = (0, _vanilla_extract_css.style)({
	height: "100%",
	width: "100%",
	flex: 1,
	backgroundColor: _hydrotik_tokens.vars.color.primary,
	transition: `all ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
});

//#endregion
//#region src/components/Progress/Progress.tsx
const Progress = react.default.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_progress.Root, {
	ref,
	className: [progressRoot, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_progress.Indicator, {
		className: progressIndicator,
		style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
	})
}));
Progress.displayName = "Progress";

//#endregion
//#region src/components/RadioGroup/RadioGroup.css.ts
/**
* RadioGroup — shadcn v4 aligned.
* 16px circle, shadow-xs, primary border when checked, inner dot.
*/
const radioGroupRoot = (0, _vanilla_extract_css.style)({
	display: "grid",
	gap: _hydrotik_tokens.vars.space["2"],
	width: "100%"
});
const radioGroupItem = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "16px",
	height: "16px",
	aspectRatio: "1",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	boxShadow: _hydrotik_tokens.vars.shadow.xs,
	cursor: "pointer",
	flexShrink: 0,
	outline: "none",
	transition: `box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:focus-visible": {
			borderColor: _hydrotik_tokens.vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
		},
		"&[data-state=\"checked\"]": { borderColor: _hydrotik_tokens.vars.color.primary },
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});
const radioGroupIndicator = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	selectors: { "&::after": {
		content: "\"\"",
		display: "block",
		width: "8px",
		height: "8px",
		borderRadius: _hydrotik_tokens.vars.radii.full,
		backgroundColor: _hydrotik_tokens.vars.color.primary
	} }
});

//#endregion
//#region src/components/RadioGroup/RadioGroup.tsx
const RadioGroup = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_radio_group.Root, {
	ref,
	className: [radioGroupRoot, className].filter(Boolean).join(" "),
	...props
}));
RadioGroup.displayName = "RadioGroup";
const RadioGroupItem = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_radio_group.Item, {
	ref,
	className: [radioGroupItem, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_radio_group.Indicator, { className: radioGroupIndicator })
}));
RadioGroupItem.displayName = "RadioGroupItem";

//#endregion
//#region src/components/ScrollArea/ScrollArea.css.ts
const scrollAreaRoot = (0, _vanilla_extract_css.style)({
	position: "relative",
	overflow: "hidden"
});
const scrollAreaViewport = (0, _vanilla_extract_css.style)({
	width: "100%",
	height: "100%",
	borderRadius: "inherit"
});
const scrollAreaScrollbar = (0, _vanilla_extract_css.style)({
	display: "flex",
	userSelect: "none",
	touchAction: "none",
	padding: "1px",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-orientation=\"vertical\"]": {
			width: "8px",
			borderLeft: "1px solid transparent"
		},
		"&[data-orientation=\"horizontal\"]": {
			height: "8px",
			flexDirection: "column",
			borderTop: "1px solid transparent"
		},
		"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover }
	}
});
const scrollAreaThumb = (0, _vanilla_extract_css.style)({
	position: "relative",
	flex: 1,
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.border,
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: { "&:hover": { backgroundColor: _hydrotik_tokens.vars.color.textMuted } }
});
const scrollAreaCorner = (0, _vanilla_extract_css.style)({ backgroundColor: "transparent" });

//#endregion
//#region src/components/ScrollArea/ScrollArea.tsx
const ScrollArea = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_scroll_area.Root, {
	ref,
	className: [scrollAreaRoot, className].filter(Boolean).join(" "),
	...props,
	children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_scroll_area.Viewport, {
			className: scrollAreaViewport,
			children
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_scroll_area.Corner, { className: scrollAreaCorner })
	]
}));
ScrollArea.displayName = "ScrollArea";
const ScrollBar = react.default.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_scroll_area.ScrollAreaScrollbar, {
	ref,
	orientation,
	className: [scrollAreaScrollbar, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_scroll_area.ScrollAreaThumb, { className: scrollAreaThumb })
}));
ScrollBar.displayName = "ScrollBar";

//#endregion
//#region src/components/Select/Select.css.ts
const slideDownAndFade = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "translateY(-4px)"
	},
	to: {
		opacity: 1,
		transform: "translateY(0)"
	}
});
const slideUpAndFade = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "translateY(4px)"
	},
	to: {
		opacity: 1,
		transform: "translateY(0)"
	}
});
/**
* Select — shadcn v4 aligned.
* - Trigger: shadow-xs, border-input, dark bg
* - Content: bg-popover (surfaceElevated)
* - Labels: no uppercase
* - Item highlight: ghostHover, no text color change
*/
const selectTrigger = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: _hydrotik_tokens.vars.space["2"],
		width: "100%",
		borderRadius: _hydrotik_tokens.vars.radii.md,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		backgroundColor: _hydrotik_tokens.vars.color.input,
		color: _hydrotik_tokens.vars.color.text,
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
		boxShadow: _hydrotik_tokens.vars.shadow.xs,
		cursor: "default",
		outline: "none",
		whiteSpace: "nowrap",
		transition: `color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
		selectors: {
			"&:focus-visible": {
				borderColor: _hydrotik_tokens.vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
			},
			"&[data-placeholder]": { color: _hydrotik_tokens.vars.color.placeholder },
			"&[data-disabled]": {
				opacity: "0.5",
				cursor: "not-allowed",
				pointerEvents: "none"
			}
		}
	},
	variants: {
		size: {
			sm: {
				height: _hydrotik_tokens.vars.space["7"],
				padding: `0 ${_hydrotik_tokens.vars.space["2"]}`,
				fontSize: _hydrotik_tokens.vars.font.size.xs
			},
			md: {
				height: _hydrotik_tokens.vars.space["8"],
				padding: `0 ${_hydrotik_tokens.vars.space["3"]}`
			},
			lg: {
				height: _hydrotik_tokens.vars.space["10"],
				padding: `0 ${_hydrotik_tokens.vars.space["3"]}`,
				fontSize: _hydrotik_tokens.vars.font.size.sm
			}
		},
		isError: { true: {
			borderColor: _hydrotik_tokens.vars.color.destructive,
			selectors: { "&:focus-visible": {
				borderColor: _hydrotik_tokens.vars.color.destructive,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.destructive} 20%, transparent)`
			} }
		} }
	},
	defaultVariants: {
		size: "md",
		isError: false
	}
});
const selectContent = (0, _vanilla_extract_css.style)({
	overflow: "hidden",
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	boxShadow: _hydrotik_tokens.vars.shadow.md,
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	minWidth: "var(--radix-select-trigger-width)",
	maxHeight: "var(--radix-select-content-available-height)",
	animationDuration: _hydrotik_tokens.vars.motion.duration.normal,
	animationTimingFunction: _hydrotik_tokens.vars.motion.easing.default,
	selectors: {
		"&[data-state=\"open\"][data-side=\"bottom\"]": { animationName: slideDownAndFade },
		"&[data-state=\"open\"][data-side=\"top\"]": { animationName: slideUpAndFade }
	}
});
const selectViewport = (0, _vanilla_extract_css.style)({ padding: _hydrotik_tokens.vars.space["1"] });
const selectItem = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"],
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	paddingRight: _hydrotik_tokens.vars.space["8"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.text,
	cursor: "default",
	userSelect: "none",
	position: "relative",
	outline: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[data-disabled]": {
			opacity: "0.5",
			pointerEvents: "none"
		}
	}
});
const selectItemIndicator = (0, _vanilla_extract_css.style)({
	position: "absolute",
	right: _hydrotik_tokens.vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "14px",
	height: "14px"
});
const selectLabel = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	color: _hydrotik_tokens.vars.color.textMuted
});
const selectSeparator = (0, _vanilla_extract_css.style)({
	height: "1px",
	backgroundColor: _hydrotik_tokens.vars.color.borderSubtle,
	margin: `${_hydrotik_tokens.vars.space["1"]} -${_hydrotik_tokens.vars.space["1"]}`
});
const selectScrollButton = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "25px",
	cursor: "default",
	color: _hydrotik_tokens.vars.color.textMuted
});
const selectIcon = (0, _vanilla_extract_css.style)({
	color: _hydrotik_tokens.vars.color.textMuted,
	flexShrink: 0,
	opacity: "0.5"
});

//#endregion
//#region src/components/Select/Select.tsx
const Select = _radix_ui_react_select.Root;
const SelectGroup = _radix_ui_react_select.Group;
const SelectValue = _radix_ui_react_select.Value;
const SelectTrigger = react.default.forwardRef(({ className, children, size = "md", isError = false, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_select.Trigger, {
	ref,
	className: [selectTrigger({
		size,
		isError
	}), className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Icon, {
		className: selectIcon,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, { size: 16 })
	})]
}));
SelectTrigger.displayName = "SelectTrigger";
const SelectScrollUpButton = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ScrollUpButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUp, { size: 16 })
}));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
const SelectScrollDownButton = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ScrollDownButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, { size: 16 })
}));
SelectScrollDownButton.displayName = "SelectScrollDownButton";
const SelectContent = react.default.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_select.Content, {
	ref,
	className: [selectContent, className].filter(Boolean).join(" "),
	position,
	sideOffset: 4,
	...props,
	children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Viewport, {
			className: selectViewport,
			children
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = "SelectContent";
const SelectLabel = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Label, {
	ref,
	className: [selectLabel, className].filter(Boolean).join(" "),
	...props
}));
SelectLabel.displayName = "SelectLabel";
const SelectItem = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_select.Item, {
	ref,
	className: [selectItem, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: selectItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { size: 16 }) })
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ItemText, { children })]
}));
SelectItem.displayName = "SelectItem";
const SelectSeparator = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Separator, {
	ref,
	className: [selectSeparator, className].filter(Boolean).join(" "),
	...props
}));
SelectSeparator.displayName = "SelectSeparator";

//#endregion
//#region src/components/Separator/Separator.css.ts
const separatorRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		backgroundColor: _hydrotik_tokens.vars.color.borderSubtle,
		flexShrink: 0
	},
	variants: { orientation: {
		horizontal: {
			height: "1px",
			width: "100%"
		},
		vertical: {
			height: "100%",
			width: "1px"
		}
	} },
	defaultVariants: { orientation: "horizontal" }
});

//#endregion
//#region src/components/Separator/Separator.tsx
const Separator = react.default.forwardRef(({ orientation = "horizontal", decorative = true, className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_separator.Root, {
	ref,
	orientation,
	decorative,
	className: [separatorRecipe({ orientation }), className].filter(Boolean).join(" "),
	...props
}));
Separator.displayName = "Separator";

//#endregion
//#region src/components/Sheet/Sheet.css.ts
const overlayShow = (0, _vanilla_extract_css.keyframes)({
	from: { opacity: "0" },
	to: { opacity: "1" }
});
/**
* Sheet — shadcn v4 aligned.
* - Overlay: black/50
* - Content: bg-background (not surfaceOverlay)
* - Side-based animations
*/
const sheetOverlay = (0, _vanilla_extract_css.style)({
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	position: "fixed",
	inset: 0,
	zIndex: _hydrotik_tokens.vars.zIndex.overlay,
	animation: `${overlayShow} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
});
const slideInFromRight$1 = (0, _vanilla_extract_css.keyframes)({
	from: { transform: "translateX(100%)" },
	to: { transform: "translateX(0)" }
});
const slideInFromLeft = (0, _vanilla_extract_css.keyframes)({
	from: { transform: "translateX(-100%)" },
	to: { transform: "translateX(0)" }
});
const slideInFromTop = (0, _vanilla_extract_css.keyframes)({
	from: { transform: "translateY(-100%)" },
	to: { transform: "translateY(0)" }
});
const slideInFromBottom = (0, _vanilla_extract_css.keyframes)({
	from: { transform: "translateY(100%)" },
	to: { transform: "translateY(0)" }
});
const sheetContent = (0, _vanilla_extract_recipes.recipe)({
	base: {
		position: "fixed",
		zIndex: _hydrotik_tokens.vars.zIndex.modal,
		backgroundColor: _hydrotik_tokens.vars.color.background,
		boxShadow: _hydrotik_tokens.vars.shadow.lg,
		display: "flex",
		flexDirection: "column",
		gap: _hydrotik_tokens.vars.space["4"],
		outline: "none"
	},
	variants: { side: {
		right: {
			top: 0,
			right: 0,
			height: "100%",
			width: "75%",
			maxWidth: "24rem",
			borderLeft: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromRight$1} 500ms ${_hydrotik_tokens.vars.motion.easing.default}`
		},
		left: {
			top: 0,
			left: 0,
			height: "100%",
			width: "75%",
			maxWidth: "24rem",
			borderRight: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromLeft} 500ms ${_hydrotik_tokens.vars.motion.easing.default}`
		},
		top: {
			top: 0,
			left: 0,
			right: 0,
			height: "auto",
			borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromTop} 500ms ${_hydrotik_tokens.vars.motion.easing.default}`
		},
		bottom: {
			bottom: 0,
			left: 0,
			right: 0,
			height: "auto",
			borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromBottom} 500ms ${_hydrotik_tokens.vars.motion.easing.default}`
		}
	} },
	defaultVariants: { side: "right" }
});
const sheetHeader = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space["1_5"],
	padding: _hydrotik_tokens.vars.space["4"]
});
const sheetFooter = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space["2"],
	padding: _hydrotik_tokens.vars.space["4"],
	marginTop: "auto"
});
const sheetBody = (0, _vanilla_extract_css.style)({
	flex: 1,
	overflow: "auto",
	padding: `0 ${_hydrotik_tokens.vars.space["4"]}`
});
const sheetTitle = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.md,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text
});
const sheetDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted
});
const sheetClose = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: _hydrotik_tokens.vars.space["4"],
	right: _hydrotik_tokens.vars.space["4"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: _hydrotik_tokens.vars.space["6"],
	height: _hydrotik_tokens.vars.space["6"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	opacity: "0.7",
	transition: `opacity ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { opacity: "1" },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
		}
	}
});

//#endregion
//#region src/components/Sheet/Sheet.tsx
const Sheet = _radix_ui_react_dialog.Root;
const SheetTrigger = _radix_ui_react_dialog.Trigger;
const SheetClose = _radix_ui_react_dialog.Close;
const SheetPortal = _radix_ui_react_dialog.Portal;
const SheetOverlay = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Overlay, {
	ref,
	className: [sheetOverlay, className].filter(Boolean).join(" "),
	...props
}));
SheetOverlay.displayName = "SheetOverlay";
const SheetContent = react.default.forwardRef(({ side = "right", showCloseButton = true, className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Content, {
	ref,
	className: [sheetContent({ side }), className].filter(Boolean).join(" "),
	...props,
	children: [children, showCloseButton && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Close, {
		className: sheetClose,
		"aria-label": "Close",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = "SheetContent";
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [sheetHeader, className].filter(Boolean).join(" "),
	...props
});
SheetHeader.displayName = "SheetHeader";
const SheetBody = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [sheetBody, className].filter(Boolean).join(" "),
	...props
});
SheetBody.displayName = "SheetBody";
const SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [sheetFooter, className].filter(Boolean).join(" "),
	...props
});
SheetFooter.displayName = "SheetFooter";
const SheetTitle = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Title, {
	ref,
	className: [sheetTitle, className].filter(Boolean).join(" "),
	...props
}));
SheetTitle.displayName = "SheetTitle";
const SheetDescription = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Description, {
	ref,
	className: [sheetDescription, className].filter(Boolean).join(" "),
	...props
}));
SheetDescription.displayName = "SheetDescription";

//#endregion
//#region src/components/Skeleton/Skeleton.css.ts
const pulse = (0, _vanilla_extract_css.keyframes)({
	"0%, 100%": { opacity: "1" },
	"50%": { opacity: "0.5" }
});
const skeleton = (0, _vanilla_extract_css.style)({
	borderRadius: _hydrotik_tokens.vars.radii.md,
	backgroundColor: _hydrotik_tokens.vars.color.secondary,
	animation: `${pulse} 2s ${_hydrotik_tokens.vars.motion.easing.default} infinite`
});

//#endregion
//#region src/components/Skeleton/Skeleton.tsx
const Skeleton = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [skeleton, className].filter(Boolean).join(" "),
	...props
}));
Skeleton.displayName = "Skeleton";

//#endregion
//#region src/components/Slider/Slider.css.ts
/**
* Slider — shadcn v4 aligned.
* Track: bg-muted (secondary), h-1.5
* Range: bg-primary
* Thumb: white bg, primary border, ring on hover/focus
*/
const sliderRoot = (0, _vanilla_extract_css.style)({
	position: "relative",
	display: "flex",
	width: "100%",
	touchAction: "none",
	userSelect: "none",
	alignItems: "center",
	selectors: { "&[data-disabled]": {
		opacity: "0.5",
		cursor: "not-allowed"
	} }
});
const sliderTrack = (0, _vanilla_extract_css.style)({
	position: "relative",
	height: "6px",
	width: "100%",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.secondary
});
const sliderRange = (0, _vanilla_extract_css.style)({
	position: "absolute",
	height: "100%",
	backgroundColor: _hydrotik_tokens.vars.color.primary
});
const sliderThumb = (0, _vanilla_extract_css.style)({
	display: "block",
	width: "16px",
	height: "16px",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: "#ffffff",
	border: `2px solid ${_hydrotik_tokens.vars.color.primary}`,
	boxShadow: _hydrotik_tokens.vars.shadow.sm,
	transition: `color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	outline: "none",
	selectors: {
		"&:hover": { boxShadow: `0 0 0 4px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)` },
		"&:focus-visible": { boxShadow: `0 0 0 4px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)` },
		"&:disabled": {
			opacity: "0.5",
			pointerEvents: "none"
		}
	}
});

//#endregion
//#region src/components/Slider/Slider.tsx
const Slider = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_slider.Root, {
	ref,
	className: [sliderRoot, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slider.Track, {
		className: sliderTrack,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slider.Range, { className: sliderRange })
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slider.Thumb, { className: sliderThumb })]
}));
Slider.displayName = "Slider";

//#endregion
//#region src/components/Spinner/Spinner.css.ts
const spin = (0, _vanilla_extract_css.keyframes)({ to: { transform: "rotate(360deg)" } });
const spinnerRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-block",
		borderRadius: _hydrotik_tokens.vars.radii.full,
		border: "2px solid currentColor",
		borderTopColor: "transparent",
		animation: `${spin} 0.6s linear infinite`,
		flexShrink: 0
	},
	variants: { size: {
		sm: {
			width: "14px",
			height: "14px"
		},
		md: {
			width: "20px",
			height: "20px"
		},
		lg: {
			width: "28px",
			height: "28px"
		},
		xl: {
			width: "40px",
			height: "40px"
		}
	} },
	defaultVariants: { size: "md" }
});

//#endregion
//#region src/components/Spinner/Spinner.tsx
const Spinner = react.default.forwardRef(({ size = "md", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	ref,
	role: "status",
	"aria-label": "Loading",
	className: [spinnerRecipe({ size }), className].filter(Boolean).join(" "),
	...props
}));
Spinner.displayName = "Spinner";

//#endregion
//#region src/components/Switch/Switch.css.ts
/**
* Switch — shadcn v4 aligned.
* - Unchecked: bg-input (border-ish color)
* - Checked: bg-primary
* - Border transparent, shadow-xs, rounded-full
* - Default: 32x18px, thumb 16px
*/
const switchRoot = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	width: "32px",
	height: "18px",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.border,
	border: "1px solid transparent",
	padding: 0,
	cursor: "pointer",
	flexShrink: 0,
	boxShadow: _hydrotik_tokens.vars.shadow.xs,
	outline: "none",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"checked\"]": { backgroundColor: _hydrotik_tokens.vars.color.primary },
		"&:focus-visible": {
			borderColor: _hydrotik_tokens.vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});
const switchThumb = (0, _vanilla_extract_css.style)({
	display: "block",
	width: "16px",
	height: "16px",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.background,
	boxShadow: _hydrotik_tokens.vars.shadow.sm,
	pointerEvents: "none",
	transition: `transform ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"checked\"]": { transform: "translateX(calc(100% - 2px))" },
		"&[data-state=\"unchecked\"]": { transform: "translateX(0)" }
	}
});

//#endregion
//#region src/components/Switch/Switch.tsx
const Switch = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_switch.Root, {
	ref,
	className: [switchRoot, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_switch.Thumb, { className: switchThumb })
}));
Switch.displayName = "Switch";

//#endregion
//#region src/components/Table/Table.css.ts
/**
* Table — shadcn v4 aligned.
* - Simple overflow wrapper, no border on wrapper
* - th: text-foreground, font-medium, no uppercase, h-10
* - Hover: bg-muted/50 (ghostHover)
* - Selected: bg-muted (secondary)
*/
const tableWrapper = (0, _vanilla_extract_css.style)({
	position: "relative",
	width: "100%",
	overflowX: "auto"
});
const table$1 = (0, _vanilla_extract_css.style)({
	width: "100%",
	borderCollapse: "collapse",
	captionSide: "bottom",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.text
});
const tableCaption = (0, _vanilla_extract_css.style)({
	marginTop: _hydrotik_tokens.vars.space["4"],
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	textAlign: "center"
});
const tableHeader = (0, _vanilla_extract_css.style)({ borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}` });
const tableBody = (0, _vanilla_extract_css.style)({});
(0, _vanilla_extract_css.globalStyle)(`${tableBody} tr:last-child`, { borderBottom: "none" });
const tableFooter = (0, _vanilla_extract_css.style)({
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.secondary} 50%, transparent)`,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium
});
(0, _vanilla_extract_css.globalStyle)(`${tableFooter} tr:last-child`, { borderBottom: "none" });
const tableRow = (0, _vanilla_extract_css.style)({
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"selected\"]": { backgroundColor: _hydrotik_tokens.vars.color.secondary },
		"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover }
	}
});
const tableHead = (0, _vanilla_extract_css.style)({
	height: _hydrotik_tokens.vars.space["10"],
	padding: `0 ${_hydrotik_tokens.vars.space["2"]}`,
	textAlign: "left",
	verticalAlign: "middle",
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.text,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	whiteSpace: "nowrap",
	selectors: { "&:has([role=checkbox])": { paddingRight: 0 } }
});
const tableCell = (0, _vanilla_extract_css.style)({
	padding: _hydrotik_tokens.vars.space["2"],
	verticalAlign: "middle",
	whiteSpace: "nowrap",
	selectors: { "&:has([role=checkbox])": { paddingRight: 0 } }
});

//#endregion
//#region src/components/Table/Table.tsx
const TableWrapper = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: [tableWrapper, className].filter(Boolean).join(" "),
	...props
});
TableWrapper.displayName = "TableWrapper";
const Table = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("table", {
	ref,
	className: [table$1, className].filter(Boolean).join(" "),
	...props
}));
Table.displayName = "Table";
const TableCaption = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("caption", {
	ref,
	className: [tableCaption, className].filter(Boolean).join(" "),
	...props
}));
TableCaption.displayName = "TableCaption";
const TableHeader = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", {
	ref,
	className: [tableHeader, className].filter(Boolean).join(" "),
	...props
}));
TableHeader.displayName = "TableHeader";
const TableBody = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", {
	ref,
	className: [tableBody, className].filter(Boolean).join(" "),
	...props
}));
TableBody.displayName = "TableBody";
const TableFooter = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tfoot", {
	ref,
	className: [tableFooter, className].filter(Boolean).join(" "),
	...props
}));
TableFooter.displayName = "TableFooter";
const TableRow = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", {
	ref,
	className: [tableRow, className].filter(Boolean).join(" "),
	...props
}));
TableRow.displayName = "TableRow";
const TableHead = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
	ref,
	className: [tableHead, className].filter(Boolean).join(" "),
	...props
}));
TableHead.displayName = "TableHead";
const TableCell = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
	ref,
	className: [tableCell, className].filter(Boolean).join(" "),
	...props
}));
TableCell.displayName = "TableCell";

//#endregion
//#region src/components/Tabs/Tabs.css.ts
/**
* Tabs — shadcn v4 aligned.
* - List: bg-muted (secondary), rounded-lg, 3px padding, no border
* - Trigger: data-[state=active] gets bg-background + shadow-sm
* - h-9 compact
*/
const tabsList = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	backgroundColor: _hydrotik_tokens.vars.color.secondary,
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	padding: "3px",
	gap: _hydrotik_tokens.vars.space["0_5"],
	height: _hydrotik_tokens.vars.space["8"],
	color: _hydrotik_tokens.vars.color.textMuted
});
const tabsTrigger = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	flex: 1,
	height: "calc(100% - 1px)",
	paddingLeft: _hydrotik_tokens.vars.space["2"],
	paddingRight: _hydrotik_tokens.vars.space["2"],
	paddingTop: _hydrotik_tokens.vars.space["1"],
	paddingBottom: _hydrotik_tokens.vars.space["1"],
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: "1px solid transparent",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.textMuted,
	cursor: "pointer",
	backgroundColor: "transparent",
	whiteSpace: "nowrap",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	outline: "none",
	gap: _hydrotik_tokens.vars.space["1_5"],
	selectors: {
		"&:hover": { color: _hydrotik_tokens.vars.color.text },
		"&[data-state=\"active\"]": {
			color: _hydrotik_tokens.vars.color.text,
			backgroundColor: _hydrotik_tokens.vars.color.background,
			boxShadow: _hydrotik_tokens.vars.shadow.sm
		},
		"&:focus-visible": {
			borderColor: _hydrotik_tokens.vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
			pointerEvents: "none"
		}
	}
});
const tabsContent = (0, _vanilla_extract_css.style)({
	flex: 1,
	outline: "none"
});

//#endregion
//#region src/components/Tabs/Tabs.tsx
const Tabs = _radix_ui_react_tabs.Root;
const TabsList = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tabs.List, {
	ref,
	className: [tabsList, className].filter(Boolean).join(" "),
	...props
}));
TabsList.displayName = "TabsList";
const TabsTrigger = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tabs.Trigger, {
	ref,
	className: [tabsTrigger, className].filter(Boolean).join(" "),
	...props
}));
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tabs.Content, {
	ref,
	className: [tabsContent, className].filter(Boolean).join(" "),
	...props
}));
TabsContent.displayName = "TabsContent";

//#endregion
//#region src/components/Textarea/Textarea.css.ts
/**
* Textarea — shadcn v4 aligned.
* border-input, shadow-xs, focus ring pattern.
*/
const textarea = (0, _vanilla_extract_css.style)({
	width: "100%",
	minHeight: "4rem",
	padding: `${_hydrotik_tokens.vars.space["2"]} ${_hydrotik_tokens.vars.space["3"]}`,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	color: _hydrotik_tokens.vars.color.text,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	resize: "vertical",
	boxShadow: _hydrotik_tokens.vars.shadow.xs,
	outline: "none",
	transition: `color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&::placeholder": { color: _hydrotik_tokens.vars.color.placeholder },
		"&:focus-visible": {
			borderColor: _hydrotik_tokens.vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
			pointerEvents: "none"
		},
		"&[aria-invalid=\"true\"]": {
			borderColor: _hydrotik_tokens.vars.color.destructive,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.destructive} 20%, transparent)`
		}
	}
});

//#endregion
//#region src/components/Textarea/Textarea.tsx
const Textarea = (0, react.forwardRef)(({ className, error, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
	ref,
	className: [textarea, className].filter(Boolean).join(" "),
	"aria-invalid": error || void 0,
	...props
}));
Textarea.displayName = "Textarea";

//#endregion
//#region src/components/Toast/Toast.css.ts
const slideInFromRight = (0, _vanilla_extract_css.keyframes)({
	from: { transform: "translateX(calc(100% + 24px))" },
	to: { transform: "translateX(0)" }
});
const swipeOut = (0, _vanilla_extract_css.keyframes)({
	from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
	to: { transform: "translateX(calc(100% + 24px))" }
});
const fadeOut = (0, _vanilla_extract_css.keyframes)({
	from: { opacity: 1 },
	to: { opacity: 0 }
});
const toastViewport = (0, _vanilla_extract_css.style)({
	position: "fixed",
	bottom: 0,
	right: 0,
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space[2],
	padding: _hydrotik_tokens.vars.space["4"],
	maxWidth: "380px",
	margin: 0,
	listStyle: "none",
	zIndex: _hydrotik_tokens.vars.zIndex.toast,
	outline: "none"
});
const toast = (0, _vanilla_extract_recipes.recipe)({
	base: {
		position: "relative",
		display: "grid",
		gridTemplateColumns: "auto 1fr auto",
		alignItems: "start",
		gap: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
		padding: _hydrotik_tokens.vars.space["3"],
		borderRadius: _hydrotik_tokens.vars.radii.md,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		backgroundColor: _hydrotik_tokens.vars.color.surface,
		boxShadow: _hydrotik_tokens.vars.shadow.lg,
		overflow: "hidden",
		animationDuration: _hydrotik_tokens.vars.motion.duration.normal,
		animationTimingFunction: _hydrotik_tokens.vars.motion.easing.default,
		selectors: {
			"&[data-state=\"open\"]": { animationName: slideInFromRight },
			"&[data-state=\"closed\"]": { animationName: `${fadeOut}, ${swipeOut}` },
			"&[data-swipe=\"move\"]": { transform: "translateX(var(--radix-toast-swipe-move-x))" },
			"&[data-swipe=\"cancel\"]": {
				transform: "translateX(0)",
				transition: `transform ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
			},
			"&[data-swipe=\"end\"]": { animationName: swipeOut }
		}
	},
	variants: { variant: {
		default: {},
		success: { borderColor: _hydrotik_tokens.vars.color.success },
		destructive: {
			borderColor: _hydrotik_tokens.vars.color.destructive,
			backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.destructive} 8%, ${_hydrotik_tokens.vars.color.surface})`
		},
		warning: { borderColor: _hydrotik_tokens.vars.color.warning }
	} },
	defaultVariants: { variant: "default" }
});
const toastTitle = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight
});
const toastDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	gridColumn: "2"
});
const toastAction = (0, _vanilla_extract_css.style)({
	gridColumn: "2",
	display: "inline-flex",
	alignSelf: "end"
});
const toastClose = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: _hydrotik_tokens.vars.space[2],
	right: _hydrotik_tokens.vars.space[2],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	border: "none",
	backgroundColor: "transparent",
	color: _hydrotik_tokens.vars.color.textMuted,
	cursor: "pointer",
	outline: "none",
	opacity: 0,
	transition: `opacity ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"[data-state=\"open\"] &": { opacity: 1 },
		"&:hover": {
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
			color: _hydrotik_tokens.vars.color.text,
			opacity: 1
		},
		"&:focus-visible": {
			opacity: 1,
			outline: `2px solid ${_hydrotik_tokens.vars.color.primary}`,
			outlineOffset: "1px"
		}
	}
});

//#endregion
//#region src/components/Toast/Toast.tsx
const ToastProvider = _radix_ui_react_toast.Provider;
const ToastViewport = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toast.Viewport, {
	ref,
	className: [toastViewport, className].filter(Boolean).join(" "),
	...props
}));
ToastViewport.displayName = "ToastViewport";
const Toast = react.default.forwardRef(({ className, variant = "default", ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toast.Root, {
	ref,
	className: [toast({ variant }), className].filter(Boolean).join(" "),
	...props
}));
Toast.displayName = "Toast";
const ToastAction = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toast.Action, {
	ref,
	className: [toastAction, className].filter(Boolean).join(" "),
	...props
}));
ToastAction.displayName = "ToastAction";
const ToastClose = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toast.Close, {
	ref,
	className: [toastClose, className].filter(Boolean).join(" "),
	"aria-label": "Dismiss notification",
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: 14 })
}));
ToastClose.displayName = "ToastClose";
const ToastTitle = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toast.Title, {
	ref,
	className: [toastTitle, className].filter(Boolean).join(" "),
	...props
}));
ToastTitle.displayName = "ToastTitle";
const ToastDescription = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toast.Description, {
	ref,
	className: [toastDescription, className].filter(Boolean).join(" "),
	...props
}));
ToastDescription.displayName = "ToastDescription";

//#endregion
//#region src/components/Toggle/Toggle.css.ts
/**
* Toggle — shadcn v4 aligned.
* - hover: bg-muted (secondary) + text-muted
* - on: bg-accent (ghostHover) + text-foreground
* - outline: border + shadow-xs
*/
const toggleRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: _hydrotik_tokens.vars.space["2"],
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		fontWeight: _hydrotik_tokens.vars.font.weight.medium,
		borderRadius: _hydrotik_tokens.vars.radii.md,
		border: "none",
		backgroundColor: "transparent",
		color: _hydrotik_tokens.vars.color.textMuted,
		cursor: "pointer",
		whiteSpace: "nowrap",
		outline: "none",
		transition: `color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
		selectors: {
			"&:hover": {
				backgroundColor: _hydrotik_tokens.vars.color.secondary,
				color: _hydrotik_tokens.vars.color.textMuted
			},
			"&[data-state=\"on\"]": {
				backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
				color: _hydrotik_tokens.vars.color.text
			},
			"&:focus-visible": {
				borderColor: _hydrotik_tokens.vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${_hydrotik_tokens.vars.color.focusRing} 50%, transparent)`
			},
			"&:disabled": {
				opacity: "0.5",
				cursor: "not-allowed",
				pointerEvents: "none"
			}
		}
	},
	variants: {
		variant: {
			default: {},
			outline: {
				border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
				backgroundColor: "transparent",
				boxShadow: _hydrotik_tokens.vars.shadow.xs,
				selectors: { "&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } }
			}
		},
		size: {
			sm: {
				height: _hydrotik_tokens.vars.space["7"],
				paddingLeft: _hydrotik_tokens.vars.space["1_5"],
				paddingRight: _hydrotik_tokens.vars.space["1_5"],
				minWidth: _hydrotik_tokens.vars.space["7"]
			},
			md: {
				height: _hydrotik_tokens.vars.space["8"],
				paddingLeft: _hydrotik_tokens.vars.space["2"],
				paddingRight: _hydrotik_tokens.vars.space["2"],
				minWidth: _hydrotik_tokens.vars.space["8"]
			},
			lg: {
				height: _hydrotik_tokens.vars.space["10"],
				paddingLeft: _hydrotik_tokens.vars.space["2_5"],
				paddingRight: _hydrotik_tokens.vars.space["2_5"],
				minWidth: _hydrotik_tokens.vars.space["10"]
			}
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});

//#endregion
//#region src/components/Toggle/Toggle.tsx
const Toggle = react.default.forwardRef(({ variant = "default", size = "md", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toggle.Root, {
	ref,
	className: [toggleRecipe({
		variant,
		size
	}), className].filter(Boolean).join(" "),
	...props
}));
Toggle.displayName = "Toggle";

//#endregion
//#region src/components/ToggleGroup/ToggleGroup.css.ts
const toggleGroupRoot = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	overflow: "hidden",
	gap: 0
});
const toggleGroupItem = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	height: _hydrotik_tokens.vars.space["8"],
	paddingLeft: _hydrotik_tokens.vars.space["2_5"],
	paddingRight: _hydrotik_tokens.vars.space["2_5"],
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.textMuted,
	backgroundColor: "transparent",
	border: "none",
	borderRight: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	cursor: "pointer",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:last-child": { borderRight: "none" },
		"&:hover": {
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
			color: _hydrotik_tokens.vars.color.text
		},
		"&[data-state=\"on\"]": {
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
			color: _hydrotik_tokens.vars.color.text
		},
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "-2px"
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});

//#endregion
//#region src/components/ToggleGroup/ToggleGroup.tsx
const ToggleGroup = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toggle_group.Root, {
	ref,
	className: [toggleGroupRoot, className].filter(Boolean).join(" "),
	...props
}));
ToggleGroup.displayName = "ToggleGroup";
const ToggleGroupItem = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_toggle_group.Item, {
	ref,
	className: [toggleGroupItem, className].filter(Boolean).join(" "),
	...props
}));
ToggleGroupItem.displayName = "ToggleGroupItem";

//#endregion
//#region src/components/Tooltip/Tooltip.css.ts
const fadeIn = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: 0,
		transform: "scale(0.95)"
	},
	to: {
		opacity: 1,
		transform: "scale(1)"
	}
});
const tooltipContent = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.text,
	color: _hydrotik_tokens.vars.color.background,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	padding: `${_hydrotik_tokens.vars.space[1]} ${_hydrotik_tokens.vars.space[2]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
	maxWidth: "280px",
	zIndex: _hydrotik_tokens.vars.zIndex.tooltip,
	boxShadow: _hydrotik_tokens.vars.shadow.sm,
	animationName: fadeIn,
	animationDuration: _hydrotik_tokens.vars.motion.duration.fast,
	animationTimingFunction: _hydrotik_tokens.vars.motion.easing.default,
	userSelect: "none"
});
const tooltipArrow = (0, _vanilla_extract_css.style)({ fill: _hydrotik_tokens.vars.color.text });

//#endregion
//#region src/components/Tooltip/Tooltip.tsx
const TooltipProvider = _radix_ui_react_tooltip.Provider;
const Tooltip = _radix_ui_react_tooltip.Root;
const TooltipTrigger = _radix_ui_react_tooltip.Trigger;
const TooltipContent = react.default.forwardRef(({ className, sideOffset = 6, showArrow = true, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_tooltip.Content, {
	ref,
	sideOffset,
	className: [tooltipContent, className].filter(Boolean).join(" "),
	...props,
	children: [props.children, showArrow && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Arrow, { className: tooltipArrow })]
}) }));
TooltipContent.displayName = "TooltipContent";

//#endregion
//#region src/components/Typography/Typography.css.ts
const h1 = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size["4xl"],
	fontWeight: _hydrotik_tokens.vars.font.weight.bold,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.tight,
	color: _hydrotik_tokens.vars.color.text
});
const h2 = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size["3xl"],
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.tight,
	color: _hydrotik_tokens.vars.color.text
});
const h3 = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size["2xl"],
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.tight,
	color: _hydrotik_tokens.vars.color.text
});
const h4 = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.xl,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.tight,
	color: _hydrotik_tokens.vars.color.text
});
const p = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.md,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	color: _hydrotik_tokens.vars.color.text
});
const lead = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.xl,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	color: _hydrotik_tokens.vars.color.textMuted
});
const large = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.lg,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text
});
const small = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
	color: _hydrotik_tokens.vars.color.text
});
const muted = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed
});
const inlineCode = (0, _vanilla_extract_css.style)({
	position: "relative",
	fontFamily: _hydrotik_tokens.vars.font.family.mono,
	fontSize: "0.875em",
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	backgroundColor: _hydrotik_tokens.vars.color.secondary,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	padding: `${_hydrotik_tokens.vars.space["0_5"]} ${_hydrotik_tokens.vars.space["1_5"]}`,
	color: _hydrotik_tokens.vars.color.text
});
const blockquote = (0, _vanilla_extract_css.style)({
	borderLeft: `3px solid ${_hydrotik_tokens.vars.color.border}`,
	paddingLeft: _hydrotik_tokens.vars.space["4"],
	fontStyle: "italic",
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed
});
const ul = (0, _vanilla_extract_css.style)({
	listStyleType: "disc",
	paddingLeft: _hydrotik_tokens.vars.space["6"],
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	color: _hydrotik_tokens.vars.color.text
});
const ol = (0, _vanilla_extract_css.style)({
	listStyleType: "decimal",
	paddingLeft: _hydrotik_tokens.vars.space["6"],
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	color: _hydrotik_tokens.vars.color.text
});
const hr = (0, _vanilla_extract_css.style)({
	border: "none",
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	margin: `${_hydrotik_tokens.vars.space["6"]} 0`
});

//#endregion
//#region src/components/Typography/Typography.tsx
function createTypographyComponent(tag, styleClass, displayName) {
	const Component = react.default.forwardRef(({ className, ...props }, ref) => react.default.createElement(tag, {
		ref,
		className: [styleClass, className].filter(Boolean).join(" "),
		...props
	}));
	Component.displayName = displayName;
	return Component;
}
const TypographyH1 = createTypographyComponent("h1", h1, "TypographyH1");
const TypographyH2 = createTypographyComponent("h2", h2, "TypographyH2");
const TypographyH3 = createTypographyComponent("h3", h3, "TypographyH3");
const TypographyH4 = createTypographyComponent("h4", h4, "TypographyH4");
const TypographyP = createTypographyComponent("p", p, "TypographyP");
const TypographyLead = createTypographyComponent("p", lead, "TypographyLead");
const TypographyLarge = createTypographyComponent("div", large, "TypographyLarge");
const TypographySmall = createTypographyComponent("small", small, "TypographySmall");
const TypographyMuted = createTypographyComponent("p", muted, "TypographyMuted");
const TypographyInlineCode = createTypographyComponent("code", inlineCode, "TypographyInlineCode");
const TypographyBlockquote = createTypographyComponent("blockquote", blockquote, "TypographyBlockquote");
const TypographyUl = createTypographyComponent("ul", ul, "TypographyUl");
const TypographyOl = createTypographyComponent("ol", ol, "TypographyOl");
const TypographyHr = createTypographyComponent("hr", hr, "TypographyHr");

//#endregion
//#region src/components/FlagTag/FlagTag.css.ts
/**
* FlagTag — Inline status indicator with icon + label
*
* Used in forensic/editorial contexts to mark rows as flagged, reviewed,
* pending, etc. Intentionally minimal: no background, no border — just
* icon + monospace label in a status color.
*
* Design decisions:
* - No background or border (flat, ink-on-paper feel)
* - Monospace font with letter-spacing (forensic/editorial density)
* - Icon sits slightly above text baseline via translateY
* - Icon is larger than text (14px icon with 9px text) for scannability
* - Inline-flex so it flows naturally in text or table cells
*/
const flagTagRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		fontFamily: _hydrotik_tokens.vars.font.family.mono,
		letterSpacing: "1px",
		textTransform: "uppercase",
		border: "none",
		background: "none",
		padding: 0,
		lineHeight: 1,
		whiteSpace: "nowrap",
		flexShrink: 0,
		verticalAlign: "middle"
	},
	variants: {
		variant: {
			destructive: { color: _hydrotik_tokens.vars.color.destructive },
			warning: { color: _hydrotik_tokens.vars.color.warning },
			success: { color: _hydrotik_tokens.vars.color.success },
			primary: { color: _hydrotik_tokens.vars.color.primary },
			muted: { color: _hydrotik_tokens.vars.color.textMuted }
		},
		size: {
			xs: {
				fontSize: "8px",
				gap: "3px"
			},
			sm: {
				fontSize: "9px",
				gap: "4px"
			},
			md: {
				fontSize: "11px",
				gap: "5px"
			},
			lg: {
				fontSize: "13px",
				gap: "6px"
			}
		}
	},
	defaultVariants: {
		variant: "destructive",
		size: "sm"
	}
});
const flagTagIcon = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	lineHeight: 0,
	transform: "translateY(-1px)",
	selectors: {
		"[data-flag-size=\"xs\"] &": { fontSize: "8px" },
		"[data-flag-size=\"sm\"] &": { fontSize: "9px" },
		"[data-flag-size=\"md\"] &": { fontSize: "11px" },
		"[data-flag-size=\"lg\"] &": { fontSize: "13px" }
	}
});
const flagTagLabel = (0, _vanilla_extract_css.style)({ lineHeight: 0 });

//#endregion
//#region src/components/FlagTag/FlagTag.tsx
/**
* FlagTag — Minimal inline status flag for forensic/editorial contexts.
*
* Renders an icon + label in a status color with no background or border.
* Monospace font with letter-spacing for data-dense environments.
*
* @example
* ```tsx
* // Default destructive flag
* <FlagTag />
*
* // Custom label + warning variant
* <FlagTag variant="warning" label="REVIEW" icon="🔍" />
*
* // With Lucide icon
* <FlagTag icon={<Icons.AlertTriangle size={14} />} label="FLAGGED" />
*
* // Inline after a name
* <span>Belen Blackstone <FlagTag marginLeft="8px" /></span>
* ```
*/
const FlagTag = react.default.forwardRef(({ variant = "destructive", size = "sm", icon = "⚠", label = "FLAG", marginLeft = "8px", className, style, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
	ref,
	"data-flag-size": size,
	className: [flagTagRecipe({
		variant,
		size
	}), className].filter(Boolean).join(" "),
	style: {
		marginLeft,
		...style
	},
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: flagTagIcon,
		children: icon
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: flagTagLabel,
		children: label
	})]
}));
FlagTag.displayName = "FlagTag";

//#endregion
//#region src/components/SourceRatingBar/SourceRatingBar.css.ts
/**
* SourceRatingBar — Segmented bar graph component
*
* A horizontal bar divided into N equal segments. Each segment is either
* "lit" (filled with the accent color) or "dim" (filled with a faint wash
* of the accent color). Together they form a continuous bar — no gaps —
* where lit segments indicate presence/coverage across data sources.
*
* Design decisions:
* - Segments have 1px gap between them (visible separation)
* - Each segment has 1px border-radius (slight curve)
* - Dim segments use 12% opacity of accent color (visible background)
* - Lit segments use accent at 85% opacity (punchy but not overpowering)
* - Bar grows left-to-right: lit segments first, dim segments after
* - Sizes control segment dimensions; sm is default for inline data tables
*/
const sourceRatingBarRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		gap: "1px",
		flexShrink: 0
	},
	variants: {
		size: {
			xs: {},
			sm: {},
			md: {},
			lg: {}
		},
		color: {
			primary: {},
			chart1: {},
			chart2: {},
			chart3: {},
			chart4: {},
			chart5: {},
			destructive: {},
			success: {},
			warning: {}
		}
	},
	defaultVariants: {
		size: "sm",
		color: "chart2"
	}
});
const segmentBase = (0, _vanilla_extract_css.style)({
	display: "block",
	flexShrink: 0,
	borderRadius: "1px"
});
(0, _vanilla_extract_css.globalStyle)(`[data-rating-size="xs"] .${segmentBase}`, {
	width: "4px",
	height: "6px"
});
(0, _vanilla_extract_css.globalStyle)(`[data-rating-size="sm"] .${segmentBase}`, {
	width: "5px",
	height: "8px"
});
(0, _vanilla_extract_css.globalStyle)(`[data-rating-size="md"] .${segmentBase}`, {
	width: "6px",
	height: "10px"
});
(0, _vanilla_extract_css.globalStyle)(`[data-rating-size="lg"] .${segmentBase}`, {
	width: "8px",
	height: "12px"
});
const colorMap = {
	primary: _hydrotik_tokens.vars.color.primary,
	chart1: _hydrotik_tokens.vars.color.chart1,
	chart2: _hydrotik_tokens.vars.color.chart2,
	chart3: _hydrotik_tokens.vars.color.chart3,
	chart4: _hydrotik_tokens.vars.color.chart4,
	chart5: _hydrotik_tokens.vars.color.chart5,
	destructive: _hydrotik_tokens.vars.color.destructive,
	success: _hydrotik_tokens.vars.color.success,
	warning: _hydrotik_tokens.vars.color.warning
};
for (const [name, token] of Object.entries(colorMap)) {
	(0, _vanilla_extract_css.globalStyle)(`[data-rating-color="${name}"] .${segmentBase}[data-lit="true"]`, {
		backgroundColor: token,
		opacity: .85
	});
	(0, _vanilla_extract_css.globalStyle)(`[data-rating-color="${name}"] .${segmentBase}[data-lit="false"]`, {
		backgroundColor: token,
		opacity: .12
	});
}

//#endregion
//#region src/components/SourceRatingBar/SourceRatingBar.tsx
/**
* SourceRatingBar — A segmented bar graph showing coverage across data sources.
*
* Each segment is either "lit" (present in source) or "dim" (absent).
* Segments are flush with no gaps, forming a continuous bar.
*
* @example
* ```tsx
* // Boolean array mode (explicit control per segment)
* <SourceRatingBar sources={[true, true, false, true, false, false, true, false, false, false]} />
*
* // Numeric mode (auto-fill left-to-right)
* <SourceRatingBar value={4} total={10} />
*
* // Custom color + size
* <SourceRatingBar sources={data} color="primary" size="md" />
* ```
*/
const SourceRatingBar = react.default.forwardRef(({ sources, value, total = 10, size = "sm", color = "chart2", className, ...props }, ref) => {
	const segments = sources ?? Array.from({ length: total }, (_, i) => i < (value ?? 0));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		role: "meter",
		"aria-label": "Source coverage",
		"aria-valuenow": segments.filter(Boolean).length,
		"aria-valuemin": 0,
		"aria-valuemax": segments.length,
		"data-rating-size": size,
		"data-rating-color": color,
		className: [sourceRatingBarRecipe({
			size,
			color
		}), className].filter(Boolean).join(" "),
		...props,
		children: segments.map((lit, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: segmentBase,
			"data-lit": String(lit)
		}, i))
	});
});
SourceRatingBar.displayName = "SourceRatingBar";

//#endregion
//#region src/components/DataGrid/core.ts
function functionalUpdate(updater, old) {
	return typeof updater === "function" ? updater(old) : updater;
}
function getDeepValue(obj, path) {
	return path.split(".").reduce((acc, part) => acc?.[part], obj);
}
const sortingFns = {
	alphanumeric: (rowA, rowB, columnId) => {
		const a = String(rowA.getValue(columnId) ?? "").toLowerCase();
		const b = String(rowB.getValue(columnId) ?? "").toLowerCase();
		return a.localeCompare(b, void 0, {
			numeric: true,
			sensitivity: "base"
		});
	},
	text: (rowA, rowB, columnId) => {
		const a = String(rowA.getValue(columnId) ?? "").toLowerCase();
		const b = String(rowB.getValue(columnId) ?? "").toLowerCase();
		return a < b ? -1 : a > b ? 1 : 0;
	},
	datetime: (rowA, rowB, columnId) => {
		const a = rowA.getValue(columnId);
		const b = rowB.getValue(columnId);
		return (a instanceof Date ? a.getTime() : Number(a) || 0) - (b instanceof Date ? b.getTime() : Number(b) || 0);
	},
	basic: (rowA, rowB, columnId) => {
		const a = rowA.getValue(columnId);
		const b = rowB.getValue(columnId);
		return a < b ? -1 : a > b ? 1 : 0;
	}
};
const filterFns = {
	includesString: (row, columnId, filterValue) => {
		return String(row.getValue(columnId) ?? "").toLowerCase().includes(String(filterValue).toLowerCase());
	},
	equalsString: (row, columnId, filterValue) => {
		return String(row.getValue(columnId) ?? "").toLowerCase() === String(filterValue).toLowerCase();
	},
	inNumberRange: (row, columnId, filterValue) => {
		const val = Number(row.getValue(columnId));
		const [min, max] = filterValue;
		return (min === void 0 || val >= min) && (max === void 0 || val <= max);
	},
	equals: (row, columnId, filterValue) => {
		return row.getValue(columnId) === filterValue;
	},
	arrIncludes: (row, columnId, filterValue) => {
		const val = row.getValue(columnId);
		return Array.isArray(val) && val.includes(filterValue);
	}
};
function getDefaultState() {
	return {
		sorting: [],
		columnFilters: [],
		globalFilter: "",
		pagination: {
			pageIndex: 0,
			pageSize: 10
		},
		rowSelection: {},
		columnVisibility: {},
		columnSizing: {},
		columnSizingInfo: {
			isResizingColumn: false,
			startOffset: null,
			startSize: null,
			deltaOffset: null,
			columnSizingStart: []
		},
		columnOrder: [],
		expanded: {},
		editing: {
			rowId: null,
			columnId: null
		},
		grouping: []
	};
}
const DEFAULT_COLUMN_SIZE = 150;
const DEFAULT_MIN_SIZE = 40;
const DEFAULT_MAX_SIZE = Number.MAX_SAFE_INTEGER;
function resolveColumns(columnDefs, table, depth = 0, parent) {
	const defaultColumn = table.options.defaultColumn ?? {};
	return columnDefs.map((def) => {
		const merged = {
			...defaultColumn,
			...def
		};
		let accessorFn;
		if (merged.accessorFn) accessorFn = merged.accessorFn;
		else if (merged.accessorKey) {
			const key = merged.accessorKey;
			accessorFn = key.includes(".") ? (row) => getDeepValue(row, key) : (row) => row[key];
		}
		const column = {
			...merged,
			depth,
			parent,
			childColumns: [],
			getAccessorFn: () => accessorFn,
			getSize: () => {
				const sizing = table.getState().columnSizing;
				return Math.min(Math.max(merged.minSize ?? DEFAULT_MIN_SIZE, sizing[merged.id] ?? merged.size ?? DEFAULT_COLUMN_SIZE), merged.maxSize ?? DEFAULT_MAX_SIZE);
			},
			getIsSorted: () => {
				const sort = table.getState().sorting.find((s) => s.id === merged.id);
				return sort ? sort.desc ? "desc" : "asc" : false;
			},
			getSortIndex: () => table.getState().sorting.findIndex((s) => s.id === merged.id),
			toggleSorting: (desc, multi) => {
				if (!(merged.enableSorting ?? table.options.enableSorting ?? true) || !accessorFn) return;
				table.setSorting((old) => {
					const existingIdx = old.findIndex((s) => s.id === merged.id);
					const existing = existingIdx >= 0 ? old[existingIdx] : null;
					const nextDesc = desc ?? (existing ? !existing.desc : merged.sortDescFirst ?? false);
					if (multi && (table.options.enableMultiSort ?? true)) {
						if (existing) {
							if (desc === void 0 && existing.desc === nextDesc) return old.filter((s) => s.id !== merged.id);
							return old.map((s) => s.id === merged.id ? {
								...s,
								desc: nextDesc
							} : s);
						}
						const newSorting = [...old, {
							id: merged.id,
							desc: nextDesc
						}];
						const maxCols = table.options.maxMultiSortColCount ?? Infinity;
						return newSorting.slice(-maxCols);
					}
					if (existing && desc === void 0) {
						if (existing.desc) return [];
						return [{
							id: merged.id,
							desc: true
						}];
					}
					return [{
						id: merged.id,
						desc: nextDesc
					}];
				});
			},
			getCanSort: () => (merged.enableSorting ?? true) && (table.options.enableSorting ?? true) && !!accessorFn,
			getCanResize: () => (merged.enableResizing ?? true) && (table.options.enableColumnResizing ?? true),
			getCanFilter: () => (merged.enableFiltering ?? true) && (table.options.enableColumnFilters ?? true) && !!accessorFn,
			getIsVisible: () => {
				return table.getState().columnVisibility[merged.id] !== false;
			},
			toggleVisibility: (value) => {
				table.setColumnVisibility((old) => ({
					...old,
					[merged.id]: value ?? !column.getIsVisible()
				}));
			},
			getFilterValue: () => table.getState().columnFilters.find((f) => f.id === merged.id)?.value,
			setFilterValue: (value) => {
				table.setColumnFilters((old) => {
					const existing = old.find((f) => f.id === merged.id);
					if (value === void 0 || value === "" || value === null) return old.filter((f) => f.id !== merged.id);
					if (existing) return old.map((f) => f.id === merged.id ? {
						...f,
						value
					} : f);
					return [...old, {
						id: merged.id,
						value
					}];
				});
			},
			getLeafColumns: () => {
				if (column.childColumns.length) return column.childColumns.flatMap((c) => c.getLeafColumns());
				return [column];
			}
		};
		if (merged.columns?.length) column.childColumns = resolveColumns(merged.columns, table, depth + 1, column);
		return column;
	});
}
function createRow(table, original, index, id, depth, parentRow, subRows = []) {
	const columns = table.getAllFlatColumns();
	const valueCache = {};
	const row = {
		id,
		index,
		original,
		depth,
		parentRow,
		subRows,
		getValue: (columnId) => {
			if (columnId in valueCache) return valueCache[columnId];
			const accessor = columns.find((c) => c.id === columnId)?.getAccessorFn();
			const value = accessor ? accessor(original, index) : void 0;
			valueCache[columnId] = value;
			return value;
		},
		renderValue: (columnId) => {
			return row.getValue(columnId) ?? table.options.renderFallbackValue ?? null;
		},
		getIsSelected: () => {
			return table.getState().rowSelection[id] ?? false;
		},
		toggleSelected: (value) => {
			const enableSelection = table.options.enableRowSelection;
			if (enableSelection === false) return;
			if (typeof enableSelection === "function" && !enableSelection(row)) return;
			table.setRowSelection((old) => {
				if (value ?? !old[id]) {
					if (table.options.enableMultiRowSelection === false) return { [id]: true };
					return {
						...old,
						[id]: true
					};
				}
				const { [id]: _, ...rest } = old;
				return rest;
			});
		},
		getIsExpanded: () => {
			const expanded = table.getState().expanded;
			if (expanded === true) return true;
			return expanded[id] ?? false;
		},
		toggleExpanded: (value) => {
			table.setExpanded((old) => {
				if (old === true) return { [id]: value ?? false };
				if (value ?? !old[id]) return {
					...old,
					[id]: true
				};
				const { [id]: _, ...rest } = old;
				return rest;
			});
		},
		getCanSelect: () => {
			const opt = table.options.enableRowSelection;
			if (opt === false) return false;
			if (typeof opt === "function") return opt(row);
			return true;
		},
		getIsEditing: () => {
			return table.getState().editing.rowId === id;
		}
	};
	return row;
}
function buildCoreRowModel(table) {
	const data = table.options.data;
	const getRowId = table.options.getRowId;
	const getSubRows = table.options.getSubRows;
	const rows = [];
	const flatRows = [];
	const rowsById = {};
	const buildRows = (data, depth, parentRow) => {
		return data.map((original, index) => {
			const id = getRowId ? getRowId(original, index, parentRow) : parentRow ? `${parentRow.id}.${index}` : String(index);
			const row = createRow(table, original, index, id, depth, parentRow);
			flatRows.push(row);
			rowsById[id] = row;
			const subData = getSubRows?.(original);
			if (subData?.length) row.subRows = buildRows(subData, depth + 1, row);
			return row;
		});
	};
	const builtRows = buildRows(data, 0);
	rows.push(...builtRows);
	return {
		rows,
		flatRows,
		rowsById
	};
}
function buildFilteredRowModel(table) {
	if (table.options.manualFiltering) return table.getCoreRowModel();
	const coreModel = table.getCoreRowModel();
	const columnFilters = table.getState().columnFilters;
	const globalFilter = table.getState().globalFilter;
	const columns = table.getAllFlatColumns();
	if (!columnFilters.length && !globalFilter) return coreModel;
	const resolvedFilters = columnFilters.map((filter) => {
		const col = columns.find((c) => c.id === filter.id);
		if (!col) return null;
		return {
			column: col,
			filterFn: col.filterFn ?? filterFns.includesString,
			value: filter.value
		};
	}).filter(Boolean);
	const globalFilterFn = table.options.globalFilterFn ?? filterFns.includesString;
	const filterRow = (row) => {
		for (const f of resolvedFilters) if (!f.filterFn(row, f.column.id, f.value)) return false;
		if (globalFilter) {
			if (!columns.some((col) => {
				if (!col.getAccessorFn()) return false;
				return globalFilterFn(row, col.id, globalFilter);
			})) return false;
		}
		return true;
	};
	const filteredRows = [];
	const filteredFlatRows = [];
	const filteredById = {};
	const recurse = (rows) => {
		return rows.filter((row) => {
			let subRowsPass = false;
			if (row.subRows.length) {
				const filteredSubs = recurse(row.subRows);
				if (filteredSubs.length) {
					subRowsPass = true;
					row = {
						...row,
						subRows: filteredSubs
					};
				}
			}
			const passes = subRowsPass || filterRow(row);
			if (passes) {
				filteredFlatRows.push(row);
				filteredById[row.id] = row;
			}
			return passes;
		});
	};
	filteredRows.push(...recurse(coreModel.rows));
	return {
		rows: filteredRows,
		flatRows: filteredFlatRows,
		rowsById: filteredById
	};
}
function buildSortedRowModel(table) {
	if (table.options.manualSorting) return table.getFilteredRowModel();
	const filteredModel = table.getFilteredRowModel();
	const sorting = table.getState().sorting;
	if (!sorting.length) return filteredModel;
	const columns = table.getAllFlatColumns();
	const sortRow = (rowA, rowB) => {
		for (const sort of sorting) {
			const col = columns.find((c) => c.id === sort.id);
			if (!col) continue;
			const result = (col.sortingFn ?? sortingFns.basic)(rowA, rowB, sort.id);
			if (result !== 0) return sort.desc ? -result : result;
		}
		return 0;
	};
	const sortRows = (rows) => {
		return [...rows].sort(sortRow).map((row) => {
			if (row.subRows.length) return {
				...row,
				subRows: sortRows(row.subRows)
			};
			return row;
		});
	};
	const sortedRows = sortRows(filteredModel.rows);
	const flatRows = flattenRows(sortedRows);
	return {
		rows: sortedRows,
		flatRows,
		rowsById: Object.fromEntries(flatRows.map((r) => [r.id, r]))
	};
}
function buildPaginatedRowModel(table) {
	if (table.options.manualPagination || table.options.enablePagination === false) return table.getSortedRowModel();
	const sortedModel = table.getSortedRowModel();
	const { pageIndex, pageSize } = table.getState().pagination;
	const start = pageIndex * pageSize;
	const end = start + pageSize;
	const paginatedRows = sortedModel.rows.slice(start, end);
	const flatRows = flattenRows(paginatedRows);
	return {
		rows: paginatedRows,
		flatRows,
		rowsById: Object.fromEntries(flatRows.map((r) => [r.id, r]))
	};
}
function flattenRows(rows) {
	const result = [];
	const recurse = (rows) => {
		rows.forEach((row) => {
			result.push(row);
			if (row.subRows?.length && row.getIsExpanded()) recurse(row.subRows);
		});
	};
	recurse(rows);
	return result;
}
function createDataGrid(options) {
	const defaultState = getDefaultState();
	const initialState = {
		...defaultState,
		...options.initialState,
		pagination: {
			...defaultState.pagination,
			...options.initialState?.pagination
		},
		columnSizingInfo: {
			...defaultState.columnSizingInfo,
			...options.initialState?.columnSizingInfo
		},
		editing: {
			...defaultState.editing,
			...options.initialState?.editing
		}
	};
	let _state = { ...initialState };
	const getState = () => ({
		..._state,
		...options.state
	});
	const setState = (updater) => {
		_state = functionalUpdate(updater, _state);
		options.onStateChange?.(updater);
	};
	const makeUpdater = (key, onChange) => {
		return (updater) => {
			if (onChange) onChange(updater);
			else setState((old) => ({
				...old,
				[key]: functionalUpdate(updater, old[key])
			}));
		};
	};
	let _allColumns = null;
	let _flatColumns = null;
	let _coreRowModel = null;
	let _filteredRowModel = null;
	let _sortedRowModel = null;
	let _paginatedRowModel = null;
	const table = {
		options,
		initialState,
		getState,
		setState,
		reset: () => {
			_state = { ...initialState };
		},
		getAllColumns: () => {
			if (!_allColumns) _allColumns = resolveColumns(options.columns, table);
			return _allColumns;
		},
		getAllFlatColumns: () => {
			if (!_flatColumns) _flatColumns = table.getAllColumns().flatMap((c) => c.getLeafColumns());
			return _flatColumns;
		},
		getAllLeafColumns: () => table.getAllFlatColumns(),
		getVisibleLeafColumns: () => {
			const order = getState().columnOrder;
			let cols = table.getAllLeafColumns().filter((c) => c.getIsVisible());
			if (order.length) {
				const ordered = order.map((id) => cols.find((c) => c.id === id)).filter(Boolean);
				const remaining = cols.filter((c) => !order.includes(c.id));
				cols = [...ordered, ...remaining];
			}
			return cols;
		},
		getColumn: (id) => table.getAllFlatColumns().find((c) => c.id === id),
		getHeaderGroups: () => {
			const allColumns = table.getAllColumns();
			const maxDepth = Math.max(0, ...allColumns.map(getMaxDepth));
			const groups = [];
			for (let depth = 0; depth <= maxDepth; depth++) {
				const headers = getColumnsAtDepth(allColumns, depth, maxDepth);
				groups.push({
					id: `header-${depth}`,
					depth,
					headers
				});
			}
			return groups;
		},
		getCoreRowModel: () => {
			if (!_coreRowModel) _coreRowModel = buildCoreRowModel(table);
			return _coreRowModel;
		},
		getFilteredRowModel: () => {
			if (!_filteredRowModel) _filteredRowModel = buildFilteredRowModel(table);
			return _filteredRowModel;
		},
		getSortedRowModel: () => {
			if (!_sortedRowModel) _sortedRowModel = buildSortedRowModel(table);
			return _sortedRowModel;
		},
		getPaginatedRowModel: () => {
			if (!_paginatedRowModel) _paginatedRowModel = buildPaginatedRowModel(table);
			return _paginatedRowModel;
		},
		getRowModel: () => table.getPaginatedRowModel(),
		getPrePaginationRowModel: () => table.getSortedRowModel(),
		getRow: (id) => {
			const row = table.getRowModel().rowsById[id] ?? table.getCoreRowModel().rowsById[id];
			if (!row) throw new Error(`Row with id "${id}" not found`);
			return row;
		},
		setSorting: makeUpdater("sorting", options.onSortingChange),
		resetSorting: () => table.setSorting(initialState.sorting),
		setColumnFilters: makeUpdater("columnFilters", options.onColumnFiltersChange),
		resetColumnFilters: () => table.setColumnFilters([]),
		setGlobalFilter: (value) => {
			if (options.onGlobalFilterChange) options.onGlobalFilterChange(() => value);
			else setState((old) => ({
				...old,
				globalFilter: value
			}));
		},
		resetGlobalFilter: () => table.setGlobalFilter(""),
		setPagination: makeUpdater("pagination", options.onPaginationChange),
		setPageIndex: (updater) => {
			table.setPagination((old) => {
				const newIndex = functionalUpdate(updater, old.pageIndex);
				const maxPage = Math.max(0, table.getPageCount() - 1);
				return {
					...old,
					pageIndex: Math.max(0, Math.min(newIndex, maxPage))
				};
			});
		},
		setPageSize: (updater) => {
			table.setPagination((old) => {
				const newSize = Math.max(1, functionalUpdate(updater, old.pageSize));
				const topRow = old.pageIndex * old.pageSize;
				return {
					...old,
					pageSize: newSize,
					pageIndex: Math.floor(topRow / newSize)
				};
			});
		},
		getPageCount: () => {
			if (options.pageCount !== void 0) return options.pageCount;
			const totalRows = options.rowCount ?? table.getPrePaginationRowModel().rows.length;
			return Math.ceil(totalRows / getState().pagination.pageSize);
		},
		getCanPreviousPage: () => getState().pagination.pageIndex > 0,
		getCanNextPage: () => {
			const pc = table.getPageCount();
			return pc === -1 || getState().pagination.pageIndex < pc - 1;
		},
		previousPage: () => table.setPageIndex((old) => old - 1),
		nextPage: () => table.setPageIndex((old) => old + 1),
		firstPage: () => table.setPageIndex(0),
		lastPage: () => table.setPageIndex(table.getPageCount() - 1),
		resetPagination: () => table.setPagination(initialState.pagination),
		setRowSelection: makeUpdater("rowSelection", options.onRowSelectionChange),
		resetRowSelection: () => table.setRowSelection({}),
		getIsAllRowsSelected: () => {
			const rows = table.getFilteredRowModel().flatRows.filter((r) => r.getCanSelect());
			const selection = getState().rowSelection;
			return rows.length > 0 && rows.every((r) => selection[r.id]);
		},
		getIsAllPageRowsSelected: () => {
			const rows = table.getRowModel().flatRows.filter((r) => r.getCanSelect());
			const selection = getState().rowSelection;
			return rows.length > 0 && rows.every((r) => selection[r.id]);
		},
		getIsSomeRowsSelected: () => {
			const selection = getState().rowSelection;
			return Object.keys(selection).length > 0 && !table.getIsAllRowsSelected();
		},
		getIsSomePageRowsSelected: () => {
			return !table.getIsAllPageRowsSelected() && table.getRowModel().flatRows.some((r) => r.getIsSelected());
		},
		toggleAllRowsSelected: (value) => {
			const newValue = value ?? !table.getIsAllRowsSelected();
			table.setRowSelection(() => {
				if (!newValue) return {};
				const selection = {};
				table.getFilteredRowModel().flatRows.forEach((row) => {
					if (row.getCanSelect()) selection[row.id] = true;
				});
				return selection;
			});
		},
		toggleAllPageRowsSelected: (value) => {
			const newValue = value ?? !table.getIsAllPageRowsSelected();
			table.setRowSelection((old) => {
				const selection = { ...old };
				table.getRowModel().rows.forEach((row) => {
					if (row.getCanSelect()) if (newValue) selection[row.id] = true;
					else delete selection[row.id];
				});
				return selection;
			});
		},
		getSelectedRowModel: () => {
			const selection = getState().rowSelection;
			const selectedRows = table.getCoreRowModel().flatRows.filter((r) => selection[r.id]);
			return {
				rows: selectedRows,
				flatRows: selectedRows,
				rowsById: Object.fromEntries(selectedRows.map((r) => [r.id, r]))
			};
		},
		setColumnVisibility: makeUpdater("columnVisibility", options.onColumnVisibilityChange),
		resetColumnVisibility: () => table.setColumnVisibility({}),
		setColumnSizing: makeUpdater("columnSizing", options.onColumnSizingChange),
		setColumnSizingInfo: makeUpdater("columnSizingInfo", options.onColumnSizingInfoChange),
		resetColumnSizing: () => table.setColumnSizing({}),
		getTotalSize: () => table.getVisibleLeafColumns().reduce((sum, col) => sum + col.getSize(), 0),
		setColumnOrder: makeUpdater("columnOrder", options.onColumnOrderChange),
		resetColumnOrder: () => table.setColumnOrder([]),
		setExpanded: makeUpdater("expanded", options.onExpandedChange),
		resetExpanded: () => table.setExpanded({}),
		toggleAllRowsExpanded: (value) => {
			if (value ?? !table.getIsAllRowsExpanded()) table.setExpanded(true);
			else table.setExpanded({});
		},
		getIsAllRowsExpanded: () => {
			return table.getState().expanded === true;
		},
		getExpandedDepth: () => {
			const expanded = getState().expanded;
			if (expanded === true) return Infinity;
			return Object.keys(expanded).length ? 1 : 0;
		},
		setEditing: makeUpdater("editing", options.onEditingChange),
		startEditing: (rowId, columnId) => {
			table.setEditing(() => ({
				rowId,
				columnId
			}));
		},
		stopEditing: () => {
			table.setEditing(() => ({
				rowId: null,
				columnId: null
			}));
		},
		setGrouping: makeUpdater("grouping", options.onGroupingChange),
		resetGrouping: () => table.setGrouping([])
	};
	return table;
}
function getMaxDepth(col) {
	if (!col.childColumns.length) return col.depth;
	return Math.max(...col.childColumns.map(getMaxDepth));
}
function getColumnsAtDepth(columns, targetDepth, maxDepth) {
	const result = [];
	for (const col of columns) if (col.depth === targetDepth) result.push(col);
	else if (col.childColumns.length) result.push(...getColumnsAtDepth(col.childColumns, targetDepth, maxDepth));
	else if (col.depth < targetDepth) result.push(col);
	return result;
}

//#endregion
//#region src/components/DataGrid/useDataGrid.ts
/**
* React hook that creates and manages a DataGrid instance.
*
* Inspired by TanStack Table's `useReactTable` — provides a headless,
* fully typed table instance with automatic React state management.
*
* @example
* ```tsx
* const table = useDataGrid({
*   data: myData,
*   columns: myColumns,
*   enableSorting: true,
*   enablePagination: true,
* });
* ```
*/
function useDataGrid(options) {
	const [tableRef] = react.default.useState(() => ({ current: createDataGrid({
		...options,
		state: {},
		onStateChange: () => {}
	}) }));
	const [state, setState] = react.default.useState(() => tableRef.current.initialState);
	return react.default.useMemo(() => {
		return createDataGrid({
			...options,
			state: {
				...state,
				...options.state
			},
			onStateChange: (updater) => {
				setState((old) => {
					return typeof updater === "function" ? updater(old) : updater;
				});
				options.onStateChange?.(updater);
			},
			onSortingChange: (updater) => {
				setState((old) => ({
					...old,
					sorting: typeof updater === "function" ? updater(old.sorting) : updater
				}));
				options.onSortingChange?.(updater);
			},
			onColumnFiltersChange: (updater) => {
				setState((old) => ({
					...old,
					columnFilters: typeof updater === "function" ? updater(old.columnFilters) : updater,
					pagination: {
						...old.pagination,
						pageIndex: 0
					}
				}));
				options.onColumnFiltersChange?.(updater);
			},
			onGlobalFilterChange: (updater) => {
				setState((old) => ({
					...old,
					globalFilter: typeof updater === "function" ? updater(old.globalFilter) : updater,
					pagination: {
						...old.pagination,
						pageIndex: 0
					}
				}));
				options.onGlobalFilterChange?.(updater);
			},
			onPaginationChange: (updater) => {
				setState((old) => ({
					...old,
					pagination: typeof updater === "function" ? updater(old.pagination) : updater
				}));
				options.onPaginationChange?.(updater);
			},
			onRowSelectionChange: (updater) => {
				setState((old) => ({
					...old,
					rowSelection: typeof updater === "function" ? updater(old.rowSelection) : updater
				}));
				options.onRowSelectionChange?.(updater);
			},
			onColumnVisibilityChange: (updater) => {
				setState((old) => ({
					...old,
					columnVisibility: typeof updater === "function" ? updater(old.columnVisibility) : updater
				}));
				options.onColumnVisibilityChange?.(updater);
			},
			onColumnSizingChange: (updater) => {
				setState((old) => ({
					...old,
					columnSizing: typeof updater === "function" ? updater(old.columnSizing) : updater
				}));
				options.onColumnSizingChange?.(updater);
			},
			onColumnSizingInfoChange: (updater) => {
				setState((old) => ({
					...old,
					columnSizingInfo: typeof updater === "function" ? updater(old.columnSizingInfo) : updater
				}));
				options.onColumnSizingInfoChange?.(updater);
			},
			onColumnOrderChange: (updater) => {
				setState((old) => ({
					...old,
					columnOrder: typeof updater === "function" ? updater(old.columnOrder) : updater
				}));
				options.onColumnOrderChange?.(updater);
			},
			onExpandedChange: (updater) => {
				setState((old) => ({
					...old,
					expanded: typeof updater === "function" ? updater(old.expanded) : updater
				}));
				options.onExpandedChange?.(updater);
			},
			onEditingChange: (updater) => {
				setState((old) => ({
					...old,
					editing: typeof updater === "function" ? updater(old.editing) : updater
				}));
				options.onEditingChange?.(updater);
			},
			onGroupingChange: (updater) => {
				setState((old) => ({
					...old,
					grouping: typeof updater === "function" ? updater(old.grouping) : updater
				}));
				options.onGroupingChange?.(updater);
			}
		});
	}, [
		options.columns,
		options.data,
		state,
		options.state
	]);
}

//#endregion
//#region src/components/DataGrid/DataGrid.css.ts
const gridContainer = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	overflow: "hidden",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	color: _hydrotik_tokens.vars.color.text,
	selectors: {
		"&[data-borderless]": {
			border: "none",
			borderRadius: 0
		},
		"&[data-transparent]": { backgroundColor: "transparent" },
		"&[data-density=\"compact\"]": { fontSize: _hydrotik_tokens.vars.font.size.xs },
		"&[data-density=\"editorial\"]": { fontSize: "13px" }
	}
});
const toolbar = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"],
	padding: `${_hydrotik_tokens.vars.space["2"]} ${_hydrotik_tokens.vars.space["3"]}`,
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	flexWrap: "wrap"
});
const toolbarLeft = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"],
	flex: 1,
	minWidth: 0
});
const toolbarRight = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"]
});
const searchInput = (0, _vanilla_extract_css.style)({
	height: "32px",
	minWidth: "180px",
	maxWidth: "300px",
	padding: `0 ${_hydrotik_tokens.vars.space["3"]}`,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	color: _hydrotik_tokens.vars.color.text,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	outline: "none",
	transition: `border-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	"::placeholder": { color: _hydrotik_tokens.vars.color.placeholder },
	":focus": {
		borderColor: _hydrotik_tokens.vars.color.focusRing,
		boxShadow: `0 0 0 1px ${_hydrotik_tokens.vars.color.focusRing}`
	}
});
const toolbarButton = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	height: "32px",
	padding: `0 ${_hydrotik_tokens.vars.space["2_5"]}`,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	backgroundColor: "transparent",
	color: _hydrotik_tokens.vars.color.text,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	cursor: "pointer",
	whiteSpace: "nowrap",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	":hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
	":active": { transform: "scale(0.97)" }
});
const selectionInfo = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	color: _hydrotik_tokens.vars.color.textMuted,
	whiteSpace: "nowrap"
});
const tableScrollArea = (0, _vanilla_extract_css.style)({
	overflow: "auto",
	position: "relative"
});
const table = (0, _vanilla_extract_css.style)({
	width: "100%",
	borderCollapse: "collapse",
	tableLayout: "fixed"
});
const thead = (0, _vanilla_extract_css.style)({
	position: "sticky",
	top: 0,
	zIndex: 2,
	backgroundColor: _hydrotik_tokens.vars.color.surface
});
const headerRow = (0, _vanilla_extract_css.style)({ borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}` });
const headerCell = (0, _vanilla_extract_css.style)({
	position: "relative",
	height: "40px",
	padding: `0 ${_hydrotik_tokens.vars.space["3"]}`,
	textAlign: "left",
	verticalAlign: "middle",
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.text,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	whiteSpace: "nowrap",
	userSelect: "none",
	overflow: "hidden",
	textOverflow: "ellipsis",
	backgroundColor: _hydrotik_tokens.vars.color.surface
});
const headerCellSortable = (0, _vanilla_extract_css.style)({
	cursor: "pointer",
	":hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover }
});
const headerCellContent = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1"],
	overflow: "hidden"
});
const headerCellText = (0, _vanilla_extract_css.style)({
	overflow: "hidden",
	textOverflow: "ellipsis",
	flex: 1
});
const sortIcon = (0, _vanilla_extract_css.style)({
	flexShrink: 0,
	opacity: .5,
	transition: `opacity ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
});
const sortIconActive = (0, _vanilla_extract_css.style)({
	opacity: 1,
	color: _hydrotik_tokens.vars.color.primary
});
const sortIndex = (0, _vanilla_extract_css.style)({
	fontSize: "10px",
	color: _hydrotik_tokens.vars.color.textMuted,
	marginLeft: "-2px"
});
const resizeHandle = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: 0,
	right: 0,
	width: "6px",
	height: "100%",
	cursor: "col-resize",
	zIndex: 1,
	touchAction: "none",
	"::after": {
		content: "\"\"",
		position: "absolute",
		top: "25%",
		right: "2px",
		width: "2px",
		height: "50%",
		borderRadius: "1px",
		backgroundColor: _hydrotik_tokens.vars.color.border,
		transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
	},
	":hover::after": { backgroundColor: _hydrotik_tokens.vars.color.primary },
	selectors: { "&[data-resizing=\"true\"]::after": { backgroundColor: _hydrotik_tokens.vars.color.primary } }
});
const columnFilterRow = (0, _vanilla_extract_css.style)({ borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}` });
const columnFilterCell = (0, _vanilla_extract_css.style)({ padding: `${_hydrotik_tokens.vars.space["1"]} ${_hydrotik_tokens.vars.space["2"]}` });
const columnFilterInput = (0, _vanilla_extract_css.style)({
	width: "100%",
	height: "28px",
	padding: `0 ${_hydrotik_tokens.vars.space["2"]}`,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	color: _hydrotik_tokens.vars.color.text,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	outline: "none",
	"::placeholder": { color: _hydrotik_tokens.vars.color.placeholder },
	":focus": { borderColor: _hydrotik_tokens.vars.color.focusRing }
});
const tbody = (0, _vanilla_extract_css.style)({});
const bodyRow = (0, _vanilla_extract_css.style)({
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`,
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	":hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
	selectors: {
		"&[data-selected=\"true\"]": { backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.primary} 8%, transparent)` },
		"&[data-selected=\"true\"]:hover": { backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.primary} 12%, transparent)` },
		"&:last-child": { borderBottom: "none" }
	}
});
const bodyCell = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["2"]} ${_hydrotik_tokens.vars.space["3"]}`,
	verticalAlign: "middle",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap"
});
const bodyCellEditing = (0, _vanilla_extract_css.style)({ padding: `${_hydrotik_tokens.vars.space["1"]} ${_hydrotik_tokens.vars.space["2"]}` });
const cellAlignLeft = (0, _vanilla_extract_css.style)({ textAlign: "left" });
const cellAlignCenter = (0, _vanilla_extract_css.style)({ textAlign: "center" });
const cellAlignRight = (0, _vanilla_extract_css.style)({ textAlign: "right" });
const checkboxCell = (0, _vanilla_extract_css.style)({
	width: "40px",
	maxWidth: "40px",
	padding: `0 ${_hydrotik_tokens.vars.space["2"]}`,
	textAlign: "center"
});
const checkbox = (0, _vanilla_extract_css.style)({
	width: "16px",
	height: "16px",
	appearance: "none",
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	backgroundColor: "transparent",
	cursor: "pointer",
	position: "relative",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	":checked": {
		backgroundColor: _hydrotik_tokens.vars.color.primary,
		borderColor: _hydrotik_tokens.vars.color.primary
	},
	":focus-visible": {
		outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
		outlineOffset: "2px"
	},
	selectors: {
		"&:checked::after": {
			content: "\"\"",
			position: "absolute",
			left: "4px",
			top: "1px",
			width: "6px",
			height: "10px",
			border: `solid ${_hydrotik_tokens.vars.color.primaryForeground}`,
			borderWidth: "0 2px 2px 0",
			transform: "rotate(45deg)"
		},
		"&[data-indeterminate=\"true\"]": {
			backgroundColor: _hydrotik_tokens.vars.color.primary,
			borderColor: _hydrotik_tokens.vars.color.primary
		},
		"&[data-indeterminate=\"true\"]::after": {
			content: "\"\"",
			position: "absolute",
			left: "3px",
			top: "6px",
			width: "8px",
			height: "2px",
			backgroundColor: _hydrotik_tokens.vars.color.primaryForeground
		}
	}
});
const expanderButton = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	border: "none",
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	backgroundColor: "transparent",
	color: _hydrotik_tokens.vars.color.textMuted,
	cursor: "pointer",
	padding: 0,
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	":hover": {
		backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
		color: _hydrotik_tokens.vars.color.text
	}
});
const expanderIcon = (0, _vanilla_extract_css.style)({
	transition: `transform ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: { "&[data-expanded=\"true\"]": { transform: "rotate(90deg)" } }
});
const pinnedLeft = (0, _vanilla_extract_css.style)({
	position: "sticky",
	left: 0,
	zIndex: 1,
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	"::after": {
		content: "\"\"",
		position: "absolute",
		top: 0,
		right: "-4px",
		width: "4px",
		height: "100%",
		background: `linear-gradient(to right, ${_hydrotik_tokens.vars.color.border}, transparent)`
	}
});
const pinnedRight = (0, _vanilla_extract_css.style)({
	position: "sticky",
	right: 0,
	zIndex: 1,
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	"::before": {
		content: "\"\"",
		position: "absolute",
		top: 0,
		left: "-4px",
		width: "4px",
		height: "100%",
		background: `linear-gradient(to left, ${_hydrotik_tokens.vars.color.border}, transparent)`
	}
});
const emptyState = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["12"]} ${_hydrotik_tokens.vars.space["4"]}`,
	textAlign: "center",
	color: _hydrotik_tokens.vars.color.textMuted,
	fontSize: _hydrotik_tokens.vars.font.size.sm
});
const shimmer = (0, _vanilla_extract_css.keyframes)({
	"0%": { backgroundPosition: "-200% 0" },
	"100%": { backgroundPosition: "200% 0" }
});
const loadingRow = (0, _vanilla_extract_css.style)({
	height: "41px",
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`
});
const loadingCell = (0, _vanilla_extract_css.style)({ padding: `${_hydrotik_tokens.vars.space["2"]} ${_hydrotik_tokens.vars.space["3"]}` });
const loadingSkeleton = (0, _vanilla_extract_css.style)({
	height: "16px",
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	background: `linear-gradient(90deg, ${_hydrotik_tokens.vars.color.ghostHover} 25%, color-mix(in srgb, ${_hydrotik_tokens.vars.color.ghostHover} 50%, transparent) 50%, ${_hydrotik_tokens.vars.color.ghostHover} 75%)`,
	backgroundSize: "200% 100%",
	animation: `${shimmer} 1.5s infinite`
});
const footer = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: `${_hydrotik_tokens.vars.space["2"]} ${_hydrotik_tokens.vars.space["3"]}`,
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	gap: _hydrotik_tokens.vars.space["3"],
	flexWrap: "wrap"
});
const footerLeft = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"],
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	color: _hydrotik_tokens.vars.color.textMuted
});
const footerRight = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1"]
});
const paginationButton = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "32px",
	height: "32px",
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	backgroundColor: "transparent",
	color: _hydrotik_tokens.vars.color.text,
	cursor: "pointer",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	":hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
	":disabled": {
		opacity: .5,
		cursor: "not-allowed",
		pointerEvents: "none"
	},
	selectors: { "&[data-active=\"true\"]": {
		backgroundColor: _hydrotik_tokens.vars.color.primary,
		color: _hydrotik_tokens.vars.color.primaryForeground,
		borderColor: _hydrotik_tokens.vars.color.primary
	} }
});
const pageSizeSelect = (0, _vanilla_extract_css.style)({
	height: "32px",
	width: "auto",
	minWidth: "64px",
	fontSize: _hydrotik_tokens.vars.font.size.sm
});
const paginationInfo = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	whiteSpace: "nowrap",
	padding: `0 ${_hydrotik_tokens.vars.space["2"]}`
});
const editInput = (0, _vanilla_extract_css.style)({
	width: "100%",
	height: "28px",
	padding: `0 ${_hydrotik_tokens.vars.space["2"]}`,
	border: `1px solid ${_hydrotik_tokens.vars.color.focusRing}`,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	color: _hydrotik_tokens.vars.color.text,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	outline: "none",
	boxShadow: `0 0 0 1px ${_hydrotik_tokens.vars.color.focusRing}`
});
const visibilityPanel = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: "100%",
	right: 0,
	zIndex: 10,
	minWidth: "180px",
	padding: _hydrotik_tokens.vars.space["2"],
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	marginTop: _hydrotik_tokens.vars.space["1"]
});
const visibilityItem = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["2"],
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	cursor: "pointer",
	":hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover }
});
const groupedRow = (0, _vanilla_extract_css.style)({
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.secondary} 30%, transparent)`
});
const depthIndent = (0, _vanilla_extract_css.style)({ display: "inline-block" });
const statusBar = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["4"],
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["3"]}`,
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	color: _hydrotik_tokens.vars.color.textMuted,
	backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.secondary} 20%, transparent)`
});
const statusBarItem = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["1"]
});
const statusBarLabel = (0, _vanilla_extract_css.style)({ fontWeight: _hydrotik_tokens.vars.font.weight.medium });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-header-border="thick"] ${headerRow}`, {
	borderBottomWidth: "2px",
	borderBottomColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.primary} 25%, transparent)`
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-header-border="none"] ${headerRow}`, { borderBottom: "none" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-row-separator="subtle"] ${bodyRow}`, { borderBottomColor: "rgba(255,255,255,0.04)" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-row-separator="none"] ${bodyRow}`, { borderBottom: "none" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-no-row-hover] ${bodyRow}:hover`, { backgroundColor: "transparent" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-transparent] ${thead}`, { backgroundColor: "transparent" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-transparent] ${headerCell}`, { backgroundColor: "transparent" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-borderless] ${toolbar}`, { borderBottom: "none" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-borderless] ${footer}`, { borderTop: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}` });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-borderless] ${statusBar}`, {
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`,
	backgroundColor: "transparent"
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="compact"] ${headerCell}`, {
	height: "32px",
	padding: `0 ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="compact"] ${bodyCell}`, { padding: `${_hydrotik_tokens.vars.space["1"]} ${_hydrotik_tokens.vars.space["2"]}` });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="compact"] ${checkboxCell}`, {
	width: "32px",
	maxWidth: "32px"
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${headerCell}`, {
	height: "32px",
	padding: `0 ${_hydrotik_tokens.vars.space["3"]}`,
	fontFamily: _hydrotik_tokens.vars.font.family.mono,
	fontSize: "10px",
	letterSpacing: "1px",
	textTransform: "uppercase",
	color: _hydrotik_tokens.vars.color.chart2,
	fontWeight: _hydrotik_tokens.vars.font.weight.normal
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${bodyCell}`, {
	padding: `6px ${_hydrotik_tokens.vars.space["3"]}`,
	fontSize: "13px",
	color: _hydrotik_tokens.vars.color.textMuted
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${bodyRow}`, { borderBottomColor: "rgba(255,255,255,0.04)" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${bodyRow}:hover`, { backgroundColor: "rgba(59,130,246,0.04)" });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${footer}`, { fontSize: _hydrotik_tokens.vars.font.size.xs });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${paginationButton}`, {
	width: "28px",
	height: "28px",
	fontSize: _hydrotik_tokens.vars.font.size.xs
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${pageSizeSelect}`, {
	height: "28px",
	fontSize: _hydrotik_tokens.vars.font.size.xs
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${paginationInfo}`, { fontSize: _hydrotik_tokens.vars.font.size.xs });
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${searchInput}`, {
	height: "28px",
	fontSize: _hydrotik_tokens.vars.font.size.xs
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${toolbarButton}`, {
	height: "28px",
	fontSize: _hydrotik_tokens.vars.font.size.xs
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${checkbox}`, {
	width: "14px",
	height: "14px"
});
(0, _vanilla_extract_css.globalStyle)(`${gridContainer}[data-density="editorial"] ${checkboxCell}`, {
	width: "32px",
	maxWidth: "32px"
});

//#endregion
//#region src/components/DataGrid/DataGrid.tsx
function SortIndicator({ direction, index, showIndex }) {
	if (!direction) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
		className: sortIcon,
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M7 3L10 6.5H4L7 3Z",
			fill: "currentColor",
			opacity: "0.4"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M7 11L4 7.5H10L7 11Z",
			fill: "currentColor",
			opacity: "0.4"
		})]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		style: {
			display: "inline-flex",
			alignItems: "center"
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			className: `${sortIcon} ${sortIconActive}`,
			width: "14",
			height: "14",
			viewBox: "0 0 14 14",
			fill: "none",
			children: direction === "asc" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M7 3L10 7.5H4L7 3Z",
				fill: "currentColor"
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M7 11L4 6.5H10L7 11Z",
				fill: "currentColor"
			})
		}), showIndex && index >= 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: sortIndex,
			children: index + 1
		})]
	});
}
function ResizeHandle({ column, table }) {
	const isResizing = table.getState().columnSizingInfo.isResizingColumn === column.id;
	const onMouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const startX = e.clientX;
		const startSize = column.getSize();
		const onMouseMove = (e) => {
			const delta = e.clientX - startX;
			table.setColumnSizing((old) => ({
				...old,
				[column.id]: Math.max(column.minSize ?? 40, startSize + delta)
			}));
		};
		const onMouseUp = () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
			table.setColumnSizingInfo((old) => ({
				...old,
				isResizingColumn: false
			}));
		};
		table.setColumnSizingInfo((old) => ({
			...old,
			isResizingColumn: column.id,
			startOffset: startX,
			startSize
		}));
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: resizeHandle,
		"data-resizing": isResizing,
		onMouseDown
	});
}
function SelectAllCheckbox({ table }) {
	const isAll = table.getIsAllPageRowsSelected();
	const isSome = table.getIsSomePageRowsSelected();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
		type: "checkbox",
		className: checkbox,
		checked: isAll,
		"data-indeterminate": isSome && !isAll ? "true" : void 0,
		onChange: () => table.toggleAllPageRowsSelected(),
		"aria-label": "Select all rows"
	});
}
function RowCheckbox({ row }) {
	if (!row.getCanSelect()) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
		type: "checkbox",
		className: checkbox,
		checked: row.getIsSelected(),
		onChange: () => row.toggleSelected(),
		"aria-label": `Select row ${row.id}`
	});
}
function ColumnVisibilityToggle({ table }) {
	const [open, setOpen] = react.default.useState(false);
	const ref = react.default.useRef(null);
	react.default.useEffect(() => {
		if (!open) return;
		const handler = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		style: { position: "relative" },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			className: toolbarButton,
			onClick: () => setOpen(!open),
			"aria-label": "Toggle column visibility",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M1 3.5h12M1 7h12M1 10.5h12",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})
			}), "Columns"]
		}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: visibilityPanel,
			children: table.getAllLeafColumns().map((col) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: visibilityItem,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: checkbox,
					checked: col.getIsVisible(),
					onChange: () => col.toggleVisibility()
				}), typeof col.header === "string" ? col.header : col.id]
			}, col.id))
		})]
	});
}
function HeaderCell({ column, table, showMultiSortIndex }) {
	const canSort = column.getCanSort();
	const isSorted = column.getIsSorted();
	const canResize = column.getCanResize();
	const align = column.align ?? "left";
	const headerContent = typeof column.header === "function" ? column.header({
		column,
		table
	}) : column.header ?? column.id;
	const alignClass = align === "center" ? cellAlignCenter : align === "right" ? cellAlignRight : cellAlignLeft;
	const pinClass = column.pin === "left" ? pinnedLeft : column.pin === "right" ? pinnedRight : "";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("th", {
		className: [
			headerCell,
			canSort ? headerCellSortable : "",
			alignClass,
			pinClass,
			column.headerClassName ?? ""
		].filter(Boolean).join(" "),
		style: { width: column.getSize() },
		onClick: canSort ? (e) => {
			column.toggleSorting(void 0, e.shiftKey);
		} : void 0,
		role: canSort ? "button" : void 0,
		"aria-sort": isSorted === "asc" ? "ascending" : isSorted === "desc" ? "descending" : "none",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: headerCellContent,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: headerCellText,
				children: headerContent
			}), canSort && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SortIndicator, {
				direction: isSorted,
				index: column.getSortIndex(),
				showIndex: showMultiSortIndex
			})]
		}), canResize && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ResizeHandle, {
			column,
			table
		})]
	});
}
function BodyCell({ row, column, table }) {
	const value = row.getValue(column.id);
	const isEditing = table.getState().editing.rowId === row.id && table.getState().editing.columnId === column.id;
	const cellCtx = {
		row,
		column,
		value,
		table,
		getValue: () => value,
		renderValue: () => row.renderValue(column.id)
	};
	const align = column.align ?? "left";
	const alignClass = align === "center" ? cellAlignCenter : align === "right" ? cellAlignRight : cellAlignLeft;
	const pinClass = column.pin === "left" ? pinnedLeft : column.pin === "right" ? pinnedRight : "";
	let content;
	if (isEditing && column.editable) if (column.editor) content = column.editor(cellCtx);
	else content = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultCellEditor, {
		value,
		onSave: (newValue) => {
			table.options.onCellEdit?.(row.id, column.id, newValue);
			table.stopEditing();
		},
		onCancel: () => table.stopEditing()
	});
	else if (column.cell) content = column.cell(cellCtx);
	else content = row.renderValue(column.id)?.toString() ?? "";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
		className: [
			isEditing ? bodyCellEditing : bodyCell,
			alignClass,
			pinClass,
			column.cellClassName ?? ""
		].filter(Boolean).join(" "),
		style: { width: column.getSize() },
		onDoubleClick: column.editable && table.options.enableEditing ? () => table.startEditing(row.id, column.id) : void 0,
		children: content
	});
}
function DefaultCellEditor({ value, onSave, onCancel }) {
	const [editValue, setEditValue] = react.default.useState(String(value ?? ""));
	const inputRef = react.default.useRef(null);
	react.default.useEffect(() => {
		inputRef.current?.focus();
		inputRef.current?.select();
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
		ref: inputRef,
		className: editInput,
		value: editValue,
		onChange: (e) => setEditValue(e.target.value),
		onKeyDown: (e) => {
			if (e.key === "Enter") onSave(editValue);
			if (e.key === "Escape") onCancel();
		},
		onBlur: () => onSave(editValue)
	});
}
function ExpanderCell({ row }) {
	if (!row.subRows.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
		type: "button",
		className: expanderButton,
		onClick: (e) => {
			e.stopPropagation();
			row.toggleExpanded();
		},
		"aria-label": row.getIsExpanded() ? "Collapse row" : "Expand row",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			className: expanderIcon,
			"data-expanded": row.getIsExpanded(),
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M4 2L8 6L4 10",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		})
	});
}
function LoadingRows({ columnCount, rowCount }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: Array.from({ length: rowCount }).map((_, rowIdx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", {
		className: loadingRow,
		children: Array.from({ length: columnCount }).map((_, colIdx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
			className: loadingCell,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: loadingSkeleton,
				style: { width: `${40 + Math.random() * 40}%` }
			})
		}, colIdx))
	}, rowIdx)) });
}
function StatusBar({ table }) {
	const total = table.getPrePaginationRowModel().rows.length;
	const filtered = table.getFilteredRowModel().rows.length;
	const selected = Object.keys(table.getState().rowSelection).length;
	const { pageSize } = table.getState().pagination;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: statusBar,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: statusBarLabel,
						children: "Rows:"
					}),
					" ",
					total
				]
			}),
			filtered !== total && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: statusBarLabel,
						children: "Filtered:"
					}),
					" ",
					filtered
				]
			}),
			selected > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: statusBarLabel,
						children: "Selected:"
					}),
					" ",
					selected
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: statusBarLabel,
						children: "Page Size:"
					}),
					" ",
					pageSize
				]
			})
		]
	});
}
function PaginationFooter({ table }) {
	const { pageIndex, pageSize } = table.getState().pagination;
	const pageCount = table.getPageCount();
	const totalRows = table.getPrePaginationRowModel().rows.length;
	const selected = Object.keys(table.getState().rowSelection).length;
	const pageSizeOptions = table.options.pageSizeOptions ?? [
		10,
		20,
		50,
		100
	];
	const maxButtons = 5;
	let startPage = Math.max(0, pageIndex - Math.floor(maxButtons / 2));
	const endPage = Math.min(pageCount, startPage + maxButtons);
	startPage = Math.max(0, endPage - maxButtons);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: footer,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: footerLeft,
			children: [selected > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
				selected,
				" of ",
				totalRows,
				" row(s) selected"
			] }), selected === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [totalRows, " row(s)"] })]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: footerRight,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: paginationInfo,
					children: "Rows per page:"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
					value: String(pageSize),
					onValueChange: (val) => table.setPageSize(() => Number(val)),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, {
						className: pageSizeSelect,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent, { children: pageSizeOptions.map((size) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
						value: String(size),
						children: size
					}, size)) })]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: paginationInfo,
					children: [
						"Page ",
						pageIndex + 1,
						" of ",
						pageCount
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: paginationButton,
					onClick: () => table.firstPage(),
					disabled: !table.getCanPreviousPage(),
					"aria-label": "First page",
					children: "⟨⟨"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: paginationButton,
					onClick: () => table.previousPage(),
					disabled: !table.getCanPreviousPage(),
					"aria-label": "Previous page",
					children: "⟨"
				}),
				Array.from({ length: endPage - startPage }).map((_, i) => {
					const page = startPage + i;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: paginationButton,
						"data-active": page === pageIndex,
						onClick: () => table.setPageIndex(() => page),
						children: page + 1
					}, page);
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: paginationButton,
					onClick: () => table.nextPage(),
					disabled: !table.getCanNextPage(),
					"aria-label": "Next page",
					children: "⟩"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: paginationButton,
					onClick: () => table.lastPage(),
					disabled: !table.getCanNextPage(),
					"aria-label": "Last page",
					children: "⟩⟩"
				})
			]
		})]
	});
}
function DataGrid({ height, showToolbar = true, showStatusBar = false, showFooter, showColumnFilters = false, emptyMessage = "No data available", loading = false, loadingRows: loadingRowCount = 5, className, toolbarLeft: customToolbarLeft, toolbarRight: customToolbarRight, style: containerStyle, table: externalTable, onRowClick, onRowDoubleClick, borderless = false, density = "default", headerBorder = "thin", rowSeparator = "full", transparent = false, noRowHover = false, ...options }) {
	const internalTable = useDataGrid(options);
	const table$2 = externalTable ?? internalTable;
	const enableSelection = options.enableRowSelection !== false && options.enableRowSelection !== void 0;
	const enablePagination = options.enablePagination ?? true;
	const enableGlobalFilter = options.enableGlobalFilter ?? true;
	const enableColumnVisibility = options.enableColumnVisibility ?? true;
	const enableExpanding = options.enableExpanding ?? false;
	const visibleColumns = table$2.getVisibleLeafColumns();
	const headerGroups = table$2.getHeaderGroups();
	const rowModel = table$2.getRowModel();
	const hasMultiSort = table$2.getState().sorting.length > 1;
	const showPaginationFooter = showFooter ?? enablePagination;
	const totalColumnCount = visibleColumns.length + (enableSelection ? 1 : 0);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: [gridContainer, className].filter(Boolean).join(" "),
		style: containerStyle,
		"data-borderless": borderless || void 0,
		"data-density": density !== "default" ? density : void 0,
		"data-header-border": headerBorder !== "thin" ? headerBorder : void 0,
		"data-row-separator": rowSeparator !== "full" ? rowSeparator : void 0,
		"data-transparent": transparent || void 0,
		"data-no-row-hover": noRowHover || void 0,
		children: [
			showToolbar && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: toolbar,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: toolbarLeft,
					children: [
						customToolbarLeft,
						enableGlobalFilter && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: searchInput,
							placeholder: "Search all columns…",
							value: table$2.getState().globalFilter ?? "",
							onChange: (e) => table$2.setGlobalFilter(e.target.value)
						}),
						enableSelection && Object.keys(table$2.getState().rowSelection).length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: selectionInfo,
							children: [Object.keys(table$2.getState().rowSelection).length, " selected"]
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: toolbarRight,
					children: [customToolbarRight, enableColumnVisibility && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColumnVisibilityToggle, { table: table$2 })]
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: tableScrollArea,
				style: height ? { maxHeight: height } : void 0,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
					className: table,
					role: "grid",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("thead", {
						className: thead,
						children: [headerGroups.map((headerGroup) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", {
							className: headerRow,
							children: [enableSelection && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
								className: `${headerCell} ${checkboxCell}`,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectAllCheckbox, { table: table$2 })
							}), headerGroup.headers.filter((col) => col.getIsVisible()).map((column) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HeaderCell, {
								column,
								table: table$2,
								showMultiSortIndex: hasMultiSort
							}, column.id))]
						}, headerGroup.id)), showColumnFilters && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", {
							className: columnFilterRow,
							children: [enableSelection && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { className: checkboxCell }), visibleColumns.map((column) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
								className: columnFilterCell,
								children: column.getCanFilter() ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: columnFilterInput,
									placeholder: `Filter ${typeof column.header === "string" ? column.header : column.id}…`,
									value: String(column.getFilterValue() ?? ""),
									onChange: (e) => column.setFilterValue(e.target.value || void 0)
								}) : null
							}, column.id))]
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", {
						className: tbody,
						children: loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LoadingRows, {
							columnCount: totalColumnCount,
							rowCount: loadingRowCount
						}) : rowModel.rows.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: emptyState,
							colSpan: totalColumnCount,
							children: emptyMessage
						}) }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RenderRows, {
							rows: rowModel.rows,
							visibleColumns,
							table: table$2,
							enableSelection,
							enableExpanding,
							onRowClick,
							onRowDoubleClick
						})
					})]
				})
			}),
			showStatusBar && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatusBar, { table: table$2 }),
			showPaginationFooter && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PaginationFooter, { table: table$2 })
		]
	});
}
function RenderRows({ rows, visibleColumns, table, enableSelection, enableExpanding, onRowClick, onRowDoubleClick, depth = 0 }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.default.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", {
		className: bodyRow,
		"data-selected": row.getIsSelected(),
		onClick: onRowClick ? () => onRowClick(row) : void 0,
		onDoubleClick: onRowDoubleClick ? () => onRowDoubleClick(row) : void 0,
		style: onRowClick || onRowDoubleClick ? { cursor: "pointer" } : void 0,
		children: [enableSelection && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
			className: `${bodyCell} ${checkboxCell}`,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RowCheckbox, { row })
		}), visibleColumns.map((column, colIdx) => {
			if (colIdx === 0 && enableExpanding) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
				className: [bodyCell, column.cellClassName ?? ""].filter(Boolean).join(" "),
				style: { width: column.getSize() },
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "4px"
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: depthIndent,
							style: { width: depth * 20 }
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ExpanderCell, { row }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: {
								overflow: "hidden",
								textOverflow: "ellipsis"
							},
							children: column.cell ? column.cell({
								row,
								column,
								value: row.getValue(column.id),
								table,
								getValue: () => row.getValue(column.id),
								renderValue: () => row.renderValue(column.id)
							}) : row.renderValue(column.id)?.toString() ?? ""
						})
					]
				})
			}, column.id);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BodyCell, {
				row,
				column,
				table
			}, column.id);
		})]
	}), enableExpanding && row.getIsExpanded() && row.subRows.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RenderRows, {
		rows: row.subRows,
		visibleColumns,
		table,
		enableSelection,
		enableExpanding,
		onRowClick,
		onRowDoubleClick,
		depth: depth + 1
	})] }, row.id)) });
}
DataGrid.displayName = "DataGrid";

//#endregion
exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.Alert = Alert;
exports.AlertDescription = AlertDescription;
exports.AlertDialog = AlertDialog;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
exports.AlertTitle = AlertTitle;
exports.AspectRatio = AspectRatio;
exports.Avatar = Avatar;
exports.AvatarFallback = AvatarFallback;
exports.AvatarImage = AvatarImage;
exports.Badge = Badge;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.BreadcrumbList = BreadcrumbList;
exports.BreadcrumbPage = BreadcrumbPage;
exports.BreadcrumbSeparator = BreadcrumbSeparator;
exports.Button = Button;
exports.Card = Card;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
exports.Checkbox = Checkbox;
exports.Collapsible = Collapsible;
exports.CollapsibleContent = CollapsibleContent;
exports.CollapsibleTrigger = CollapsibleTrigger;
exports.Command = Command;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandInput = CommandInput;
exports.CommandItem = CommandItem;
exports.CommandList = CommandList;
exports.CommandSeparator = CommandSeparator;
exports.CommandShortcut = CommandShortcut;
exports.ContextMenu = ContextMenu;
exports.ContextMenuCheckboxItem = ContextMenuCheckboxItem;
exports.ContextMenuContent = ContextMenuContent;
exports.ContextMenuGroup = ContextMenuGroup;
exports.ContextMenuItem = ContextMenuItem;
exports.ContextMenuLabel = ContextMenuLabel;
exports.ContextMenuPortal = ContextMenuPortal;
exports.ContextMenuRadioGroup = ContextMenuRadioGroup;
exports.ContextMenuRadioItem = ContextMenuRadioItem;
exports.ContextMenuSeparator = ContextMenuSeparator;
exports.ContextMenuShortcut = ContextMenuShortcut;
exports.ContextMenuSub = ContextMenuSub;
exports.ContextMenuSubContent = ContextMenuSubContent;
exports.ContextMenuSubTrigger = ContextMenuSubTrigger;
exports.ContextMenuTrigger = ContextMenuTrigger;
exports.DataGrid = DataGrid;
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuPortal = DropdownMenuPortal;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.FieldMessage = FieldMessage;
exports.FlagTag = FlagTag;
exports.HoverCard = HoverCard;
exports.HoverCardContent = HoverCardContent;
exports.HoverCardTrigger = HoverCardTrigger;
Object.defineProperty(exports, 'Icons', {
  enumerable: true,
  get: function () {
    return lucide_react;
  }
});
exports.Input = Input;
exports.InputGroup = InputGroup;
exports.InputGroupAddon = InputGroupAddon;
exports.InputGroupToolbar = InputGroupToolbar;
exports.Kbd = Kbd;
exports.Label = Label;
exports.Menubar = Menubar;
exports.MenubarCheckboxItem = MenubarCheckboxItem;
exports.MenubarContent = MenubarContent;
exports.MenubarGroup = MenubarGroup;
exports.MenubarItem = MenubarItem;
exports.MenubarLabel = MenubarLabel;
exports.MenubarMenu = MenubarMenu;
exports.MenubarPortal = MenubarPortal;
exports.MenubarRadioGroup = MenubarRadioGroup;
exports.MenubarRadioItem = MenubarRadioItem;
exports.MenubarSeparator = MenubarSeparator;
exports.MenubarShortcut = MenubarShortcut;
exports.MenubarSub = MenubarSub;
exports.MenubarSubContent = MenubarSubContent;
exports.MenubarSubTrigger = MenubarSubTrigger;
exports.MenubarTrigger = MenubarTrigger;
exports.NavigationMenu = NavigationMenu;
exports.NavigationMenuContent = NavigationMenuContent;
exports.NavigationMenuIndicator = NavigationMenuIndicator;
exports.NavigationMenuItem = NavigationMenuItem;
exports.NavigationMenuLink = NavigationMenuLink;
exports.NavigationMenuList = NavigationMenuList;
exports.NavigationMenuTrigger = NavigationMenuTrigger;
exports.NavigationMenuViewport = NavigationMenuViewport;
exports.Pagination = Pagination;
exports.PaginationContent = PaginationContent;
exports.PaginationEllipsis = PaginationEllipsis;
exports.PaginationItem = PaginationItem;
exports.PaginationLink = PaginationLink;
exports.PaginationNext = PaginationNext;
exports.PaginationPrevious = PaginationPrevious;
exports.Popover = Popover;
exports.PopoverAnchor = PopoverAnchor;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.Progress = Progress;
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
exports.ScrollArea = ScrollArea;
exports.ScrollBar = ScrollBar;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Separator = Separator;
exports.Sheet = Sheet;
exports.SheetBody = SheetBody;
exports.SheetClose = SheetClose;
exports.SheetContent = SheetContent;
exports.SheetDescription = SheetDescription;
exports.SheetFooter = SheetFooter;
exports.SheetHeader = SheetHeader;
exports.SheetOverlay = SheetOverlay;
exports.SheetPortal = SheetPortal;
exports.SheetTitle = SheetTitle;
exports.SheetTrigger = SheetTrigger;
exports.Skeleton = Skeleton;
exports.Slider = Slider;
exports.SourceRatingBar = SourceRatingBar;
exports.Spinner = Spinner;
exports.Switch = Switch;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.TableWrapper = TableWrapper;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.Textarea = Textarea;
exports.Toast = Toast;
exports.ToastAction = ToastAction;
exports.ToastClose = ToastClose;
exports.ToastDescription = ToastDescription;
exports.ToastProvider = ToastProvider;
exports.ToastTitle = ToastTitle;
exports.ToastViewport = ToastViewport;
exports.Toggle = Toggle;
exports.ToggleGroup = ToggleGroup;
exports.ToggleGroupItem = ToggleGroupItem;
exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
exports.TypographyBlockquote = TypographyBlockquote;
exports.TypographyH1 = TypographyH1;
exports.TypographyH2 = TypographyH2;
exports.TypographyH3 = TypographyH3;
exports.TypographyH4 = TypographyH4;
exports.TypographyHr = TypographyHr;
exports.TypographyInlineCode = TypographyInlineCode;
exports.TypographyLarge = TypographyLarge;
exports.TypographyLead = TypographyLead;
exports.TypographyMuted = TypographyMuted;
exports.TypographyOl = TypographyOl;
exports.TypographyP = TypographyP;
exports.TypographySmall = TypographySmall;
exports.TypographyUl = TypographyUl;
exports.createDataGrid = createDataGrid;
exports.inputGroupInputClass = inputGroupInput;
exports.useDataGrid = useDataGrid;
//# sourceMappingURL=index.cjs.map