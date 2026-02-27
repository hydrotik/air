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
let lucide_react = require("lucide-react");
lucide_react = __toESM(lucide_react);

//#region src/components/Accordion/Accordion.css.ts
const slideDown = (0, _vanilla_extract_css.keyframes)({
	from: { height: "0" },
	to: { height: "var(--radix-accordion-content-height)" }
});
const slideUp = (0, _vanilla_extract_css.keyframes)({
	from: { height: "var(--radix-accordion-content-height)" },
	to: { height: "0" }
});
const accordionRoot = (0, _vanilla_extract_css.style)({
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	overflow: "hidden"
});
const accordionItem = (0, _vanilla_extract_css.style)({
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`,
	selectors: { "&:last-child": { borderBottom: "none" } }
});
const accordionTrigger = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	padding: `${_hydrotik_tokens.vars.space["4"]} ${_hydrotik_tokens.vars.space["4"]}`,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	textAlign: "left",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "-2px"
		}
	}
});
const accordionChevron = (0, _vanilla_extract_css.style)({
	transition: `transform ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
	flexShrink: 0,
	color: _hydrotik_tokens.vars.color.textMuted
});
(0, _vanilla_extract_css.globalStyle)(`${accordionTrigger}[data-state="open"] ${accordionChevron}`, { transform: "rotate(180deg)" });
const accordionContent = (0, _vanilla_extract_css.style)({
	overflow: "hidden",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	selectors: {
		"&[data-state=\"open\"]": { animation: `${slideDown} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` },
		"&[data-state=\"closed\"]": { animation: `${slideUp} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}` }
	}
});
const accordionContentInner = (0, _vanilla_extract_css.style)({ padding: `0 ${_hydrotik_tokens.vars.space["4"]} ${_hydrotik_tokens.vars.space["4"]}` });

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
	asChild: true,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_accordion.Trigger, {
		ref,
		className: [accordionTrigger, className].filter(Boolean).join(" "),
		...props,
		children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			className: accordionChevron,
			width: "15",
			height: "15",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
				fill: "currentColor"
			})
		})]
	}) })
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
const alertRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		position: "relative",
		display: "flex",
		gap: _hydrotik_tokens.vars.space["3"],
		width: "100%",
		borderRadius: _hydrotik_tokens.vars.radii.lg,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		padding: _hydrotik_tokens.vars.space["4"],
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal
	},
	variants: { variant: {
		default: {
			backgroundColor: _hydrotik_tokens.vars.color.surface,
			color: _hydrotik_tokens.vars.color.text
		},
		destructive: {
			borderColor: _hydrotik_tokens.vars.color.destructive,
			color: _hydrotik_tokens.vars.color.destructive
		},
		success: {
			borderColor: _hydrotik_tokens.vars.color.success,
			color: _hydrotik_tokens.vars.color.success
		},
		warning: {
			borderColor: _hydrotik_tokens.vars.color.warning,
			color: _hydrotik_tokens.vars.color.warning
		}
	} },
	defaultVariants: { variant: "default" }
});
const alertIcon = (0, _vanilla_extract_css.style)({
	flexShrink: 0,
	marginTop: "1px"
});
const alertTitle = (0, _vanilla_extract_css.style)({
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.tight,
	marginBottom: _hydrotik_tokens.vars.space["1"]
});
const alertDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed
});

//#endregion
//#region src/components/Alert/Alert.tsx
const Alert = react.default.forwardRef(({ variant = "default", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	role: "alert",
	className: [alertRecipe({ variant }), className].filter(Boolean).join(" "),
	...props
}));
Alert.displayName = "Alert";
const AlertIcon = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [alertIcon, className].filter(Boolean).join(" "),
	...props
}));
AlertIcon.displayName = "AlertIcon";
const AlertTitle = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h5", {
	ref,
	className: [alertTitle, className].filter(Boolean).join(" "),
	...props
}));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
	ref,
	className: [alertDescription, className].filter(Boolean).join(" "),
	...props
}));
AlertDescription.displayName = "AlertDescription";

//#endregion
//#region src/components/AlertDialog/AlertDialog.css.ts
const overlayShow$2 = (0, _vanilla_extract_css.keyframes)({
	from: { opacity: "0" },
	to: { opacity: "1" }
});
const contentShow$1 = (0, _vanilla_extract_css.keyframes)({
	from: {
		opacity: "0",
		transform: "translate(-50%, -48%) scale(0.95)"
	},
	to: {
		opacity: "1",
		transform: "translate(-50%, -50%) scale(1)"
	}
});
const alertDialogOverlay = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.overlay,
	position: "fixed",
	inset: 0,
	zIndex: _hydrotik_tokens.vars.zIndex.overlay,
	animation: `${overlayShow$2} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
});
const alertDialogContent = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.surfaceOverlay,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.xl,
	boxShadow: _hydrotik_tokens.vars.shadow.xl,
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90vw",
	maxWidth: "500px",
	maxHeight: "85vh",
	padding: _hydrotik_tokens.vars.space["6"],
	zIndex: _hydrotik_tokens.vars.zIndex.modal,
	animation: `${contentShow$1} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: { "&:focus-visible": { outline: "none" } }
});
const alertDialogHeader = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space["2"],
	marginBottom: _hydrotik_tokens.vars.space["4"]
});
const alertDialogFooter = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: _hydrotik_tokens.vars.space["3"],
	marginTop: _hydrotik_tokens.vars.space["6"]
});
const alertDialogTitle = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.lg,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight
});
const alertDialogDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed
});

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
			width: _hydrotik_tokens.vars.space["8"],
			height: _hydrotik_tokens.vars.space["8"]
		},
		md: {
			width: _hydrotik_tokens.vars.space["10"],
			height: _hydrotik_tokens.vars.space["10"]
		},
		lg: {
			width: _hydrotik_tokens.vars.space["12"],
			height: _hydrotik_tokens.vars.space["12"]
		},
		xl: {
			width: _hydrotik_tokens.vars.space["16"],
			height: _hydrotik_tokens.vars.space["16"]
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
const badgeRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		borderRadius: _hydrotik_tokens.vars.radii.full,
		fontWeight: _hydrotik_tokens.vars.font.weight.medium,
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		whiteSpace: "nowrap",
		lineHeight: "1",
		border: "1px solid transparent"
	},
	variants: {
		variant: {
			default: {
				backgroundColor: _hydrotik_tokens.vars.color.secondary,
				color: _hydrotik_tokens.vars.color.secondaryForeground,
				borderColor: _hydrotik_tokens.vars.color.border
			},
			primary: {
				backgroundColor: `${_hydrotik_tokens.vars.color.primary}20`,
				color: _hydrotik_tokens.vars.color.primary,
				borderColor: `${_hydrotik_tokens.vars.color.primary}40`
			},
			destructive: {
				backgroundColor: `${_hydrotik_tokens.vars.color.destructive}20`,
				color: _hydrotik_tokens.vars.color.destructive,
				borderColor: `${_hydrotik_tokens.vars.color.destructive}40`
			},
			success: {
				backgroundColor: `${_hydrotik_tokens.vars.color.success}20`,
				color: _hydrotik_tokens.vars.color.success,
				borderColor: `${_hydrotik_tokens.vars.color.success}40`
			},
			warning: {
				backgroundColor: `${_hydrotik_tokens.vars.color.warning}20`,
				color: _hydrotik_tokens.vars.color.warning,
				borderColor: `${_hydrotik_tokens.vars.color.warning}40`
			},
			outline: {
				backgroundColor: "transparent",
				color: _hydrotik_tokens.vars.color.text,
				borderColor: _hydrotik_tokens.vars.color.border
			}
		},
		size: {
			sm: {
				fontSize: _hydrotik_tokens.vars.font.size.xs,
				padding: `2px ${_hydrotik_tokens.vars.space["2"]}`
			},
			md: {
				fontSize: _hydrotik_tokens.vars.font.size.xs,
				padding: `${_hydrotik_tokens.vars.space["0_5"]} ${_hydrotik_tokens.vars.space["2_5"]}`
			},
			lg: {
				fontSize: _hydrotik_tokens.vars.font.size.sm,
				padding: `${_hydrotik_tokens.vars.space["1"]} ${_hydrotik_tokens.vars.space["3"]}`
			}
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});

//#endregion
//#region src/components/Badge/Badge.tsx
const Badge = react.default.forwardRef(({ variant = "default", size = "md", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	ref,
	className: [badgeRecipe({
		variant,
		size
	}), className].filter(Boolean).join(" "),
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
	children: children ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
			fill: "currentColor"
		})
	})
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const BreadcrumbEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
	role: "presentation",
	"aria-hidden": "true",
	className: [breadcrumbEllipsis, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z",
			fill: "currentColor"
		})
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		style: {
			position: "absolute",
			width: "1px",
			height: "1px",
			overflow: "hidden",
			clip: "rect(0,0,0,0)"
		},
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
const buttonRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: _hydrotik_tokens.vars.space["2"],
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontWeight: _hydrotik_tokens.vars.font.weight.medium,
		letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide,
		borderRadius: _hydrotik_tokens.vars.radii.md,
		border: "1px solid transparent",
		cursor: "pointer",
		textDecoration: "none",
		whiteSpace: "nowrap",
		flexShrink: 0,
		transition: [
			`background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`border-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
			`opacity ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
		].join(", "),
		selectors: {
			"&:focus-visible": {
				outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
				outlineOffset: "2px"
			},
			"&:disabled, &[aria-disabled=\"true\"]": {
				opacity: "0.45",
				cursor: "not-allowed",
				pointerEvents: "none"
			}
		}
	},
	variants: {
		variant: {
			primary: {
				backgroundColor: _hydrotik_tokens.vars.color.primary,
				color: _hydrotik_tokens.vars.color.primaryForeground,
				borderColor: _hydrotik_tokens.vars.color.primary,
				boxShadow: `0 1px 2px rgba(0,0,0,0.3)`,
				selectors: {
					"&:hover:not(:disabled)": { filter: "brightness(1.1)" },
					"&:active:not(:disabled)": { filter: "brightness(0.95)" }
				}
			},
			secondary: {
				backgroundColor: _hydrotik_tokens.vars.color.secondary,
				color: _hydrotik_tokens.vars.color.secondaryForeground,
				borderColor: _hydrotik_tokens.vars.color.border,
				selectors: { "&:hover:not(:disabled)": { backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated } }
			},
			outline: {
				backgroundColor: "transparent",
				color: _hydrotik_tokens.vars.color.text,
				borderColor: _hydrotik_tokens.vars.color.border,
				selectors: { "&:hover:not(:disabled)": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } }
			},
			ghost: {
				backgroundColor: "transparent",
				color: _hydrotik_tokens.vars.color.text,
				borderColor: "transparent",
				selectors: { "&:hover:not(:disabled)": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } }
			},
			destructive: {
				backgroundColor: _hydrotik_tokens.vars.color.destructive,
				color: _hydrotik_tokens.vars.color.destructiveForeground,
				borderColor: _hydrotik_tokens.vars.color.destructive,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(1.1)" } }
			}
		},
		size: {
			sm: {
				height: _hydrotik_tokens.vars.space["8"],
				paddingLeft: _hydrotik_tokens.vars.space["3"],
				paddingRight: _hydrotik_tokens.vars.space["3"],
				fontSize: _hydrotik_tokens.vars.font.size.sm
			},
			md: {
				height: _hydrotik_tokens.vars.space["10"],
				paddingLeft: _hydrotik_tokens.vars.space["4"],
				paddingRight: _hydrotik_tokens.vars.space["4"],
				fontSize: _hydrotik_tokens.vars.font.size.sm
			},
			lg: {
				height: _hydrotik_tokens.vars.space["12"],
				paddingLeft: _hydrotik_tokens.vars.space["6"],
				paddingRight: _hydrotik_tokens.vars.space["6"],
				fontSize: _hydrotik_tokens.vars.font.size.md
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
		variant: "primary",
		size: "md",
		loading: false,
		fullWidth: false
	}
});

//#endregion
//#region src/components/Button/Button.tsx
/**
* Button — primary interactive element.
*
* @example
* ```tsx
* <Button variant="primary" size="md">Save changes</Button>
* <Button variant="outline" loading>Submitting...</Button>
* <Button asChild><a href="/dashboard">Go to dashboard</a></Button>
* ```
*/
const Button = (0, react.forwardRef)(({ variant = "primary", size = "md", loading = false, fullWidth = false, asChild = false, className, children, disabled, ...props }, ref) => {
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
const cardRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		backgroundColor: _hydrotik_tokens.vars.color.surface,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		borderRadius: _hydrotik_tokens.vars.radii.lg,
		overflow: "hidden"
	},
	variants: {
		elevation: {
			flat: {},
			raised: { boxShadow: _hydrotik_tokens.vars.shadow.sm },
			elevated: {
				backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
				boxShadow: _hydrotik_tokens.vars.shadow.md
			}
		},
		padding: {
			none: {},
			sm: { padding: _hydrotik_tokens.vars.space["4"] },
			md: { padding: _hydrotik_tokens.vars.space["6"] },
			lg: { padding: _hydrotik_tokens.vars.space["8"] }
		}
	},
	defaultVariants: {
		elevation: "raised",
		padding: "md"
	}
});
const cardHeader = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space["1_5"],
	paddingBottom: _hydrotik_tokens.vars.space["4"],
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`,
	marginBottom: _hydrotik_tokens.vars.space["4"]
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
const cardFooter = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space["3"],
	paddingTop: _hydrotik_tokens.vars.space["4"],
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`,
	marginTop: _hydrotik_tokens.vars.space["4"]
});

//#endregion
//#region src/components/Card/Card.tsx
const Card = react.default.forwardRef(({ elevation = "raised", padding = "md", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [cardRecipe({
		elevation,
		padding
	}), className].filter(Boolean).join(" "),
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
const CardFooter = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: [cardFooter, className].filter(Boolean).join(" "),
	...props
}));
CardFooter.displayName = "CardFooter";
const CardContent = react.default.forwardRef((props, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	...props
}));
CardContent.displayName = "CardContent";

//#endregion
//#region src/components/Checkbox/Checkbox.css.ts
const checkboxRoot = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "16px",
	height: "16px",
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	cursor: "pointer",
	flexShrink: 0,
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { borderColor: _hydrotik_tokens.vars.color.primary },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
		},
		"&[data-state=\"checked\"], &[data-state=\"indeterminate\"]": {
			backgroundColor: _hydrotik_tokens.vars.color.primary,
			borderColor: _hydrotik_tokens.vars.color.primary,
			color: _hydrotik_tokens.vars.color.primaryForeground
		},
		"&:disabled": {
			opacity: "0.45",
			cursor: "not-allowed"
		}
	}
});
const checkboxIndicator = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "10",
			height: "10",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3354 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.5553 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
				fill: "currentColor",
				fillRule: "evenodd",
				clipRule: "evenodd"
			})
		})
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
	height: _hydrotik_tokens.vars.space["12"],
	padding: `0 ${_hydrotik_tokens.vars.space["4"]}`,
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
		children: icon ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
				fill: "currentColor",
				fillRule: "evenodd",
				clipRule: "evenodd"
			})
		})
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
const contextMenuContent = (0, _vanilla_extract_css.style)({
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	minWidth: "160px",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	padding: _hydrotik_tokens.vars.space["1"],
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	animation: `${slideIn$2} ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`
});
const contextMenuItem = (0, _vanilla_extract_css.style)({
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
		"&[data-highlighted]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[data-disabled]": {
			color: _hydrotik_tokens.vars.color.textDisabled,
			pointerEvents: "none"
		}
	}
});
const contextMenuCheckboxItem = (0, _vanilla_extract_css.style)([contextMenuItem, {}]);
const contextMenuRadioItem = (0, _vanilla_extract_css.style)([contextMenuItem, {}]);
const contextMenuLabel = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.textMuted
});
const contextMenuSeparator = (0, _vanilla_extract_css.style)({
	height: "1px",
	margin: `${_hydrotik_tokens.vars.space["1"]} ${_hydrotik_tokens.vars.space["0_5"]}`,
	backgroundColor: _hydrotik_tokens.vars.color.borderSubtle
});
const contextMenuShortcut = (0, _vanilla_extract_css.style)({
	marginLeft: "auto",
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide,
	color: _hydrotik_tokens.vars.color.textMuted
});
const contextMenuSubTrigger = (0, _vanilla_extract_css.style)([contextMenuItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } } }]);
const contextMenuSubContent = (0, _vanilla_extract_css.style)([contextMenuContent, {}]);
const contextMenuItemIndicator = (0, _vanilla_extract_css.style)({
	position: "absolute",
	left: _hydrotik_tokens.vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "14px",
	height: "14px"
});

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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "10",
			height: "10",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3354 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.5553 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
				fill: "currentColor",
				fillRule: "evenodd",
				clipRule: "evenodd"
			})
		}) })
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_context_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "8",
			height: "8",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
				cx: "7.5",
				cy: "7.5",
				r: "4.5",
				fill: "currentColor"
			})
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
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		style: { marginLeft: "auto" },
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
			fill: "currentColor"
		})
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
const dialogOverlay = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.overlay,
	position: "fixed",
	inset: 0,
	zIndex: _hydrotik_tokens.vars.zIndex.overlay,
	animation: `${overlayShow$1} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: { "&[data-state=\"closed\"]": { animationDirection: "reverse" } }
});
const dialogContent = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.surfaceOverlay,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.xl,
	boxShadow: _hydrotik_tokens.vars.shadow.xl,
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90vw",
	maxWidth: "560px",
	maxHeight: "85vh",
	overflowY: "auto",
	padding: _hydrotik_tokens.vars.space["6"],
	zIndex: _hydrotik_tokens.vars.zIndex.modal,
	animation: `${contentShow} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: { "&:focus-visible": { outline: "none" } }
});
const dialogHeader = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space["1_5"],
	marginBottom: _hydrotik_tokens.vars.space["5"]
});
const dialogFooter = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: _hydrotik_tokens.vars.space["3"],
	marginTop: _hydrotik_tokens.vars.space["6"],
	paddingTop: _hydrotik_tokens.vars.space["4"],
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.borderSubtle}`
});
const dialogTitle = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.xl,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight,
	margin: 0
});
const dialogDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
	margin: 0
});
const dialogClose = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: _hydrotik_tokens.vars.space["4"],
	right: _hydrotik_tokens.vars.space["4"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: _hydrotik_tokens.vars.space["8"],
	height: _hydrotik_tokens.vars.space["8"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": {
			color: _hydrotik_tokens.vars.color.text,
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover
		},
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
		}
	}
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
const DialogContent = react.default.forwardRef(({ className, children, showClose = true, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Content, {
	ref,
	className: [dialogContent, className].filter(Boolean).join(" "),
	...props,
	children: [children, showClose && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Close, {
		className: dialogClose,
		"aria-label": "Close dialog",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
				fill: "currentColor"
			})
		})
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
const dropdownContent = (0, _vanilla_extract_css.style)({
	minWidth: "180px",
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	padding: _hydrotik_tokens.vars.space[1],
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	animationDuration: _hydrotik_tokens.vars.motion.duration.normal,
	animationTimingFunction: _hydrotik_tokens.vars.motion.easing.default,
	selectors: {
		"&[data-side=\"top\"]": { animationName: slideUpAndFade$1 },
		"&[data-side=\"bottom\"]": { animationName: slideDownAndFade$1 },
		"&[data-side=\"left\"]": { animationName: slideLeftAndFade },
		"&[data-side=\"right\"]": { animationName: slideRightAndFade }
	}
});
const dropdownItem = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space[2],
	padding: `${_hydrotik_tokens.vars.space[2]} ${_hydrotik_tokens.vars.space[3]}`,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.text,
	cursor: "default",
	userSelect: "none",
	outline: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": {
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
			color: _hydrotik_tokens.vars.color.primary
		},
		"&[data-disabled]": {
			opacity: .5,
			pointerEvents: "none"
		}
	}
});
const dropdownDestructiveItem = (0, _vanilla_extract_css.style)([dropdownItem, { selectors: { "&[data-highlighted]": {
	backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
	color: _hydrotik_tokens.vars.color.destructive
} } }]);
const dropdownLabel = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space[1]} ${_hydrotik_tokens.vars.space[3]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.textMuted,
	textTransform: "uppercase",
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide
});
const dropdownSeparator = (0, _vanilla_extract_css.style)({
	height: "1px",
	backgroundColor: _hydrotik_tokens.vars.color.border,
	margin: `${_hydrotik_tokens.vars.space[1]} 0`
});
const dropdownItemIndicator = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: _hydrotik_tokens.vars.space[4],
	flexShrink: 0,
	color: _hydrotik_tokens.vars.color.primary
});
const dropdownCheckboxItem = (0, _vanilla_extract_css.style)([dropdownItem, {
	paddingLeft: _hydrotik_tokens.vars.space[8],
	position: "relative"
}]);
const dropdownRadioItem = (0, _vanilla_extract_css.style)([dropdownCheckboxItem]);
const dropdownSubTrigger = (0, _vanilla_extract_css.style)([dropdownItem, { selectors: { "&[data-state=\"open\"]": {
	backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
	color: _hydrotik_tokens.vars.color.primary
} } }]);
const dropdownSubContent = (0, _vanilla_extract_css.style)([dropdownContent]);
const dropdownShortcut = (0, _vanilla_extract_css.style)({
	marginLeft: "auto",
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	color: _hydrotik_tokens.vars.color.textMuted,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide
});

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
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		style: { marginLeft: "auto" },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M4.5 2.5L8 6L4.5 9.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
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
const DropdownMenuContent = react.default.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Content, {
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M2 6L5 9L10 3",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		}) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
const DropdownMenuRadioItem = react.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dropdown_menu.RadioItem, {
	ref,
	className: [dropdownRadioItem, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: dropdownItemIndicator,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "8",
			height: "8",
			viewBox: "0 0 8 8",
			fill: "currentColor",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
				cx: "4",
				cy: "4",
				r: "4"
			})
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
	variants: { intent: {
		error: { color: _hydrotik_tokens.vars.color.destructive },
		help: { color: _hydrotik_tokens.vars.color.textMuted },
		success: { color: _hydrotik_tokens.vars.color.success }
	} },
	defaultVariants: { intent: "help" }
});

//#endregion
//#region src/components/FieldMessage/FieldMessage.tsx
const FieldMessage = react.default.forwardRef(({ intent = "help", className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
	ref,
	className: [fieldMessageRecipe({ intent }), className].filter(Boolean).join(" "),
	role: intent === "error" ? "alert" : void 0,
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
	width: "320px",
	borderRadius: _hydrotik_tokens.vars.radii.lg,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
	padding: _hydrotik_tokens.vars.space["4"],
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
const inputRecipe = (0, _vanilla_extract_recipes.recipe)({
	base: {
		width: "100%",
		backgroundColor: _hydrotik_tokens.vars.color.input,
		color: _hydrotik_tokens.vars.color.text,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		borderRadius: _hydrotik_tokens.vars.radii.md,
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
		transition: [`border-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`, `box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`].join(", "),
		selectors: {
			"&::placeholder": { color: _hydrotik_tokens.vars.color.placeholder },
			"&:hover:not(:disabled):not([aria-invalid=\"true\"])": { borderColor: _hydrotik_tokens.vars.color.textMuted },
			"&:focus-visible": {
				outline: "none",
				borderColor: _hydrotik_tokens.vars.color.focusRing,
				boxShadow: `0 0 0 2px ${_hydrotik_tokens.vars.color.focusRing}30`
			},
			"&:disabled": {
				opacity: "0.5",
				cursor: "not-allowed",
				backgroundColor: _hydrotik_tokens.vars.color.surface
			},
			"&[aria-invalid=\"true\"]": {
				borderColor: _hydrotik_tokens.vars.color.destructive,
				boxShadow: `0 0 0 2px ${_hydrotik_tokens.vars.color.destructive}30`
			}
		}
	},
	variants: { size: {
		sm: {
			height: _hydrotik_tokens.vars.space["8"],
			paddingLeft: _hydrotik_tokens.vars.space["3"],
			paddingRight: _hydrotik_tokens.vars.space["3"],
			fontSize: _hydrotik_tokens.vars.font.size.xs
		},
		md: {
			height: _hydrotik_tokens.vars.space["10"],
			paddingLeft: _hydrotik_tokens.vars.space["3"],
			paddingRight: _hydrotik_tokens.vars.space["3"],
			fontSize: _hydrotik_tokens.vars.font.size.sm
		},
		lg: {
			height: _hydrotik_tokens.vars.space["12"],
			paddingLeft: _hydrotik_tokens.vars.space["4"],
			paddingRight: _hydrotik_tokens.vars.space["4"],
			fontSize: _hydrotik_tokens.vars.font.size.md
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
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["3"]}`,
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
const menubarItem = (0, _vanilla_extract_css.style)({
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
		"&[data-highlighted]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&[data-disabled]": {
			color: _hydrotik_tokens.vars.color.textDisabled,
			pointerEvents: "none"
		}
	}
});
const menubarSeparator = (0, _vanilla_extract_css.style)({
	height: "1px",
	margin: `${_hydrotik_tokens.vars.space["1"]} ${_hydrotik_tokens.vars.space["0_5"]}`,
	backgroundColor: _hydrotik_tokens.vars.color.borderSubtle
});
const menubarLabel = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space["1_5"]} ${_hydrotik_tokens.vars.space["2"]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.textMuted
});
const menubarShortcut = (0, _vanilla_extract_css.style)({
	marginLeft: "auto",
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide,
	color: _hydrotik_tokens.vars.color.textMuted
});
const menubarSubTrigger = (0, _vanilla_extract_css.style)([menubarItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover } } }]);
const menubarSubContent = (0, _vanilla_extract_css.style)([menubarContent, {}]);
const menubarCheckboxItem = (0, _vanilla_extract_css.style)([menubarItem, {}]);
const menubarRadioItem = (0, _vanilla_extract_css.style)([menubarItem, {}]);
const menubarItemIndicator = (0, _vanilla_extract_css.style)({
	position: "absolute",
	left: _hydrotik_tokens.vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "14px",
	height: "14px"
});

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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "10",
			height: "10",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3354 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.5553 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
				fill: "currentColor",
				fillRule: "evenodd",
				clipRule: "evenodd"
			})
		}) })
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_menubar.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "8",
			height: "8",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
				cx: "7.5",
				cy: "7.5",
				r: "4.5",
				fill: "currentColor"
			})
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
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		style: { marginLeft: "auto" },
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
			fill: "currentColor"
		})
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
	padding: `${_hydrotik_tokens.vars.space["2"]} ${_hydrotik_tokens.vars.space["3"]}`,
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
	children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 15 15",
		fill: "none",
		"aria-hidden": true,
		style: {
			transition: "transform 200ms",
			transform: "var(--radix-navigation-menu-trigger-open, rotate(0deg))"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
			fill: "currentColor"
		})
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
		minWidth: _hydrotik_tokens.vars.space["10"],
		height: _hydrotik_tokens.vars.space["10"],
		paddingLeft: _hydrotik_tokens.vars.space["3"],
		paddingRight: _hydrotik_tokens.vars.space["3"],
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
	width: _hydrotik_tokens.vars.space["10"],
	height: _hydrotik_tokens.vars.space["10"],
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
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z",
			fill: "currentColor"
		})
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Previous" })]
});
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to next page",
	className,
	...props,
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Next" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
			fill: "currentColor"
		})
	})]
});
PaginationNext.displayName = "PaginationNext";
const PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
	"aria-hidden": true,
	className: [paginationEllipsis, className].filter(Boolean).join(" "),
	...props,
	children: "···"
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
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
	padding: _hydrotik_tokens.vars.space[4],
	zIndex: _hydrotik_tokens.vars.zIndex.dropdown,
	maxWidth: "320px",
	width: "var(--radix-popover-trigger-width, auto)",
	animationName: fadeIn$1,
	animationDuration: _hydrotik_tokens.vars.motion.duration.normal,
	animationTimingFunction: _hydrotik_tokens.vars.motion.easing.default,
	outline: "none"
});
const popoverArrow = (0, _vanilla_extract_css.style)({
	fill: _hydrotik_tokens.vars.color.surface,
	filter: `drop-shadow(0 1px 0 ${_hydrotik_tokens.vars.color.border})`
});
const popoverClose = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: _hydrotik_tokens.vars.space[2],
	right: _hydrotik_tokens.vars.space[2],
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
			outline: `2px solid ${_hydrotik_tokens.vars.color.primary}`,
			outlineOffset: "1px"
		}
	}
});

//#endregion
//#region src/components/Popover/Popover.tsx
const Popover = _radix_ui_react_popover.Root;
const PopoverTrigger = _radix_ui_react_popover.Trigger;
const PopoverAnchor = _radix_ui_react_popover.Anchor;
const PopoverContent = react.default.forwardRef(({ className, align = "center", sideOffset = 6, showArrow = false, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_popover.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_popover.Content, {
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
	children: children ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 15 15",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
			fill: "currentColor"
		})
	})
}));
PopoverClose.displayName = "PopoverClose";

//#endregion
//#region src/components/Progress/Progress.css.ts
const progressRoot = (0, _vanilla_extract_css.style)({
	position: "relative",
	width: "100%",
	height: "8px",
	overflow: "hidden",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.secondary
});
const progressIndicator = (0, _vanilla_extract_css.style)({
	height: "100%",
	width: "100%",
	backgroundColor: _hydrotik_tokens.vars.color.primary,
	borderRadius: "inherit",
	transition: `transform ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
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
const radioGroupRoot = (0, _vanilla_extract_css.style)({
	display: "grid",
	gap: _hydrotik_tokens.vars.space["2"]
});
const radioGroupItem = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "16px",
	height: "16px",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	cursor: "pointer",
	flexShrink: 0,
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { borderColor: _hydrotik_tokens.vars.color.primary },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
		},
		"&[data-state=\"checked\"]": { borderColor: _hydrotik_tokens.vars.color.primary },
		"&:disabled": {
			opacity: "0.45",
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
const selectTrigger = (0, _vanilla_extract_recipes.recipe)({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: _hydrotik_tokens.vars.space[2],
		width: "100%",
		borderRadius: _hydrotik_tokens.vars.radii.md,
		border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
		backgroundColor: _hydrotik_tokens.vars.color.surface,
		color: _hydrotik_tokens.vars.color.text,
		fontFamily: _hydrotik_tokens.vars.font.family.sans,
		fontSize: _hydrotik_tokens.vars.font.size.sm,
		lineHeight: _hydrotik_tokens.vars.font.lineHeight.normal,
		cursor: "default",
		outline: "none",
		transition: `border-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
		selectors: {
			"&:hover": { borderColor: _hydrotik_tokens.vars.color.primary },
			"&:focus": {
				borderColor: _hydrotik_tokens.vars.color.primary,
				boxShadow: `0 0 0 3px ${_hydrotik_tokens.vars.color.ghostHover}`
			},
			"&[data-placeholder]": { color: _hydrotik_tokens.vars.color.textMuted },
			"&[data-disabled]": {
				opacity: .5,
				cursor: "not-allowed",
				pointerEvents: "none"
			}
		}
	},
	variants: {
		size: {
			sm: {
				height: "32px",
				padding: `0 ${_hydrotik_tokens.vars.space[2]}`,
				fontSize: _hydrotik_tokens.vars.font.size.xs
			},
			md: {
				height: "40px",
				padding: `0 ${_hydrotik_tokens.vars.space[3]}`
			},
			lg: {
				height: "48px",
				padding: `0 ${_hydrotik_tokens.vars.space[4]}`,
				fontSize: _hydrotik_tokens.vars.font.size.md
			}
		},
		isError: { true: {
			borderColor: _hydrotik_tokens.vars.color.destructive,
			selectors: { "&:focus": {
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
	backgroundColor: _hydrotik_tokens.vars.color.surface,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	boxShadow: _hydrotik_tokens.vars.shadow.lg,
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
const selectViewport = (0, _vanilla_extract_css.style)({ padding: _hydrotik_tokens.vars.space[1] });
const selectItem = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	gap: _hydrotik_tokens.vars.space[2],
	padding: `${_hydrotik_tokens.vars.space[2]} ${_hydrotik_tokens.vars.space[3]}`,
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.text,
	cursor: "default",
	userSelect: "none",
	position: "relative",
	outline: "none",
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": {
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
			color: _hydrotik_tokens.vars.color.primary
		},
		"&[data-disabled]": {
			opacity: .5,
			pointerEvents: "none"
		},
		"&[data-state=\"checked\"]": { fontWeight: _hydrotik_tokens.vars.font.weight.medium }
	}
});
const selectItemIndicator = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: _hydrotik_tokens.vars.space[4],
	flexShrink: 0,
	color: _hydrotik_tokens.vars.color.primary
});
const selectLabel = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space[1]} ${_hydrotik_tokens.vars.space[3]}`,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.textMuted,
	textTransform: "uppercase",
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide
});
const selectSeparator = (0, _vanilla_extract_css.style)({
	height: "1px",
	backgroundColor: _hydrotik_tokens.vars.color.border,
	margin: `${_hydrotik_tokens.vars.space[1]} 0`
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
	flexShrink: 0
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M2.5 4.5L6 8L9.5 4.5",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	})]
}));
SelectTrigger.displayName = "SelectTrigger";
const SelectScrollUpButton = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ScrollUpButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.5 7.5L6 4L9.5 7.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	})
}));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
const SelectScrollDownButton = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ScrollDownButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.5 4.5L6 8L9.5 4.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	})
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
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItemIndicator, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ItemText, { children })]
}));
SelectItem.displayName = "SelectItem";
const SelectItemIndicator = () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ItemIndicator, {
	className: selectItemIndicator,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2 6L5 9L10 3",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	})
});
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
const sheetOverlay = (0, _vanilla_extract_css.style)({
	backgroundColor: _hydrotik_tokens.vars.color.overlay,
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
		backgroundColor: _hydrotik_tokens.vars.color.surfaceOverlay,
		boxShadow: _hydrotik_tokens.vars.shadow.xl,
		display: "flex",
		flexDirection: "column",
		outline: "none"
	},
	variants: { side: {
		right: {
			top: 0,
			right: 0,
			height: "100%",
			width: "400px",
			maxWidth: "100vw",
			borderLeft: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromRight$1} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
		},
		left: {
			top: 0,
			left: 0,
			height: "100%",
			width: "400px",
			maxWidth: "100vw",
			borderRight: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromLeft} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
		},
		top: {
			top: 0,
			left: 0,
			right: 0,
			height: "auto",
			maxHeight: "80vh",
			borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromTop} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
		},
		bottom: {
			bottom: 0,
			left: 0,
			right: 0,
			height: "auto",
			maxHeight: "80vh",
			borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
			animation: `${slideInFromBottom} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`
		}
	} },
	defaultVariants: { side: "right" }
});
const sheetHeader = (0, _vanilla_extract_css.style)({
	display: "flex",
	flexDirection: "column",
	gap: _hydrotik_tokens.vars.space["2"],
	padding: _hydrotik_tokens.vars.space["6"],
	paddingBottom: 0
});
const sheetFooter = (0, _vanilla_extract_css.style)({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: _hydrotik_tokens.vars.space["3"],
	padding: _hydrotik_tokens.vars.space["6"],
	paddingTop: 0
});
const sheetBody = (0, _vanilla_extract_css.style)({
	flex: 1,
	overflow: "auto",
	padding: _hydrotik_tokens.vars.space["6"]
});
const sheetTitle = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.lg,
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.text,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.tight
});
const sheetDescription = (0, _vanilla_extract_css.style)({
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed
});
const sheetClose = (0, _vanilla_extract_css.style)({
	position: "absolute",
	top: _hydrotik_tokens.vars.space["4"],
	right: _hydrotik_tokens.vars.space["4"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: _hydrotik_tokens.vars.space["8"],
	height: _hydrotik_tokens.vars.space["8"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": {
			color: _hydrotik_tokens.vars.color.text,
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover
		},
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
const SheetContent = react.default.forwardRef(({ side = "right", showClose = true, className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Content, {
	ref,
	className: [sheetContent({ side }), className].filter(Boolean).join(" "),
	...props,
	children: [children, showClose && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Close, {
		className: sheetClose,
		"aria-label": "Close",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
				fill: "currentColor"
			})
		})
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
const sliderRoot = (0, _vanilla_extract_css.style)({
	position: "relative",
	display: "flex",
	width: "100%",
	touchAction: "none",
	userSelect: "none",
	alignItems: "center",
	cursor: "pointer",
	selectors: { "&[data-disabled]": {
		opacity: "0.45",
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
	backgroundColor: _hydrotik_tokens.vars.color.primary,
	borderRadius: "inherit"
});
const sliderThumb = (0, _vanilla_extract_css.style)({
	display: "block",
	width: "16px",
	height: "16px",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.primaryForeground,
	border: `2px solid ${_hydrotik_tokens.vars.color.primary}`,
	boxShadow: _hydrotik_tokens.vars.shadow.sm,
	transition: `box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": { boxShadow: `0 0 0 4px rgba(59, 130, 246, 0.2)` },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
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
const switchRoot = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	width: "36px",
	height: "20px",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.secondary,
	border: "none",
	padding: "2px",
	cursor: "pointer",
	flexShrink: 0,
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"checked\"]": { backgroundColor: _hydrotik_tokens.vars.color.primary },
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
		},
		"&:disabled": {
			opacity: "0.45",
			cursor: "not-allowed"
		}
	}
});
const switchThumb = (0, _vanilla_extract_css.style)({
	display: "block",
	width: "16px",
	height: "16px",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	backgroundColor: _hydrotik_tokens.vars.color.primaryForeground,
	boxShadow: _hydrotik_tokens.vars.shadow.sm,
	transition: `transform ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: { "&[data-state=\"checked\"]": { transform: "translateX(16px)" } }
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
const tableWrapper = (0, _vanilla_extract_css.style)({
	position: "relative",
	width: "100%",
	overflowX: "auto",
	borderRadius: _hydrotik_tokens.vars.radii.md,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`
});
const table = (0, _vanilla_extract_css.style)({
	width: "100%",
	borderCollapse: "collapse",
	captionSide: "bottom",
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.text
});
const tableCaption = (0, _vanilla_extract_css.style)({
	marginTop: _hydrotik_tokens.vars.space[3],
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	color: _hydrotik_tokens.vars.color.textMuted,
	textAlign: "center"
});
const tableHeader = (0, _vanilla_extract_css.style)({ borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}` });
const tableBody = (0, _vanilla_extract_css.style)({});
(0, _vanilla_extract_css.globalStyle)(`${tableBody} tr:last-child`, { borderBottom: "none" });
const tableFooter = (0, _vanilla_extract_css.style)({
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.surface} 50%, transparent)`,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium
});
(0, _vanilla_extract_css.globalStyle)(`${tableFooter} tr:last-child`, { borderBottom: "none" });
const tableRow = (0, _vanilla_extract_css.style)({
	borderBottom: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	transition: `background-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"selected\"]": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover },
		"&:hover": { backgroundColor: _hydrotik_tokens.vars.color.ghostHover }
	}
});
const tableHead = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space[3]} ${_hydrotik_tokens.vars.space[4]}`,
	textAlign: "left",
	verticalAlign: "middle",
	fontWeight: _hydrotik_tokens.vars.font.weight.semibold,
	color: _hydrotik_tokens.vars.color.textMuted,
	fontSize: _hydrotik_tokens.vars.font.size.xs,
	textTransform: "uppercase",
	letterSpacing: _hydrotik_tokens.vars.font.letterSpacing.wide,
	whiteSpace: "nowrap",
	selectors: {
		"&:has([role=checkbox])": { paddingRight: 0 },
		"&[data-align=\"right\"]": { textAlign: "right" },
		"&[data-align=\"center\"]": { textAlign: "center" }
	}
});
const tableCell = (0, _vanilla_extract_css.style)({
	padding: `${_hydrotik_tokens.vars.space[3]} ${_hydrotik_tokens.vars.space[4]}`,
	verticalAlign: "middle",
	selectors: {
		"&:has([role=checkbox])": { paddingRight: 0 },
		"&[data-align=\"right\"]": { textAlign: "right" },
		"&[data-align=\"center\"]": { textAlign: "center" }
	}
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
	className: [table, className].filter(Boolean).join(" "),
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
const tabsList = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	backgroundColor: _hydrotik_tokens.vars.color.secondary,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	padding: _hydrotik_tokens.vars.space["1"],
	gap: _hydrotik_tokens.vars.space["0_5"]
});
const tabsTrigger = (0, _vanilla_extract_css.style)({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	paddingTop: _hydrotik_tokens.vars.space["1_5"],
	paddingBottom: _hydrotik_tokens.vars.space["1_5"],
	paddingLeft: _hydrotik_tokens.vars.space["4"],
	paddingRight: _hydrotik_tokens.vars.space["4"],
	borderRadius: _hydrotik_tokens.vars.radii.sm,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	color: _hydrotik_tokens.vars.color.textMuted,
	cursor: "pointer",
	border: "none",
	backgroundColor: "transparent",
	transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&:hover": {
			color: _hydrotik_tokens.vars.color.text,
			backgroundColor: _hydrotik_tokens.vars.color.ghostHover
		},
		"&[data-state=\"active\"]": {
			color: _hydrotik_tokens.vars.color.text,
			backgroundColor: _hydrotik_tokens.vars.color.surfaceElevated,
			boxShadow: _hydrotik_tokens.vars.shadow.sm
		},
		"&:focus-visible": {
			outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
			outlineOffset: "2px"
		},
		"&:disabled": {
			opacity: "0.4",
			cursor: "not-allowed"
		}
	}
});
const tabsContent = (0, _vanilla_extract_css.style)({
	marginTop: _hydrotik_tokens.vars.space["4"],
	selectors: { "&:focus-visible": {
		outline: `2px solid ${_hydrotik_tokens.vars.color.focusRing}`,
		outlineOffset: "2px",
		borderRadius: _hydrotik_tokens.vars.radii.sm
	} }
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
const textarea = (0, _vanilla_extract_css.style)({
	width: "100%",
	minHeight: "100px",
	padding: `${_hydrotik_tokens.vars.space["3"]} ${_hydrotik_tokens.vars.space["3"]}`,
	backgroundColor: _hydrotik_tokens.vars.color.input,
	color: _hydrotik_tokens.vars.color.text,
	border: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	borderRadius: _hydrotik_tokens.vars.radii.md,
	fontFamily: _hydrotik_tokens.vars.font.family.sans,
	fontSize: _hydrotik_tokens.vars.font.size.sm,
	lineHeight: _hydrotik_tokens.vars.font.lineHeight.relaxed,
	resize: "vertical",
	transition: `border-color ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}, box-shadow ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
	selectors: {
		"&::placeholder": { color: _hydrotik_tokens.vars.color.placeholder },
		"&:hover:not(:disabled)": { borderColor: _hydrotik_tokens.vars.color.textMuted },
		"&:focus-visible": {
			outline: "none",
			borderColor: _hydrotik_tokens.vars.color.focusRing,
			boxShadow: `0 0 0 2px ${_hydrotik_tokens.vars.color.focusRing}30`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		},
		"&[aria-invalid=\"true\"]": {
			borderColor: _hydrotik_tokens.vars.color.destructive,
			boxShadow: `0 0 0 2px ${_hydrotik_tokens.vars.color.destructive}30`
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
	padding: _hydrotik_tokens.vars.space[6],
	maxWidth: "420px",
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
		gap: `${_hydrotik_tokens.vars.space[2]} ${_hydrotik_tokens.vars.space[3]}`,
		padding: _hydrotik_tokens.vars.space[4],
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
const toastIcon = (0, _vanilla_extract_css.style)({
	gridRow: "1 / -1",
	marginTop: "1px"
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
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 15 15",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
			fill: "currentColor"
		})
	})
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
		transition: `all ${_hydrotik_tokens.vars.motion.duration.fast} ${_hydrotik_tokens.vars.motion.easing.default}`,
		selectors: {
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
				outlineOffset: "2px"
			},
			"&:disabled": {
				opacity: "0.45",
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
				selectors: { "&[data-state=\"on\"]": {
					backgroundColor: _hydrotik_tokens.vars.color.ghostHover,
					borderColor: _hydrotik_tokens.vars.color.primary
				} }
			}
		},
		size: {
			sm: {
				height: _hydrotik_tokens.vars.space["8"],
				paddingLeft: _hydrotik_tokens.vars.space["2"],
				paddingRight: _hydrotik_tokens.vars.space["2"]
			},
			md: {
				height: _hydrotik_tokens.vars.space["10"],
				paddingLeft: _hydrotik_tokens.vars.space["3"],
				paddingRight: _hydrotik_tokens.vars.space["3"]
			},
			lg: {
				height: _hydrotik_tokens.vars.space["12"],
				paddingLeft: _hydrotik_tokens.vars.space["4"],
				paddingRight: _hydrotik_tokens.vars.space["4"]
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
	height: _hydrotik_tokens.vars.space["10"],
	paddingLeft: _hydrotik_tokens.vars.space["3"],
	paddingRight: _hydrotik_tokens.vars.space["3"],
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
			opacity: "0.45",
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
exports.AlertIcon = AlertIcon;
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
exports.SelectItemIndicator = SelectItemIndicator;
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
//# sourceMappingURL=index.cjs.map