import React, { forwardRef, useId } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as Icons from "lucide-react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, MoreHorizontal, Search, X } from "lucide-react";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "@hydrotik/tokens";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { recipe } from "@vanilla-extract/recipes";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Slot } from "@radix-ui/react-slot";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ToastPrimitive from "@radix-ui/react-toast";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

//#region src/components/Accordion/Accordion.css.ts
const slideDown = keyframes({
	from: { height: "0" },
	to: { height: "var(--radix-accordion-content-height)" }
});
const slideUp = keyframes({
	from: { height: "var(--radix-accordion-content-height)" },
	to: { height: "0" }
});
/**
* Accordion — shadcn v4 aligned.
* No wrapping border container — items separated by bottom border.
*/
const accordionRoot = style({});
const accordionItem = style({
	borderBottom: `1px solid ${vars.color.border}`,
	selectors: { "&:last-child": { borderBottom: "none" } }
});
const accordionTrigger = style({
	display: "flex",
	flex: 1,
	alignItems: "flex-start",
	justifyContent: "space-between",
	gap: vars.space["4"],
	width: "100%",
	padding: `${vars.space["4"]} 0`,
	fontFamily: vars.font.family.sans,
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	color: vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	borderRadius: vars.radii.md,
	cursor: "pointer",
	textAlign: "left",
	outline: "none",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": { textDecoration: "underline" },
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "2px",
			boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
			pointerEvents: "none"
		}
	}
});
const accordionChevron = style({
	transition: `transform ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
	flexShrink: 0,
	color: vars.color.textMuted,
	marginTop: "2px",
	width: "16px",
	height: "16px",
	pointerEvents: "none"
});
globalStyle(`${accordionTrigger}[data-state="open"] ${accordionChevron}`, { transform: "rotate(180deg)" });
const accordionContent = style({
	overflow: "hidden",
	fontSize: vars.font.size.sm,
	selectors: {
		"&[data-state=\"open\"]": { animation: `${slideDown} ${vars.motion.duration.normal} ${vars.motion.easing.default}` },
		"&[data-state=\"closed\"]": { animation: `${slideUp} ${vars.motion.duration.normal} ${vars.motion.easing.default}` }
	}
});
const accordionContentInner = style({
	paddingTop: 0,
	paddingBottom: vars.space["4"]
});

//#endregion
//#region src/components/Accordion/Accordion.tsx
const Accordion = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Root, {
	ref,
	className: [accordionRoot, className].filter(Boolean).join(" "),
	...props
}));
Accordion.displayName = "Accordion";
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: [accordionItem, className].filter(Boolean).join(" "),
	...props
}));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	style: { display: "flex" },
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: [accordionTrigger, className].filter(Boolean).join(" "),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, {
			className: accordionChevron,
			"aria-hidden": true
		})]
	})
}));
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: [accordionContent, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx("div", {
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
const alertRecipe = recipe({
	base: {
		position: "relative",
		width: "100%",
		borderRadius: vars.radii.lg,
		border: `1px solid ${vars.color.border}`,
		padding: `${vars.space["3"]} ${vars.space["4"]}`,
		fontSize: vars.font.size.sm,
		lineHeight: vars.font.lineHeight.normal,
		display: "grid",
		gridTemplateColumns: "0 1fr",
		gap: `${vars.space["0_5"]} 0`,
		alignItems: "start"
	},
	variants: { variant: {
		default: {
			backgroundColor: vars.color.surface,
			color: vars.color.text
		},
		destructive: {
			backgroundColor: vars.color.surface,
			color: vars.color.destructive
		}
	} },
	defaultVariants: { variant: "default" }
});
/**
* When the alert has a direct SVG child (icon), expand the grid to fit it.
* We use a CSS class that the Alert component applies conditionally when
* an icon prop is provided.
*/
const alertWithIcon = style({
	gridTemplateColumns: `${vars.space["4"]} 1fr`,
	columnGap: vars.space["3"]
});
const alertIcon = style({
	gridColumn: "1",
	gridRow: "1 / -1",
	width: vars.space["4"],
	height: vars.space["4"],
	marginTop: "2px",
	flexShrink: 0,
	color: "currentColor"
});
const alertTitle = style({
	gridColumn: "2",
	fontWeight: vars.font.weight.medium,
	lineHeight: vars.font.lineHeight.tight,
	letterSpacing: vars.font.letterSpacing.tight,
	minHeight: vars.space["4"]
});
const alertDescription = style({
	gridColumn: "2",
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	lineHeight: vars.font.lineHeight.relaxed,
	selectors: { [`${alertRecipe.classNames.variants.variant.destructive} &`]: { color: `color-mix(in srgb, ${vars.color.destructive} 90%, transparent)` } }
});

//#endregion
//#region src/components/Alert/Alert.tsx
const Alert = React.forwardRef(({ variant = "default", icon, className, children, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		role: "alert",
		className: [
			alertRecipe({ variant }),
			icon ? alertWithIcon : "",
			className
		].filter(Boolean).join(" "),
		...props,
		children: [icon && /* @__PURE__ */ jsx("div", {
			className: alertIcon,
			children: icon
		}), children]
	});
});
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h5", {
	ref,
	className: [alertTitle, className].filter(Boolean).join(" "),
	...props
}));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
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
const overlayShow$1 = keyframes({
	from: { opacity: "0" },
	to: { opacity: "1" }
});
const contentShow = keyframes({
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
const baseOverlay = style({
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	position: "fixed",
	inset: 0,
	zIndex: vars.zIndex.overlay,
	animation: `${overlayShow$1} ${vars.motion.duration.normal} ${vars.motion.easing.default}`
});
/** Standard centered modal content container */
const baseModalContent = style({
	backgroundColor: vars.color.background,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.lg,
	boxShadow: vars.shadow.lg,
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90vw",
	maxWidth: "32rem",
	maxHeight: "85vh",
	padding: vars.space["6"],
	zIndex: vars.zIndex.modal,
	display: "grid",
	gap: vars.space["4"],
	animation: `${contentShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
	outline: "none"
});
/** Shared modal header layout */
const baseModalHeader = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.space["2"]
});
/** Shared responsive modal footer */
const baseModalFooter = style({
	display: "flex",
	flexDirection: "column-reverse",
	gap: vars.space["2"],
	"@media": { "screen and (min-width: 640px)": {
		flexDirection: "row",
		justifyContent: "flex-end"
	} }
});
/** Shared modal title */
const baseModalTitle = style({
	fontSize: vars.font.size.lg,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.text,
	lineHeight: vars.font.lineHeight.tight
});
/** Shared modal description */
const baseModalDescription = style({
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	lineHeight: vars.font.lineHeight.relaxed
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
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogAction = AlertDialogPrimitive.Action;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, {
	ref,
	className: [alertDialogOverlay, className].filter(Boolean).join(" "),
	...props
}));
AlertDialogOverlay.displayName = "AlertDialogOverlay";
const AlertDialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, {
	ref,
	className: [alertDialogContent, className].filter(Boolean).join(" "),
	...props,
	children
})] }));
AlertDialogContent.displayName = "AlertDialogContent";
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [alertDialogHeader, className].filter(Boolean).join(" "),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [alertDialogFooter, className].filter(Boolean).join(" "),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, {
	ref,
	className: [alertDialogTitle, className].filter(Boolean).join(" "),
	...props
}));
AlertDialogTitle.displayName = "AlertDialogTitle";
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, {
	ref,
	className: [alertDialogDescription, className].filter(Boolean).join(" "),
	...props
}));
AlertDialogDescription.displayName = "AlertDialogDescription";

//#endregion
//#region src/components/AspectRatio/AspectRatio.tsx
const AspectRatio = AspectRatioPrimitive.Root;
AspectRatio.displayName = "AspectRatio";

//#endregion
//#region src/components/Avatar/Avatar.css.ts
const avatarRoot = recipe({
	base: {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		overflow: "hidden",
		borderRadius: vars.radii.full,
		backgroundColor: vars.color.secondary,
		flexShrink: 0
	},
	variants: { size: {
		sm: {
			width: vars.space["6"],
			height: vars.space["6"]
		},
		md: {
			width: vars.space["8"],
			height: vars.space["8"]
		},
		lg: {
			width: vars.space["10"],
			height: vars.space["10"]
		},
		xl: {
			width: vars.space["14"],
			height: vars.space["14"]
		}
	} },
	defaultVariants: { size: "md" }
});
const avatarImage = style({
	width: "100%",
	height: "100%",
	objectFit: "cover",
	borderRadius: "inherit"
});
const avatarFallback = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	backgroundColor: vars.color.secondary,
	color: vars.color.secondaryForeground,
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	lineHeight: "1"
});

//#endregion
//#region src/components/Avatar/Avatar.tsx
const Avatar = React.forwardRef(({ size = "md", className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Root, {
	ref,
	className: [avatarRoot({ size }), className].filter(Boolean).join(" "),
	...props
}));
Avatar.displayName = "Avatar";
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Image, {
	ref,
	className: [avatarImage, className].filter(Boolean).join(" "),
	...props
}));
AvatarImage.displayName = "AvatarImage";
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, {
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
const badgeRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: vars.radii.full,
		border: "1px solid transparent",
		fontWeight: vars.font.weight.medium,
		fontFamily: vars.font.family.sans,
		fontSize: vars.font.size.xs,
		whiteSpace: "nowrap",
		lineHeight: "1",
		padding: `${vars.space["0_5"]} ${vars.space["2_5"]}`,
		gap: vars.space["1"],
		width: "fit-content",
		flexShrink: 0,
		overflow: "hidden",
		transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`
	},
	variants: { variant: {
		default: {
			backgroundColor: vars.color.primary,
			color: vars.color.primaryForeground
		},
		secondary: {
			backgroundColor: vars.color.secondary,
			color: vars.color.secondaryForeground
		},
		destructive: {
			backgroundColor: vars.color.destructive,
			color: vars.color.destructiveForeground
		},
		outline: {
			backgroundColor: "transparent",
			color: vars.color.text,
			borderColor: vars.color.border
		},
		success: {
			backgroundColor: vars.color.success,
			color: vars.color.successForeground
		},
		warning: {
			backgroundColor: vars.color.warning,
			color: vars.color.warningForeground
		}
	} },
	defaultVariants: { variant: "default" }
});

//#endregion
//#region src/components/Badge/Badge.tsx
const Badge = React.forwardRef(({ variant = "default", className, ...props }, ref) => /* @__PURE__ */ jsx("span", {
	ref,
	className: [badgeRecipe({ variant }), className].filter(Boolean).join(" "),
	...props
}));
Badge.displayName = "Badge";

//#endregion
//#region src/components/Breadcrumb/Breadcrumb.css.ts
const breadcrumbNav = style({
	display: "flex",
	alignItems: "center"
});
const breadcrumbList = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["1_5"],
	flexWrap: "wrap",
	listStyle: "none",
	margin: 0,
	padding: 0,
	fontSize: vars.font.size.sm
});
const breadcrumbItem = style({
	display: "inline-flex",
	alignItems: "center",
	gap: vars.space["1_5"]
});
const breadcrumbLink = style({
	color: vars.color.textMuted,
	textDecoration: "none",
	transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": { color: vars.color.text },
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "2px",
			borderRadius: vars.radii.sm
		}
	}
});
const breadcrumbPage = style({
	color: vars.color.text,
	fontWeight: vars.font.weight.medium
});
const breadcrumbSeparator = style({
	display: "inline-flex",
	alignItems: "center",
	color: vars.color.textMuted
});
const breadcrumbEllipsis = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: vars.space["8"],
	height: vars.space["8"],
	color: vars.color.textMuted
});

//#endregion
//#region src/components/Breadcrumb/Breadcrumb.tsx
const Breadcrumb = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("nav", {
	ref,
	"aria-label": "breadcrumb",
	className: [breadcrumbNav, className].filter(Boolean).join(" "),
	...props
}));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ol", {
	ref,
	className: [breadcrumbList, className].filter(Boolean).join(" "),
	...props
}));
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	className: [breadcrumbItem, className].filter(Boolean).join(" "),
	...props
}));
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "a", {
		ref,
		className: [breadcrumbLink, className].filter(Boolean).join(" "),
		...props
	});
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("span", {
	ref,
	role: "link",
	"aria-disabled": "true",
	"aria-current": "page",
	className: [breadcrumbPage, className].filter(Boolean).join(" "),
	...props
}));
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({ className, children, ...props }) => /* @__PURE__ */ jsx("li", {
	role: "presentation",
	"aria-hidden": "true",
	className: [breadcrumbSeparator, className].filter(Boolean).join(" "),
	...props,
	children: children ?? /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const BreadcrumbEllipsis = ({ className, ...props }) => /* @__PURE__ */ jsxs("span", {
	role: "presentation",
	"aria-hidden": "true",
	className: [breadcrumbEllipsis, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ jsx(MoreHorizontal, { size: 16 }), /* @__PURE__ */ jsx("span", {
		className: "sr-only",
		children: "More"
	})]
});
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

//#endregion
//#region src/components/Button/Button.css.ts
const spin$1 = keyframes({ to: { transform: "rotate(360deg)" } });
const spinner = style({
	display: "inline-block",
	width: "1em",
	height: "1em",
	border: `2px solid currentColor`,
	borderTopColor: "transparent",
	borderRadius: vars.radii.full,
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
const buttonRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: vars.space["2"],
		fontFamily: vars.font.family.sans,
		fontWeight: vars.font.weight.medium,
		letterSpacing: vars.font.letterSpacing.normal,
		fontSize: vars.font.size.sm,
		borderRadius: vars.radii.md,
		border: "1px solid transparent",
		cursor: "pointer",
		textDecoration: "none",
		whiteSpace: "nowrap",
		flexShrink: 0,
		outline: "none",
		transition: [
			`background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`
		].join(", "),
		selectors: {
			"&:focus-visible": {
				borderColor: vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
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
				backgroundColor: vars.color.primary,
				color: vars.color.primaryForeground,
				borderColor: vars.color.primary,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(0.9)" } }
			},
			destructive: {
				backgroundColor: vars.color.destructive,
				color: vars.color.destructiveForeground,
				borderColor: vars.color.destructive,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(0.9)" } }
			},
			outline: {
				backgroundColor: "transparent",
				color: vars.color.text,
				borderColor: vars.color.border,
				boxShadow: vars.shadow.xs,
				selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.color.ghostHover } }
			},
			secondary: {
				backgroundColor: vars.color.secondary,
				color: vars.color.secondaryForeground,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(0.8)" } }
			},
			ghost: {
				backgroundColor: "transparent",
				color: vars.color.text,
				borderColor: "transparent",
				selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.color.ghostHover } }
			},
			link: {
				backgroundColor: "transparent",
				color: vars.color.primary,
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
				height: vars.space["7"],
				paddingLeft: vars.space["3"],
				paddingRight: vars.space["3"],
				fontSize: vars.font.size.xs,
				gap: vars.space["1_5"]
			},
			md: {
				height: vars.space["8"],
				paddingLeft: vars.space["3"],
				paddingRight: vars.space["3"],
				fontSize: vars.font.size.sm
			},
			lg: {
				height: vars.space["10"],
				paddingLeft: vars.space["5"],
				paddingRight: vars.space["5"],
				fontSize: vars.font.size.sm
			},
			icon: {
				width: vars.space["8"],
				height: vars.space["8"],
				padding: 0
			},
			"icon-sm": {
				width: vars.space["7"],
				height: vars.space["7"],
				padding: 0
			},
			"icon-lg": {
				width: vars.space["10"],
				height: vars.space["10"],
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
const Button = forwardRef(({ variant = "default", size = "md", loading = false, fullWidth = false, asChild = false, className, children, disabled, ...props }, ref) => {
	return /* @__PURE__ */ jsxs(asChild ? Slot : "button", {
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
		children: [loading && /* @__PURE__ */ jsx("span", {
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
const cardRoot = style({
	display: "flex",
	flexDirection: "column",
	backgroundColor: vars.color.surface,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.lg,
	boxShadow: vars.shadow.sm,
	overflow: "hidden"
});
const cardHeader = style({
	display: "grid",
	gridAutoRows: "min-content",
	alignItems: "start",
	gap: vars.space["1_5"],
	padding: vars.space["6"]
});
const cardTitle = style({
	fontSize: vars.font.size.lg,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.text,
	lineHeight: vars.font.lineHeight.tight
});
const cardDescription = style({
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	lineHeight: vars.font.lineHeight.normal
});
const cardContent = style({ padding: `0 ${vars.space["6"]} ${vars.space["6"]}` });
const cardFooter = style({
	display: "flex",
	alignItems: "center",
	padding: `0 ${vars.space["6"]} ${vars.space["6"]}`
});

//#endregion
//#region src/components/Card/Card.tsx
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [cardRoot, className].filter(Boolean).join(" "),
	...props
}));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [cardHeader, className].filter(Boolean).join(" "),
	...props
}));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", {
	ref,
	className: [cardTitle, className].filter(Boolean).join(" "),
	...props
}));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", {
	ref,
	className: [cardDescription, className].filter(Boolean).join(" "),
	...props
}));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [cardContent, className].filter(Boolean).join(" "),
	...props
}));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
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
const checkboxRoot = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "16px",
	height: "16px",
	borderRadius: "4px",
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.input,
	boxShadow: vars.shadow.xs,
	cursor: "pointer",
	flexShrink: 0,
	outline: "none",
	transition: `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:focus-visible": {
			borderColor: vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
		},
		"&[data-state=\"checked\"], &[data-state=\"indeterminate\"]": {
			backgroundColor: vars.color.primary,
			borderColor: vars.color.primary,
			color: vars.color.primaryForeground
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});
const checkboxIndicator = style({
	display: "grid",
	placeContent: "center",
	color: "currentColor"
});

//#endregion
//#region src/components/Checkbox/Checkbox.tsx
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
	ref,
	className: [checkboxRoot, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
		className: checkboxIndicator,
		children: /* @__PURE__ */ jsx(Check, { size: 14 })
	})
}));
Checkbox.displayName = "Checkbox";

//#endregion
//#region src/components/Collapsible/Collapsible.tsx
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
const CollapsibleContent = CollapsiblePrimitive.Content;

//#endregion
//#region src/components/Command/Command.css.ts
const commandRoot = style({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	overflow: "hidden",
	borderRadius: vars.radii.lg,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surfaceElevated
});
const commandInput = style({
	display: "flex",
	width: "100%",
	borderBottom: `1px solid ${vars.color.borderSubtle}`
});
const commandInputField = style({
	flex: 1,
	height: vars.space["9"],
	padding: `0 ${vars.space["3"]}`,
	fontSize: vars.font.size.sm,
	fontFamily: vars.font.family.sans,
	color: vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	outline: "none",
	selectors: { "&::placeholder": { color: vars.color.placeholder } }
});
const commandList = style({
	maxHeight: "300px",
	overflow: "auto",
	padding: vars.space["1"]
});
const commandEmpty = style({
	padding: `${vars.space["6"]} 0`,
	textAlign: "center",
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted
});
const commandGroup = style({
	overflow: "hidden",
	padding: vars.space["1"]
});
const commandGroupHeading = style({
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	fontSize: vars.font.size.xs,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.textMuted,
	letterSpacing: vars.font.letterSpacing.wide,
	textTransform: "uppercase"
});
const commandItem = style({
	position: "relative",
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"],
	borderRadius: vars.radii.sm,
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	fontSize: vars.font.size.sm,
	color: vars.color.text,
	cursor: "pointer",
	outline: "none",
	userSelect: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": { backgroundColor: vars.color.ghostHover },
		"&[aria-selected=\"true\"]": { backgroundColor: vars.color.ghostHover },
		"&[data-disabled=\"true\"]": {
			color: vars.color.textDisabled,
			pointerEvents: "none"
		}
	}
});
const commandSeparator = style({
	height: "1px",
	margin: `${vars.space["1"]} 0`,
	backgroundColor: vars.color.borderSubtle
});
const commandShortcut = style({
	marginLeft: "auto",
	fontSize: vars.font.size.xs,
	color: vars.color.textMuted,
	letterSpacing: vars.font.letterSpacing.wide
});
const commandInputIcon = style({
	display: "flex",
	alignItems: "center",
	paddingLeft: vars.space["3"],
	color: vars.color.textMuted,
	flexShrink: 0
});

//#endregion
//#region src/components/Command/Command.tsx
/**
* Command palette — a simple searchable list component.
* For a full cmdk-style experience, pair with the `cmdk` package.
* This provides the styled shell + primitives.
*/
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [commandRoot, className].filter(Boolean).join(" "),
	...props
}));
Command.displayName = "Command";
const CommandInput = React.forwardRef(({ className, icon, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	className: commandInput,
	children: [/* @__PURE__ */ jsx("div", {
		className: commandInputIcon,
		children: icon ?? /* @__PURE__ */ jsx(Search, { size: 15 })
	}), /* @__PURE__ */ jsx("input", {
		ref,
		className: [commandInputField, className].filter(Boolean).join(" "),
		type: "text",
		role: "combobox",
		...props
	})]
}));
CommandInput.displayName = "CommandInput";
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [commandList, className].filter(Boolean).join(" "),
	role: "listbox",
	...props
}));
CommandList.displayName = "CommandList";
const CommandEmpty = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [commandEmpty, className].filter(Boolean).join(" "),
	...props
}));
CommandEmpty.displayName = "CommandEmpty";
const CommandGroup = React.forwardRef(({ className, heading, children, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	ref,
	className: [commandGroup, className].filter(Boolean).join(" "),
	role: "group",
	...props,
	children: [heading && /* @__PURE__ */ jsx("div", {
		className: commandGroupHeading,
		children: heading
	}), children]
}));
CommandGroup.displayName = "CommandGroup";
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [commandItem, className].filter(Boolean).join(" "),
	role: "option",
	tabIndex: 0,
	...props
}));
CommandItem.displayName = "CommandItem";
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [commandSeparator, className].filter(Boolean).join(" "),
	role: "separator",
	...props
}));
CommandSeparator.displayName = "CommandSeparator";
const CommandShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
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
const baseMenuItem = style({
	position: "relative",
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"],
	borderRadius: vars.radii.sm,
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	fontSize: vars.font.size.sm,
	color: vars.color.text,
	cursor: "default",
	outline: "none",
	userSelect: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": { backgroundColor: vars.color.ghostHover },
		"&[data-disabled]": {
			opacity: "0.5",
			pointerEvents: "none"
		}
	}
});
/** Menu separator line */
const baseMenuSeparator = style({
	height: "1px",
	margin: `${vars.space["1"]} -${vars.space["1"]}`,
	backgroundColor: vars.color.borderSubtle
});
/** Menu label (group header) */
const baseMenuLabel = style({
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium
});
/** Menu shortcut text */
const baseMenuShortcut = style({
	marginLeft: "auto",
	fontSize: vars.font.size.xs,
	letterSpacing: vars.font.letterSpacing.wide,
	color: vars.color.textMuted
});
/** Item indicator container (for checkboxes/radios) */
const baseMenuItemIndicator = style({
	position: "absolute",
	left: vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "14px",
	height: "14px"
});

//#endregion
//#region src/components/ContextMenu/ContextMenu.css.ts
const slideIn$2 = keyframes({
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
const contextMenuContent = style({
	zIndex: vars.zIndex.dropdown,
	minWidth: "8rem",
	overflow: "hidden",
	borderRadius: vars.radii.md,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surfaceElevated,
	padding: vars.space["1"],
	boxShadow: vars.shadow.md,
	animation: `${slideIn$2} ${vars.motion.duration.fast} ${vars.motion.easing.default}`
});
const contextMenuItem = baseMenuItem;
const contextMenuCheckboxItem = baseMenuItem;
const contextMenuRadioItem = baseMenuItem;
const contextMenuLabel = baseMenuLabel;
const contextMenuSeparator = baseMenuSeparator;
const contextMenuShortcut = baseMenuShortcut;
const contextMenuItemIndicator = baseMenuItemIndicator;
const contextMenuSubTrigger = style([baseMenuItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: vars.color.ghostHover } } }]);
const contextMenuSubContent = style([contextMenuContent, {}]);

//#endregion
//#region src/components/ContextMenu/ContextMenu.tsx
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(ContextMenuPrimitive.Content, {
	ref,
	className: [contextMenuContent, className].filter(Boolean).join(" "),
	...props
}) }));
ContextMenuContent.displayName = "ContextMenuContent";
const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.Item, {
	ref,
	className: [contextMenuItem, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
ContextMenuItem.displayName = "ContextMenuItem";
const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(ContextMenuPrimitive.CheckboxItem, {
	ref,
	className: [contextMenuCheckboxItem, className].filter(Boolean).join(" "),
	checked,
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: contextMenuItemIndicator,
		children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { size: 16 }) })
	}), children]
}));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(ContextMenuPrimitive.RadioItem, {
	ref,
	className: [contextMenuRadioItem, className].filter(Boolean).join(" "),
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: contextMenuItemIndicator,
		children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, {
			size: 8,
			fill: "currentColor"
		}) })
	}), children]
}));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.Label, {
	ref,
	className: [contextMenuLabel, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
ContextMenuLabel.displayName = "ContextMenuLabel";
const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.Separator, {
	ref,
	className: [contextMenuSeparator, className].filter(Boolean).join(" "),
	...props
}));
ContextMenuSeparator.displayName = "ContextMenuSeparator";
const ContextMenuShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
	className: [contextMenuShortcut, className].filter(Boolean).join(" "),
	...props
});
ContextMenuShortcut.displayName = "ContextMenuShortcut";
const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(ContextMenuPrimitive.SubTrigger, {
	ref,
	className: [contextMenuSubTrigger, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, {
		size: 16,
		style: { marginLeft: "auto" },
		"aria-hidden": true
	})]
}));
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.SubContent, {
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
const dialogClose = style({
	position: "absolute",
	right: vars.space["4"],
	top: vars.space["4"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: vars.radii.sm,
	opacity: "0.7",
	cursor: "pointer",
	background: "none",
	border: "none",
	padding: 0,
	color: vars.color.text,
	transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: { "&:hover": { opacity: "1" } }
});

//#endregion
//#region src/components/Dialog/Dialog.tsx
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: [dialogOverlay, className].filter(Boolean).join(" "),
	...props
}));
DialogOverlay.displayName = "DialogOverlay";
const DialogContent = React.forwardRef(({ className, children, showCloseButton = true, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: [dialogContent, className].filter(Boolean).join(" "),
	...props,
	children: [children, showCloseButton && /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: dialogClose,
		"aria-label": "Close dialog",
		children: [/* @__PURE__ */ jsx(X, { size: 16 }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = "DialogContent";
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [dialogHeader, className].filter(Boolean).join(" "),
	...props
});
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [dialogFooter, className].filter(Boolean).join(" "),
	...props
});
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: [dialogTitle, className].filter(Boolean).join(" "),
	...props
}));
DialogTitle.displayName = "DialogTitle";
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: [dialogDescription, className].filter(Boolean).join(" "),
	...props
}));
DialogDescription.displayName = "DialogDescription";

//#endregion
//#region src/components/DropdownMenu/DropdownMenu.css.ts
const slideDownAndFade$1 = keyframes({
	from: {
		opacity: 0,
		transform: "translateY(-4px)"
	},
	to: {
		opacity: 1,
		transform: "translateY(0)"
	}
});
const slideUpAndFade$1 = keyframes({
	from: {
		opacity: 0,
		transform: "translateY(4px)"
	},
	to: {
		opacity: 1,
		transform: "translateY(0)"
	}
});
const slideLeftAndFade = keyframes({
	from: {
		opacity: 0,
		transform: "translateX(4px)"
	},
	to: {
		opacity: 1,
		transform: "translateX(0)"
	}
});
const slideRightAndFade = keyframes({
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
const dropdownContent = style({
	minWidth: "8rem",
	backgroundColor: vars.color.surfaceElevated,
	color: vars.color.text,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	boxShadow: vars.shadow.md,
	padding: vars.space["1"],
	zIndex: vars.zIndex.dropdown,
	overflow: "hidden",
	animationDuration: vars.motion.duration.normal,
	animationTimingFunction: vars.motion.easing.default,
	selectors: {
		"&[data-side=\"top\"]": { animationName: slideUpAndFade$1 },
		"&[data-side=\"bottom\"]": { animationName: slideDownAndFade$1 },
		"&[data-side=\"left\"]": { animationName: slideLeftAndFade },
		"&[data-side=\"right\"]": { animationName: slideRightAndFade }
	}
});
const dropdownItem = baseMenuItem;
const dropdownDestructiveItem = style([baseMenuItem, {
	color: vars.color.destructive,
	selectors: { "&[data-highlighted]": {
		backgroundColor: `color-mix(in srgb, ${vars.color.destructive} 10%, transparent)`,
		color: vars.color.destructive
	} }
}]);
const dropdownLabel = baseMenuLabel;
const dropdownSeparator = baseMenuSeparator;
const dropdownItemIndicator = baseMenuItemIndicator;
const dropdownShortcut = baseMenuShortcut;
const dropdownCheckboxItem = style([baseMenuItem, { paddingLeft: vars.space["8"] }]);
const dropdownRadioItem = style([dropdownCheckboxItem]);
const dropdownSubTrigger = style([baseMenuItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: vars.color.ghostHover } } }]);
const dropdownSubContent = style([dropdownContent]);

//#endregion
//#region src/components/DropdownMenu/DropdownMenu.tsx
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: [dropdownSubTrigger, className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, {
		size: 16,
		style: { marginLeft: "auto" },
		"aria-hidden": true
	})]
}));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: [dropdownSubContent, className].filter(Boolean).join(" "),
	sideOffset: 2,
	alignOffset: -4,
	...props
}));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	className: [dropdownContent, className].filter(Boolean).join(" "),
	sideOffset,
	...props
}) }));
DropdownMenuContent.displayName = "DropdownMenuContent";
const DropdownMenuItem = React.forwardRef(({ className, destructive, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: [destructive ? dropdownDestructiveItem : dropdownItem, className].filter(Boolean).join(" "),
	...props
}));
DropdownMenuItem.displayName = "DropdownMenuItem";
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: [dropdownCheckboxItem, className].filter(Boolean).join(" "),
	checked,
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: dropdownItemIndicator,
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { size: 16 }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: [dropdownRadioItem, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: dropdownItemIndicator,
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, {
			size: 8,
			fill: "currentColor"
		}) })
	}), children]
}));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
const DropdownMenuLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: [dropdownLabel, className].filter(Boolean).join(" "),
	...props
}));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: [dropdownSeparator, className].filter(Boolean).join(" "),
	...props
}));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
const DropdownMenuShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
	className: [dropdownShortcut, className].filter(Boolean).join(" "),
	...props
});
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

//#endregion
//#region src/components/FieldMessage/FieldMessage.css.ts
const fieldMessageRecipe = recipe({
	base: {
		display: "flex",
		alignItems: "center",
		gap: vars.space["1"],
		fontSize: vars.font.size.xs,
		lineHeight: vars.font.lineHeight.normal
	},
	variants: { variant: {
		default: { color: vars.color.textMuted },
		error: { color: vars.color.destructive },
		success: { color: vars.color.success }
	} },
	defaultVariants: { variant: "default" }
});

//#endregion
//#region src/components/FieldMessage/FieldMessage.tsx
const FieldMessage = React.forwardRef(({ variant = "default", className, children, ...props }, ref) => /* @__PURE__ */ jsx("p", {
	ref,
	className: [fieldMessageRecipe({ variant }), className].filter(Boolean).join(" "),
	role: variant === "error" ? "alert" : void 0,
	...props,
	children
}));
FieldMessage.displayName = "FieldMessage";

//#endregion
//#region src/components/HoverCard/HoverCard.css.ts
const slideIn$1 = keyframes({
	from: {
		opacity: "0",
		transform: "translateY(2px)"
	},
	to: {
		opacity: "1",
		transform: "translateY(0)"
	}
});
const hoverCardContent = style({
	zIndex: vars.zIndex.dropdown,
	width: "280px",
	borderRadius: vars.radii.lg,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surfaceElevated,
	padding: vars.space["3"],
	boxShadow: vars.shadow.lg,
	outline: "none",
	animation: `${slideIn$1} ${vars.motion.duration.fast} ${vars.motion.easing.default}`
});

//#endregion
//#region src/components/HoverCard/HoverCard.tsx
const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(HoverCardPrimitive.Content, {
	ref,
	align,
	sideOffset,
	className: [hoverCardContent, className].filter(Boolean).join(" "),
	...props
}));
HoverCardContent.displayName = "HoverCardContent";

//#endregion
//#region src/components/Input/Input.css.ts
const inputWrapperRecipe = recipe({
	base: {
		display: "flex",
		flexDirection: "column",
		gap: vars.space["1_5"]
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
const inputRecipe = recipe({
	base: {
		width: "100%",
		minWidth: 0,
		backgroundColor: vars.color.input,
		color: vars.color.text,
		border: `1px solid ${vars.color.border}`,
		borderRadius: vars.radii.md,
		fontFamily: vars.font.family.sans,
		fontSize: vars.font.size.sm,
		lineHeight: vars.font.lineHeight.normal,
		boxShadow: vars.shadow.xs,
		outline: "none",
		transition: [`color ${vars.motion.duration.fast} ${vars.motion.easing.default}`, `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`].join(", "),
		selectors: {
			"&::placeholder": { color: vars.color.placeholder },
			"&:focus-visible": {
				borderColor: vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
			},
			"&:disabled": {
				opacity: "0.5",
				cursor: "not-allowed",
				pointerEvents: "none"
			},
			"&[aria-invalid=\"true\"]": {
				borderColor: vars.color.destructive,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`
			}
		}
	},
	variants: { size: {
		sm: {
			height: vars.space["7"],
			paddingLeft: vars.space["2"],
			paddingRight: vars.space["2"],
			fontSize: vars.font.size.xs
		},
		md: {
			height: vars.space["8"],
			paddingLeft: vars.space["3"],
			paddingRight: vars.space["3"],
			fontSize: vars.font.size.sm
		},
		lg: {
			height: vars.space["10"],
			paddingLeft: vars.space["3"],
			paddingRight: vars.space["3"],
			fontSize: vars.font.size.sm
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
const Input = forwardRef(({ inputSize = "md", label, message, error = false, fullWidth = false, className, id: idProp, disabled, ...props }, ref) => {
	const autoId = useId();
	const id = idProp ?? autoId;
	const messageId = `${id}-message`;
	return /* @__PURE__ */ jsxs("div", {
		className: inputWrapperRecipe({ fullWidth }),
		children: [
			label && /* @__PURE__ */ jsx("label", {
				htmlFor: id,
				style: {
					fontSize: "var(--font-size-sm, 0.875rem)",
					fontWeight: 500
				},
				children: label
			}),
			/* @__PURE__ */ jsx("input", {
				ref,
				id,
				className: [inputRecipe({ size: inputSize }), className].filter(Boolean).join(" "),
				disabled,
				"aria-invalid": error || void 0,
				"aria-describedby": message ? messageId : void 0,
				...props
			}),
			message && /* @__PURE__ */ jsx("p", {
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
const inputGroupRoot = style({
	position: "relative",
	display: "flex",
	width: "100%",
	alignItems: "center",
	borderRadius: vars.radii.md,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.input,
	boxShadow: vars.shadow.xs,
	height: vars.space["8"],
	minWidth: 0,
	transition: "color 0.15s, box-shadow 0.15s",
	selectors: { "&:focus-within": {
		borderColor: vars.color.focusRing,
		boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
	} }
});
/** Auto-height variant (for textareas) */
const inputGroupColumn = style({
	flexDirection: "column",
	height: "auto"
});
/**
* Addon — text, icon, or button slot next to the input.
*/
const inputGroupAddon = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: vars.space["1"],
	padding: `0 ${vars.space["3"]}`,
	fontSize: vars.font.size.sm,
	fontWeight: "500",
	color: vars.color.textMuted,
	whiteSpace: "nowrap",
	userSelect: "none",
	flexShrink: 0
});
/**
* Toolbar — row at the end of a column-layout group (below textarea).
*/
const inputGroupToolbar = style({
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap",
	gap: vars.space["1"],
	width: "100%",
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	borderTop: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
	fontSize: vars.font.size.xs,
	color: vars.color.textMuted
});
/**
* Strip all chrome from an Input or Textarea inside an InputGroup.
* The group wrapper provides the visual container.
*/
const inputGroupInput = style({
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
const InputGroup = forwardRef(({ className, column = false, ...props }, ref) => /* @__PURE__ */ jsx("div", {
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
const InputGroupAddon = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("span", {
	ref,
	className: [inputGroupAddon, className].filter(Boolean).join(" "),
	...props
}));
InputGroupAddon.displayName = "InputGroupAddon";
/**
* InputGroupToolbar — row at the bottom of a column InputGroup.
*/
const InputGroupToolbar = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [inputGroupToolbar, className].filter(Boolean).join(" "),
	...props
}));
InputGroupToolbar.displayName = "InputGroupToolbar";

//#endregion
//#region src/components/Kbd/Kbd.css.ts
const kbdRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: vars.font.family.mono,
		fontWeight: vars.font.weight.medium,
		borderRadius: vars.radii.sm,
		border: `1px solid ${vars.color.border}`,
		backgroundColor: vars.color.secondary,
		color: vars.color.text,
		boxShadow: `0 1px 0 1px ${vars.color.borderSubtle}`,
		whiteSpace: "nowrap",
		lineHeight: "1"
	},
	variants: { size: {
		sm: {
			height: "20px",
			minWidth: "20px",
			padding: `0 ${vars.space["1"]}`,
			fontSize: vars.font.size.xs
		},
		md: {
			height: "24px",
			minWidth: "24px",
			padding: `0 ${vars.space["1_5"]}`,
			fontSize: vars.font.size.xs
		}
	} },
	defaultVariants: { size: "md" }
});

//#endregion
//#region src/components/Kbd/Kbd.tsx
const Kbd = React.forwardRef(({ size = "md", className, ...props }, ref) => /* @__PURE__ */ jsx("kbd", {
	ref,
	className: [kbdRecipe({ size }), className].filter(Boolean).join(" "),
	...props
}));
Kbd.displayName = "Kbd";

//#endregion
//#region src/components/Label/Label.css.ts
const label = style({
	display: "block",
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	color: vars.color.text,
	lineHeight: vars.font.lineHeight.normal,
	userSelect: "none",
	selectors: { "&[data-disabled]": {
		opacity: "0.5",
		cursor: "not-allowed"
	} }
});

//#endregion
//#region src/components/Label/Label.tsx
const Label = React.forwardRef(({ className, disabled, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: [label, className].filter(Boolean).join(" "),
	"data-disabled": disabled ? "" : void 0,
	...props
}));
Label.displayName = "Label";

//#endregion
//#region src/components/Menubar/Menubar.css.ts
const slideIn = keyframes({
	from: {
		opacity: "0",
		transform: "scale(0.96)"
	},
	to: {
		opacity: "1",
		transform: "scale(1)"
	}
});
const menubarRoot = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["1"],
	borderRadius: vars.radii.md,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surface,
	padding: vars.space["1"],
	boxShadow: vars.shadow.sm
});
const menubarTrigger = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: vars.space["1"],
	borderRadius: vars.radii.sm,
	padding: `${vars.space["1"]} ${vars.space["2_5"]}`,
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	color: vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	outline: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": { backgroundColor: vars.color.ghostHover },
		"&[data-state=\"open\"]": { backgroundColor: vars.color.ghostHover },
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "-2px"
		}
	}
});
const menubarContent = style({
	zIndex: vars.zIndex.dropdown,
	minWidth: "200px",
	overflow: "hidden",
	borderRadius: vars.radii.md,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surfaceElevated,
	padding: vars.space["1"],
	boxShadow: vars.shadow.lg,
	animation: `${slideIn} ${vars.motion.duration.fast} ${vars.motion.easing.default}`
});
const menubarItem = baseMenuItem;
const menubarSeparator = baseMenuSeparator;
const menubarLabel = style({
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	fontSize: vars.font.size.xs,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.textMuted
});
const menubarShortcut = baseMenuShortcut;
const menubarItemIndicator = baseMenuItemIndicator;
const menubarSubTrigger = style([baseMenuItem, { selectors: { "&[data-state=\"open\"]": { backgroundColor: vars.color.ghostHover } } }]);
const menubarSubContent = style([menubarContent, {}]);
const menubarCheckboxItem = baseMenuItem;
const menubarRadioItem = baseMenuItem;

//#endregion
//#region src/components/Menubar/Menubar.tsx
const Menubar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Root, {
	ref,
	className: [menubarRoot, className].filter(Boolean).join(" "),
	...props
}));
Menubar.displayName = "Menubar";
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Trigger, {
	ref,
	className: [menubarTrigger, className].filter(Boolean).join(" "),
	...props
}));
MenubarTrigger.displayName = "MenubarTrigger";
const MenubarContent = React.forwardRef(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsx(MenubarPrimitive.Content, {
	ref,
	align,
	alignOffset,
	sideOffset,
	className: [menubarContent, className].filter(Boolean).join(" "),
	...props
}) }));
MenubarContent.displayName = "MenubarContent";
const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Item, {
	ref,
	className: [menubarItem, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
MenubarItem.displayName = "MenubarItem";
const MenubarCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(MenubarPrimitive.CheckboxItem, {
	ref,
	className: [menubarCheckboxItem, className].filter(Boolean).join(" "),
	checked,
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: menubarItemIndicator,
		children: /* @__PURE__ */ jsx(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { size: 16 }) })
	}), children]
}));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";
const MenubarRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(MenubarPrimitive.RadioItem, {
	ref,
	className: [menubarRadioItem, className].filter(Boolean).join(" "),
	style: { paddingLeft: "2rem" },
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: menubarItemIndicator,
		children: /* @__PURE__ */ jsx(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, {
			size: 8,
			fill: "currentColor"
		}) })
	}), children]
}));
MenubarRadioItem.displayName = "MenubarRadioItem";
const MenubarLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Label, {
	ref,
	className: [menubarLabel, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props
}));
MenubarLabel.displayName = "MenubarLabel";
const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Separator, {
	ref,
	className: [menubarSeparator, className].filter(Boolean).join(" "),
	...props
}));
MenubarSeparator.displayName = "MenubarSeparator";
const MenubarShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
	className: [menubarShortcut, className].filter(Boolean).join(" "),
	...props
});
MenubarShortcut.displayName = "MenubarShortcut";
const MenubarSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(MenubarPrimitive.SubTrigger, {
	ref,
	className: [menubarSubTrigger, className].filter(Boolean).join(" "),
	style: inset ? { paddingLeft: "2rem" } : void 0,
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, {
		size: 16,
		style: { marginLeft: "auto" },
		"aria-hidden": true
	})]
}));
MenubarSubTrigger.displayName = "MenubarSubTrigger";
const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.SubContent, {
	ref,
	className: [menubarSubContent, className].filter(Boolean).join(" "),
	...props
}));
MenubarSubContent.displayName = "MenubarSubContent";

//#endregion
//#region src/components/NavigationMenu/NavigationMenu.css.ts
const enterFromRight = keyframes({
	from: {
		opacity: "0",
		transform: "translateX(200px)"
	},
	to: {
		opacity: "1",
		transform: "translateX(0)"
	}
});
const enterFromLeft = keyframes({
	from: {
		opacity: "0",
		transform: "translateX(-200px)"
	},
	to: {
		opacity: "1",
		transform: "translateX(0)"
	}
});
const scaleIn = keyframes({
	from: {
		opacity: "0",
		transform: "rotateX(-30deg) scale(0.9)"
	},
	to: {
		opacity: "1",
		transform: "rotateX(0deg) scale(1)"
	}
});
const scaleOut = keyframes({
	from: {
		opacity: "1",
		transform: "rotateX(0deg) scale(1)"
	},
	to: {
		opacity: "0",
		transform: "rotateX(-10deg) scale(0.95)"
	}
});
const navigationMenuRoot = style({
	position: "relative",
	display: "flex",
	justifyContent: "center",
	zIndex: vars.zIndex.dropdown
});
const navigationMenuList = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["1"],
	listStyle: "none",
	margin: 0,
	padding: vars.space["1"],
	borderRadius: vars.radii.md,
	backgroundColor: vars.color.surface,
	border: `1px solid ${vars.color.border}`
});
const navigationMenuTrigger = style({
	display: "inline-flex",
	alignItems: "center",
	gap: vars.space["1"],
	padding: `${vars.space["1_5"]} ${vars.space["2_5"]}`,
	borderRadius: vars.radii.sm,
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	color: vars.color.text,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	outline: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": { backgroundColor: vars.color.ghostHover },
		"&[data-state=\"open\"]": { backgroundColor: vars.color.ghostHover },
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "-2px"
		}
	}
});
const navigationMenuLink = style([navigationMenuTrigger, { textDecoration: "none" }]);
const navigationMenuContent = style({
	position: "absolute",
	top: "100%",
	left: 0,
	width: "auto",
	selectors: {
		"&[data-motion=\"from-start\"]": { animation: `${enterFromLeft} ${vars.motion.duration.normal} ${vars.motion.easing.default}` },
		"&[data-motion=\"from-end\"]": { animation: `${enterFromRight} ${vars.motion.duration.normal} ${vars.motion.easing.default}` },
		"&[data-motion=\"to-start\"]": {
			animation: `${enterFromRight} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
			animationDirection: "reverse"
		},
		"&[data-motion=\"to-end\"]": {
			animation: `${enterFromLeft} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
			animationDirection: "reverse"
		}
	}
});
const navigationMenuViewport = style({
	position: "relative",
	marginTop: vars.space["2"],
	width: "var(--radix-navigation-menu-viewport-width)",
	overflow: "hidden",
	borderRadius: vars.radii.lg,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surfaceElevated,
	boxShadow: vars.shadow.lg,
	height: "var(--radix-navigation-menu-viewport-height)",
	transition: `width ${vars.motion.duration.normal}, height ${vars.motion.duration.normal}`,
	selectors: {
		"&[data-state=\"open\"]": { animation: `${scaleIn} ${vars.motion.duration.normal} ${vars.motion.easing.default}` },
		"&[data-state=\"closed\"]": { animation: `${scaleOut} ${vars.motion.duration.normal} ${vars.motion.easing.default}` }
	}
});
const navigationMenuIndicator = style({
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	height: "10px",
	top: "100%",
	overflow: "hidden",
	zIndex: 1,
	transition: `width ${vars.motion.duration.normal}, transform ${vars.motion.duration.normal}`
});
const navigationMenuIndicatorArrow = style({
	position: "relative",
	top: "70%",
	width: "10px",
	height: "10px",
	backgroundColor: vars.color.surfaceElevated,
	border: `1px solid ${vars.color.border}`,
	borderBottomColor: "transparent",
	borderRightColor: "transparent",
	transform: "rotate(45deg)",
	borderRadius: `${vars.radii.sm} 0 0 0`
});

//#endregion
//#region src/components/NavigationMenu/NavigationMenu.tsx
const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(NavigationMenuPrimitive.Root, {
	ref,
	className: [navigationMenuRoot, className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ jsx(NavigationMenuViewport, {})]
}));
NavigationMenu.displayName = "NavigationMenu";
const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(NavigationMenuPrimitive.List, {
	ref,
	className: [navigationMenuList, className].filter(Boolean).join(" "),
	...props
}));
NavigationMenuList.displayName = "NavigationMenuList";
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(NavigationMenuPrimitive.Trigger, {
	ref,
	className: [navigationMenuTrigger, className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronDown, {
		size: 12,
		"aria-hidden": true,
		style: { transition: "transform 200ms" }
	})]
}));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(NavigationMenuPrimitive.Content, {
	ref,
	className: [navigationMenuContent, className].filter(Boolean).join(" "),
	...props
}));
NavigationMenuContent.displayName = "NavigationMenuContent";
const NavigationMenuLink = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(NavigationMenuPrimitive.Link, {
	ref,
	className: [navigationMenuLink, className].filter(Boolean).join(" "),
	...props
}));
NavigationMenuLink.displayName = "NavigationMenuLink";
const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	style: {
		position: "absolute",
		left: 0,
		top: "100%",
		display: "flex",
		justifyContent: "center",
		width: "100%"
	},
	children: /* @__PURE__ */ jsx(NavigationMenuPrimitive.Viewport, {
		ref,
		className: [navigationMenuViewport, className].filter(Boolean).join(" "),
		...props
	})
}));
NavigationMenuViewport.displayName = "NavigationMenuViewport";
const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(NavigationMenuPrimitive.Indicator, {
	ref,
	className: [navigationMenuIndicator, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx("div", { className: navigationMenuIndicatorArrow })
}));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

//#endregion
//#region src/components/Pagination/Pagination.css.ts
const paginationNav = style({
	display: "flex",
	justifyContent: "center",
	width: "100%"
});
const paginationContent = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["1"],
	listStyle: "none",
	margin: 0,
	padding: 0
});
const paginationItem = style({ display: "inline-flex" });
const paginationLink = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: vars.space["1"],
		minWidth: vars.space["8"],
		height: vars.space["8"],
		paddingLeft: vars.space["2_5"],
		paddingRight: vars.space["2_5"],
		borderRadius: vars.radii.md,
		border: `1px solid transparent`,
		fontSize: vars.font.size.sm,
		fontWeight: vars.font.weight.medium,
		color: vars.color.text,
		backgroundColor: "transparent",
		cursor: "pointer",
		textDecoration: "none",
		transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
		selectors: {
			"&:hover": { backgroundColor: vars.color.ghostHover },
			"&:focus-visible": {
				outline: `2px solid ${vars.color.focusRing}`,
				outlineOffset: "2px"
			}
		}
	},
	variants: { isActive: {
		true: {
			borderColor: vars.color.border,
			backgroundColor: vars.color.ghostHover
		},
		false: {}
	} },
	defaultVariants: { isActive: false }
});
const paginationEllipsis = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: vars.space["8"],
	height: vars.space["8"],
	color: vars.color.textMuted,
	fontSize: vars.font.size.sm
});

//#endregion
//#region src/components/Pagination/Pagination.tsx
const Pagination = ({ className, ...props }) => /* @__PURE__ */ jsx("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: [paginationNav, className].filter(Boolean).join(" "),
	...props
});
Pagination.displayName = "Pagination";
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", {
	ref,
	className: [paginationContent, className].filter(Boolean).join(" "),
	...props
}));
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	className: [paginationItem, className].filter(Boolean).join(" "),
	...props
}));
PaginationItem.displayName = "PaginationItem";
const PaginationLink = ({ isActive = false, className, ...props }) => /* @__PURE__ */ jsx("a", {
	"aria-current": isActive ? "page" : void 0,
	className: [paginationLink({ isActive }), className].filter(Boolean).join(" "),
	...props
});
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ jsxs(PaginationLink, {
	"aria-label": "Go to previous page",
	className,
	...props,
	children: [/* @__PURE__ */ jsx(ChevronLeft, { size: 16 }), /* @__PURE__ */ jsx("span", { children: "Previous" })]
});
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = ({ className, ...props }) => /* @__PURE__ */ jsxs(PaginationLink, {
	"aria-label": "Go to next page",
	className,
	...props,
	children: [/* @__PURE__ */ jsx("span", { children: "Next" }), /* @__PURE__ */ jsx(ChevronRight, { size: 16 })]
});
PaginationNext.displayName = "PaginationNext";
const PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ jsxs("span", {
	"aria-hidden": true,
	className: [paginationEllipsis, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ jsx(MoreHorizontal, { size: 16 }), /* @__PURE__ */ jsx("span", {
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";

//#endregion
//#region src/components/Popover/Popover.css.ts
const fadeIn$1 = keyframes({
	from: {
		opacity: 0,
		transform: "scale(0.96) translateY(-2px)"
	},
	to: {
		opacity: 1,
		transform: "scale(1) translateY(0)"
	}
});
const popoverContent = style({
	backgroundColor: vars.color.surfaceElevated,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	boxShadow: vars.shadow.lg,
	padding: vars.space["3"],
	zIndex: vars.zIndex.dropdown,
	maxWidth: "280px",
	width: "var(--radix-popover-trigger-width, auto)",
	animationName: fadeIn$1,
	animationDuration: vars.motion.duration.normal,
	animationTimingFunction: vars.motion.easing.default,
	outline: "none"
});
const popoverArrow = style({
	fill: vars.color.surfaceElevated,
	filter: `drop-shadow(0 1px 0 ${vars.color.border})`
});
const popoverClose = style({
	position: "absolute",
	top: vars.space["2"],
	right: vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "24px",
	height: "24px",
	borderRadius: vars.radii.sm,
	border: "none",
	backgroundColor: "transparent",
	color: vars.color.textMuted,
	cursor: "pointer",
	outline: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": {
			backgroundColor: vars.color.ghostHover,
			color: vars.color.text
		},
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "2px"
		}
	}
});

//#endregion
//#region src/components/Popover/Popover.tsx
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, showArrow = false, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxs(PopoverPrimitive.Content, {
	ref,
	align,
	sideOffset,
	className: [popoverContent, className].filter(Boolean).join(" "),
	...props,
	children: [props.children, showArrow && /* @__PURE__ */ jsx(PopoverPrimitive.Arrow, { className: popoverArrow })]
}) }));
PopoverContent.displayName = "PopoverContent";
const PopoverClose = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Close, {
	ref,
	className: [popoverClose, className].filter(Boolean).join(" "),
	"aria-label": "Close",
	...props,
	children: children ?? /* @__PURE__ */ jsx(X, { size: 14 })
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
const progressRoot = style({
	position: "relative",
	width: "100%",
	height: "8px",
	overflow: "hidden",
	borderRadius: vars.radii.full,
	backgroundColor: `color-mix(in srgb, ${vars.color.primary} 20%, transparent)`
});
const progressIndicator = style({
	height: "100%",
	width: "100%",
	flex: 1,
	backgroundColor: vars.color.primary,
	transition: `all ${vars.motion.duration.normal} ${vars.motion.easing.default}`
});

//#endregion
//#region src/components/Progress/Progress.tsx
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(ProgressPrimitive.Root, {
	ref,
	className: [progressRoot, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx(ProgressPrimitive.Indicator, {
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
const radioGroupRoot = style({
	display: "grid",
	gap: vars.space["2"],
	width: "100%"
});
const radioGroupItem = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "16px",
	height: "16px",
	aspectRatio: "1",
	borderRadius: vars.radii.full,
	border: `1px solid ${vars.color.border}`,
	boxShadow: vars.shadow.xs,
	cursor: "pointer",
	flexShrink: 0,
	outline: "none",
	transition: `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:focus-visible": {
			borderColor: vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
		},
		"&[data-state=\"checked\"]": { borderColor: vars.color.primary },
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});
const radioGroupIndicator = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	selectors: { "&::after": {
		content: "\"\"",
		display: "block",
		width: "8px",
		height: "8px",
		borderRadius: vars.radii.full,
		backgroundColor: vars.color.primary
	} }
});

//#endregion
//#region src/components/RadioGroup/RadioGroup.tsx
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
	ref,
	className: [radioGroupRoot, className].filter(Boolean).join(" "),
	...props
}));
RadioGroup.displayName = "RadioGroup";
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
	ref,
	className: [radioGroupItem, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: radioGroupIndicator })
}));
RadioGroupItem.displayName = "RadioGroupItem";

//#endregion
//#region src/components/ScrollArea/ScrollArea.css.ts
const scrollAreaRoot = style({
	position: "relative",
	overflow: "hidden"
});
const scrollAreaViewport = style({
	width: "100%",
	height: "100%",
	borderRadius: "inherit"
});
const scrollAreaScrollbar = style({
	display: "flex",
	userSelect: "none",
	touchAction: "none",
	padding: "1px",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
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
		"&:hover": { backgroundColor: vars.color.ghostHover }
	}
});
const scrollAreaThumb = style({
	position: "relative",
	flex: 1,
	borderRadius: vars.radii.full,
	backgroundColor: vars.color.border,
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: { "&:hover": { backgroundColor: vars.color.textMuted } }
});
const scrollAreaCorner = style({ backgroundColor: "transparent" });

//#endregion
//#region src/components/ScrollArea/ScrollArea.tsx
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(ScrollAreaPrimitive.Root, {
	ref,
	className: [scrollAreaRoot, className].filter(Boolean).join(" "),
	...props,
	children: [
		/* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, {
			className: scrollAreaViewport,
			children
		}),
		/* @__PURE__ */ jsx(ScrollBar, {}),
		/* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, { className: scrollAreaCorner })
	]
}));
ScrollArea.displayName = "ScrollArea";
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaScrollbar, {
	ref,
	orientation,
	className: [scrollAreaScrollbar, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: scrollAreaThumb })
}));
ScrollBar.displayName = "ScrollBar";

//#endregion
//#region src/components/Select/Select.css.ts
const slideDownAndFade = keyframes({
	from: {
		opacity: 0,
		transform: "translateY(-4px)"
	},
	to: {
		opacity: 1,
		transform: "translateY(0)"
	}
});
const slideUpAndFade = keyframes({
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
const selectTrigger = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: vars.space["2"],
		width: "100%",
		borderRadius: vars.radii.md,
		border: `1px solid ${vars.color.border}`,
		backgroundColor: vars.color.input,
		color: vars.color.text,
		fontFamily: vars.font.family.sans,
		fontSize: vars.font.size.sm,
		lineHeight: vars.font.lineHeight.normal,
		boxShadow: vars.shadow.xs,
		cursor: "default",
		outline: "none",
		whiteSpace: "nowrap",
		transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
		selectors: {
			"&:focus-visible": {
				borderColor: vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
			},
			"&[data-placeholder]": { color: vars.color.placeholder },
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
				height: vars.space["7"],
				padding: `0 ${vars.space["2"]}`,
				fontSize: vars.font.size.xs
			},
			md: {
				height: vars.space["8"],
				padding: `0 ${vars.space["3"]}`
			},
			lg: {
				height: vars.space["10"],
				padding: `0 ${vars.space["3"]}`,
				fontSize: vars.font.size.sm
			}
		},
		isError: { true: {
			borderColor: vars.color.destructive,
			selectors: { "&:focus-visible": {
				borderColor: vars.color.destructive,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`
			} }
		} }
	},
	defaultVariants: {
		size: "md",
		isError: false
	}
});
const selectContent = style({
	overflow: "hidden",
	backgroundColor: vars.color.surfaceElevated,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	boxShadow: vars.shadow.md,
	zIndex: vars.zIndex.dropdown,
	minWidth: "var(--radix-select-trigger-width)",
	maxHeight: "var(--radix-select-content-available-height)",
	animationDuration: vars.motion.duration.normal,
	animationTimingFunction: vars.motion.easing.default,
	selectors: {
		"&[data-state=\"open\"][data-side=\"bottom\"]": { animationName: slideDownAndFade },
		"&[data-state=\"open\"][data-side=\"top\"]": { animationName: slideUpAndFade }
	}
});
const selectViewport = style({ padding: vars.space["1"] });
const selectItem = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"],
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	paddingRight: vars.space["8"],
	borderRadius: vars.radii.sm,
	fontSize: vars.font.size.sm,
	color: vars.color.text,
	cursor: "default",
	userSelect: "none",
	position: "relative",
	outline: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": { backgroundColor: vars.color.ghostHover },
		"&[data-disabled]": {
			opacity: "0.5",
			pointerEvents: "none"
		}
	}
});
const selectItemIndicator = style({
	position: "absolute",
	right: vars.space["2"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "14px",
	height: "14px"
});
const selectLabel = style({
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	fontSize: vars.font.size.xs,
	color: vars.color.textMuted
});
const selectSeparator = style({
	height: "1px",
	backgroundColor: vars.color.borderSubtle,
	margin: `${vars.space["1"]} -${vars.space["1"]}`
});
const selectScrollButton = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "25px",
	cursor: "default",
	color: vars.color.textMuted
});
const selectIcon = style({
	color: vars.color.textMuted,
	flexShrink: 0,
	opacity: "0.5"
});

//#endregion
//#region src/components/Select/Select.tsx
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, size = "md", isError = false, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: [selectTrigger({
		size,
		isError
	}), className].filter(Boolean).join(" "),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		className: selectIcon,
		children: /* @__PURE__ */ jsx(ChevronDown, { size: 16 })
	})]
}));
SelectTrigger.displayName = "SelectTrigger";
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { size: 16 })
}));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { size: 16 })
}));
SelectScrollDownButton.displayName = "SelectScrollDownButton";
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: [selectContent, className].filter(Boolean).join(" "),
	position,
	sideOffset: 4,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: selectViewport,
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = "SelectContent";
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: [selectLabel, className].filter(Boolean).join(" "),
	...props
}));
SelectLabel.displayName = "SelectLabel";
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: [selectItem, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: selectItemIndicator,
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { size: 16 }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = "SelectItem";
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: [selectSeparator, className].filter(Boolean).join(" "),
	...props
}));
SelectSeparator.displayName = "SelectSeparator";

//#endregion
//#region src/components/Separator/Separator.css.ts
const separatorRecipe = recipe({
	base: {
		backgroundColor: vars.color.borderSubtle,
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
const Separator = React.forwardRef(({ orientation = "horizontal", decorative = true, className, ...props }, ref) => /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
	ref,
	orientation,
	decorative,
	className: [separatorRecipe({ orientation }), className].filter(Boolean).join(" "),
	...props
}));
Separator.displayName = "Separator";

//#endregion
//#region src/components/Sheet/Sheet.css.ts
const overlayShow = keyframes({
	from: { opacity: "0" },
	to: { opacity: "1" }
});
/**
* Sheet — shadcn v4 aligned.
* - Overlay: black/50
* - Content: bg-background (not surfaceOverlay)
* - Side-based animations
*/
const sheetOverlay = style({
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	position: "fixed",
	inset: 0,
	zIndex: vars.zIndex.overlay,
	animation: `${overlayShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`
});
const slideInFromRight$1 = keyframes({
	from: { transform: "translateX(100%)" },
	to: { transform: "translateX(0)" }
});
const slideInFromLeft = keyframes({
	from: { transform: "translateX(-100%)" },
	to: { transform: "translateX(0)" }
});
const slideInFromTop = keyframes({
	from: { transform: "translateY(-100%)" },
	to: { transform: "translateY(0)" }
});
const slideInFromBottom = keyframes({
	from: { transform: "translateY(100%)" },
	to: { transform: "translateY(0)" }
});
const sheetContent = recipe({
	base: {
		position: "fixed",
		zIndex: vars.zIndex.modal,
		backgroundColor: vars.color.background,
		boxShadow: vars.shadow.lg,
		display: "flex",
		flexDirection: "column",
		gap: vars.space["4"],
		outline: "none"
	},
	variants: { side: {
		right: {
			top: 0,
			right: 0,
			height: "100%",
			width: "75%",
			maxWidth: "24rem",
			borderLeft: `1px solid ${vars.color.border}`,
			animation: `${slideInFromRight$1} 500ms ${vars.motion.easing.default}`
		},
		left: {
			top: 0,
			left: 0,
			height: "100%",
			width: "75%",
			maxWidth: "24rem",
			borderRight: `1px solid ${vars.color.border}`,
			animation: `${slideInFromLeft} 500ms ${vars.motion.easing.default}`
		},
		top: {
			top: 0,
			left: 0,
			right: 0,
			height: "auto",
			borderBottom: `1px solid ${vars.color.border}`,
			animation: `${slideInFromTop} 500ms ${vars.motion.easing.default}`
		},
		bottom: {
			bottom: 0,
			left: 0,
			right: 0,
			height: "auto",
			borderTop: `1px solid ${vars.color.border}`,
			animation: `${slideInFromBottom} 500ms ${vars.motion.easing.default}`
		}
	} },
	defaultVariants: { side: "right" }
});
const sheetHeader = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.space["1_5"],
	padding: vars.space["4"]
});
const sheetFooter = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.space["2"],
	padding: vars.space["4"],
	marginTop: "auto"
});
const sheetBody = style({
	flex: 1,
	overflow: "auto",
	padding: `0 ${vars.space["4"]}`
});
const sheetTitle = style({
	fontSize: vars.font.size.md,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.text
});
const sheetDescription = style({
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted
});
const sheetClose = style({
	position: "absolute",
	top: vars.space["4"],
	right: vars.space["4"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: vars.space["6"],
	height: vars.space["6"],
	borderRadius: vars.radii.sm,
	color: vars.color.textMuted,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	opacity: "0.7",
	transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": { opacity: "1" },
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "2px"
		}
	}
});

//#endregion
//#region src/components/Sheet/Sheet.tsx
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: [sheetOverlay, className].filter(Boolean).join(" "),
	...props
}));
SheetOverlay.displayName = "SheetOverlay";
const SheetContent = React.forwardRef(({ side = "right", showCloseButton = true, className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: [sheetContent({ side }), className].filter(Boolean).join(" "),
	...props,
	children: [children, showCloseButton && /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: sheetClose,
		"aria-label": "Close",
		children: [/* @__PURE__ */ jsx(X, { size: 16 }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = "SheetContent";
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [sheetHeader, className].filter(Boolean).join(" "),
	...props
});
SheetHeader.displayName = "SheetHeader";
const SheetBody = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [sheetBody, className].filter(Boolean).join(" "),
	...props
});
SheetBody.displayName = "SheetBody";
const SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [sheetFooter, className].filter(Boolean).join(" "),
	...props
});
SheetFooter.displayName = "SheetFooter";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: [sheetTitle, className].filter(Boolean).join(" "),
	...props
}));
SheetTitle.displayName = "SheetTitle";
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: [sheetDescription, className].filter(Boolean).join(" "),
	...props
}));
SheetDescription.displayName = "SheetDescription";

//#endregion
//#region src/components/Skeleton/Skeleton.css.ts
const pulse = keyframes({
	"0%, 100%": { opacity: "1" },
	"50%": { opacity: "0.5" }
});
const skeleton = style({
	borderRadius: vars.radii.md,
	backgroundColor: vars.color.secondary,
	animation: `${pulse} 2s ${vars.motion.easing.default} infinite`
});

//#endregion
//#region src/components/Skeleton/Skeleton.tsx
const Skeleton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
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
const sliderRoot = style({
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
const sliderTrack = style({
	position: "relative",
	height: "6px",
	width: "100%",
	overflow: "hidden",
	borderRadius: vars.radii.full,
	backgroundColor: vars.color.secondary
});
const sliderRange = style({
	position: "absolute",
	height: "100%",
	backgroundColor: vars.color.primary
});
const sliderThumb = style({
	display: "block",
	width: "16px",
	height: "16px",
	borderRadius: vars.radii.full,
	backgroundColor: "#ffffff",
	border: `2px solid ${vars.color.primary}`,
	boxShadow: vars.shadow.sm,
	transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	outline: "none",
	selectors: {
		"&:hover": { boxShadow: `0 0 0 4px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)` },
		"&:focus-visible": { boxShadow: `0 0 0 4px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)` },
		"&:disabled": {
			opacity: "0.5",
			pointerEvents: "none"
		}
	}
});

//#endregion
//#region src/components/Slider/Slider.tsx
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(SliderPrimitive.Root, {
	ref,
	className: [sliderRoot, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ jsx(SliderPrimitive.Track, {
		className: sliderTrack,
		children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: sliderRange })
	}), /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: sliderThumb })]
}));
Slider.displayName = "Slider";

//#endregion
//#region src/components/Spinner/Spinner.css.ts
const spin = keyframes({ to: { transform: "rotate(360deg)" } });
const spinnerRecipe = recipe({
	base: {
		display: "inline-block",
		borderRadius: vars.radii.full,
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
const Spinner = React.forwardRef(({ size = "md", className, ...props }, ref) => /* @__PURE__ */ jsx("span", {
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
const switchRoot = style({
	display: "inline-flex",
	alignItems: "center",
	width: "32px",
	height: "18px",
	borderRadius: vars.radii.full,
	backgroundColor: vars.color.border,
	border: "1px solid transparent",
	padding: 0,
	cursor: "pointer",
	flexShrink: 0,
	boxShadow: vars.shadow.xs,
	outline: "none",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"checked\"]": { backgroundColor: vars.color.primary },
		"&:focus-visible": {
			borderColor: vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});
const switchThumb = style({
	display: "block",
	width: "16px",
	height: "16px",
	borderRadius: vars.radii.full,
	backgroundColor: vars.color.background,
	boxShadow: vars.shadow.sm,
	pointerEvents: "none",
	transition: `transform ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"checked\"]": { transform: "translateX(calc(100% - 2px))" },
		"&[data-state=\"unchecked\"]": { transform: "translateX(0)" }
	}
});

//#endregion
//#region src/components/Switch/Switch.tsx
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitive.Root, {
	ref,
	className: [switchRoot, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { className: switchThumb })
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
const tableWrapper = style({
	position: "relative",
	width: "100%",
	overflowX: "auto"
});
const table$1 = style({
	width: "100%",
	borderCollapse: "collapse",
	captionSide: "bottom",
	fontSize: vars.font.size.sm,
	color: vars.color.text
});
const tableCaption = style({
	marginTop: vars.space["4"],
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	textAlign: "center"
});
const tableHeader = style({ borderBottom: `1px solid ${vars.color.border}` });
const tableBody = style({});
globalStyle(`${tableBody} tr:last-child`, { borderBottom: "none" });
const tableFooter = style({
	borderTop: `1px solid ${vars.color.border}`,
	backgroundColor: `color-mix(in srgb, ${vars.color.secondary} 50%, transparent)`,
	fontWeight: vars.font.weight.medium
});
globalStyle(`${tableFooter} tr:last-child`, { borderBottom: "none" });
const tableRow = style({
	borderBottom: `1px solid ${vars.color.border}`,
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"selected\"]": { backgroundColor: vars.color.secondary },
		"&:hover": { backgroundColor: vars.color.ghostHover }
	}
});
const tableHead = style({
	height: vars.space["10"],
	padding: `0 ${vars.space["2"]}`,
	textAlign: "left",
	verticalAlign: "middle",
	fontWeight: vars.font.weight.medium,
	color: vars.color.text,
	fontSize: vars.font.size.sm,
	whiteSpace: "nowrap",
	selectors: { "&:has([role=checkbox])": { paddingRight: 0 } }
});
const tableCell = style({
	padding: vars.space["2"],
	verticalAlign: "middle",
	whiteSpace: "nowrap",
	selectors: { "&:has([role=checkbox])": { paddingRight: 0 } }
});

//#endregion
//#region src/components/Table/Table.tsx
const TableWrapper = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: [tableWrapper, className].filter(Boolean).join(" "),
	...props
});
TableWrapper.displayName = "TableWrapper";
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("table", {
	ref,
	className: [table$1, className].filter(Boolean).join(" "),
	...props
}));
Table.displayName = "Table";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", {
	ref,
	className: [tableCaption, className].filter(Boolean).join(" "),
	...props
}));
TableCaption.displayName = "TableCaption";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", {
	ref,
	className: [tableHeader, className].filter(Boolean).join(" "),
	...props
}));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", {
	ref,
	className: [tableBody, className].filter(Boolean).join(" "),
	...props
}));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", {
	ref,
	className: [tableFooter, className].filter(Boolean).join(" "),
	...props
}));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tr", {
	ref,
	className: [tableRow, className].filter(Boolean).join(" "),
	...props
}));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("th", {
	ref,
	className: [tableHead, className].filter(Boolean).join(" "),
	...props
}));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", {
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
const tabsList = style({
	display: "inline-flex",
	alignItems: "center",
	backgroundColor: vars.color.secondary,
	borderRadius: vars.radii.lg,
	padding: "3px",
	gap: vars.space["0_5"],
	height: vars.space["8"],
	color: vars.color.textMuted
});
const tabsTrigger = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	flex: 1,
	height: "calc(100% - 1px)",
	paddingLeft: vars.space["2"],
	paddingRight: vars.space["2"],
	paddingTop: vars.space["1"],
	paddingBottom: vars.space["1"],
	borderRadius: vars.radii.md,
	border: "1px solid transparent",
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	color: vars.color.textMuted,
	cursor: "pointer",
	backgroundColor: "transparent",
	whiteSpace: "nowrap",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	outline: "none",
	gap: vars.space["1_5"],
	selectors: {
		"&:hover": { color: vars.color.text },
		"&[data-state=\"active\"]": {
			color: vars.color.text,
			backgroundColor: vars.color.background,
			boxShadow: vars.shadow.sm
		},
		"&:focus-visible": {
			borderColor: vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
			pointerEvents: "none"
		}
	}
});
const tabsContent = style({
	flex: 1,
	outline: "none"
});

//#endregion
//#region src/components/Tabs/Tabs.tsx
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.List, {
	ref,
	className: [tabsList, className].filter(Boolean).join(" "),
	...props
}));
TabsList.displayName = "TabsList";
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
	ref,
	className: [tabsTrigger, className].filter(Boolean).join(" "),
	...props
}));
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
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
const textarea = style({
	width: "100%",
	minHeight: "4rem",
	padding: `${vars.space["2"]} ${vars.space["3"]}`,
	backgroundColor: vars.color.input,
	color: vars.color.text,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	fontFamily: vars.font.family.sans,
	fontSize: vars.font.size.sm,
	lineHeight: vars.font.lineHeight.relaxed,
	resize: "vertical",
	boxShadow: vars.shadow.xs,
	outline: "none",
	transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&::placeholder": { color: vars.color.placeholder },
		"&:focus-visible": {
			borderColor: vars.color.focusRing,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
			pointerEvents: "none"
		},
		"&[aria-invalid=\"true\"]": {
			borderColor: vars.color.destructive,
			boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`
		}
	}
});

//#endregion
//#region src/components/Textarea/Textarea.tsx
const Textarea = forwardRef(({ className, error, ...props }, ref) => /* @__PURE__ */ jsx("textarea", {
	ref,
	className: [textarea, className].filter(Boolean).join(" "),
	"aria-invalid": error || void 0,
	...props
}));
Textarea.displayName = "Textarea";

//#endregion
//#region src/components/Toast/Toast.css.ts
const slideInFromRight = keyframes({
	from: { transform: "translateX(calc(100% + 24px))" },
	to: { transform: "translateX(0)" }
});
const swipeOut = keyframes({
	from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
	to: { transform: "translateX(calc(100% + 24px))" }
});
const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 }
});
const toastViewport = style({
	position: "fixed",
	bottom: 0,
	right: 0,
	display: "flex",
	flexDirection: "column",
	gap: vars.space[2],
	padding: vars.space["4"],
	maxWidth: "380px",
	margin: 0,
	listStyle: "none",
	zIndex: vars.zIndex.toast,
	outline: "none"
});
const toast = recipe({
	base: {
		position: "relative",
		display: "grid",
		gridTemplateColumns: "auto 1fr auto",
		alignItems: "start",
		gap: `${vars.space["1_5"]} ${vars.space["2"]}`,
		padding: vars.space["3"],
		borderRadius: vars.radii.md,
		border: `1px solid ${vars.color.border}`,
		backgroundColor: vars.color.surface,
		boxShadow: vars.shadow.lg,
		overflow: "hidden",
		animationDuration: vars.motion.duration.normal,
		animationTimingFunction: vars.motion.easing.default,
		selectors: {
			"&[data-state=\"open\"]": { animationName: slideInFromRight },
			"&[data-state=\"closed\"]": { animationName: `${fadeOut}, ${swipeOut}` },
			"&[data-swipe=\"move\"]": { transform: "translateX(var(--radix-toast-swipe-move-x))" },
			"&[data-swipe=\"cancel\"]": {
				transform: "translateX(0)",
				transition: `transform ${vars.motion.duration.normal} ${vars.motion.easing.default}`
			},
			"&[data-swipe=\"end\"]": { animationName: swipeOut }
		}
	},
	variants: { variant: {
		default: {},
		success: { borderColor: vars.color.success },
		destructive: {
			borderColor: vars.color.destructive,
			backgroundColor: `color-mix(in srgb, ${vars.color.destructive} 8%, ${vars.color.surface})`
		},
		warning: { borderColor: vars.color.warning }
	} },
	defaultVariants: { variant: "default" }
});
const toastTitle = style({
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.text,
	lineHeight: vars.font.lineHeight.tight
});
const toastDescription = style({
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	lineHeight: vars.font.lineHeight.relaxed,
	gridColumn: "2"
});
const toastAction = style({
	gridColumn: "2",
	display: "inline-flex",
	alignSelf: "end"
});
const toastClose = style({
	position: "absolute",
	top: vars.space[2],
	right: vars.space[2],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	borderRadius: vars.radii.sm,
	border: "none",
	backgroundColor: "transparent",
	color: vars.color.textMuted,
	cursor: "pointer",
	outline: "none",
	opacity: 0,
	transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"[data-state=\"open\"] &": { opacity: 1 },
		"&:hover": {
			backgroundColor: vars.color.ghostHover,
			color: vars.color.text,
			opacity: 1
		},
		"&:focus-visible": {
			opacity: 1,
			outline: `2px solid ${vars.color.primary}`,
			outlineOffset: "1px"
		}
	}
});

//#endregion
//#region src/components/Toast/Toast.tsx
const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Viewport, {
	ref,
	className: [toastViewport, className].filter(Boolean).join(" "),
	...props
}));
ToastViewport.displayName = "ToastViewport";
const Toast = React.forwardRef(({ className, variant = "default", ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Root, {
	ref,
	className: [toast({ variant }), className].filter(Boolean).join(" "),
	...props
}));
Toast.displayName = "Toast";
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Action, {
	ref,
	className: [toastAction, className].filter(Boolean).join(" "),
	...props
}));
ToastAction.displayName = "ToastAction";
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Close, {
	ref,
	className: [toastClose, className].filter(Boolean).join(" "),
	"aria-label": "Dismiss notification",
	...props,
	children: /* @__PURE__ */ jsx(X, { size: 14 })
}));
ToastClose.displayName = "ToastClose";
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Title, {
	ref,
	className: [toastTitle, className].filter(Boolean).join(" "),
	...props
}));
ToastTitle.displayName = "ToastTitle";
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Description, {
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
const toggleRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: vars.space["2"],
		fontFamily: vars.font.family.sans,
		fontSize: vars.font.size.sm,
		fontWeight: vars.font.weight.medium,
		borderRadius: vars.radii.md,
		border: "none",
		backgroundColor: "transparent",
		color: vars.color.textMuted,
		cursor: "pointer",
		whiteSpace: "nowrap",
		outline: "none",
		transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}, background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
		selectors: {
			"&:hover": {
				backgroundColor: vars.color.secondary,
				color: vars.color.textMuted
			},
			"&[data-state=\"on\"]": {
				backgroundColor: vars.color.ghostHover,
				color: vars.color.text
			},
			"&:focus-visible": {
				borderColor: vars.color.focusRing,
				boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`
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
				border: `1px solid ${vars.color.border}`,
				backgroundColor: "transparent",
				boxShadow: vars.shadow.xs,
				selectors: { "&:hover": { backgroundColor: vars.color.ghostHover } }
			}
		},
		size: {
			sm: {
				height: vars.space["7"],
				paddingLeft: vars.space["1_5"],
				paddingRight: vars.space["1_5"],
				minWidth: vars.space["7"]
			},
			md: {
				height: vars.space["8"],
				paddingLeft: vars.space["2"],
				paddingRight: vars.space["2"],
				minWidth: vars.space["8"]
			},
			lg: {
				height: vars.space["10"],
				paddingLeft: vars.space["2_5"],
				paddingRight: vars.space["2_5"],
				minWidth: vars.space["10"]
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
const Toggle = React.forwardRef(({ variant = "default", size = "md", className, ...props }, ref) => /* @__PURE__ */ jsx(TogglePrimitive.Root, {
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
const toggleGroupRoot = style({
	display: "inline-flex",
	alignItems: "center",
	borderRadius: vars.radii.md,
	border: `1px solid ${vars.color.border}`,
	overflow: "hidden",
	gap: 0
});
const toggleGroupItem = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	height: vars.space["8"],
	paddingLeft: vars.space["2_5"],
	paddingRight: vars.space["2_5"],
	fontFamily: vars.font.family.sans,
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	color: vars.color.textMuted,
	backgroundColor: "transparent",
	border: "none",
	borderRight: `1px solid ${vars.color.border}`,
	cursor: "pointer",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:last-child": { borderRight: "none" },
		"&:hover": {
			backgroundColor: vars.color.ghostHover,
			color: vars.color.text
		},
		"&[data-state=\"on\"]": {
			backgroundColor: vars.color.ghostHover,
			color: vars.color.text
		},
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
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
const ToggleGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToggleGroupPrimitive.Root, {
	ref,
	className: [toggleGroupRoot, className].filter(Boolean).join(" "),
	...props
}));
ToggleGroup.displayName = "ToggleGroup";
const ToggleGroupItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToggleGroupPrimitive.Item, {
	ref,
	className: [toggleGroupItem, className].filter(Boolean).join(" "),
	...props
}));
ToggleGroupItem.displayName = "ToggleGroupItem";

//#endregion
//#region src/components/Tooltip/Tooltip.css.ts
const fadeIn = keyframes({
	from: {
		opacity: 0,
		transform: "scale(0.95)"
	},
	to: {
		opacity: 1,
		transform: "scale(1)"
	}
});
const tooltipContent = style({
	backgroundColor: vars.color.text,
	color: vars.color.background,
	borderRadius: vars.radii.sm,
	padding: `${vars.space[1]} ${vars.space[2]}`,
	fontSize: vars.font.size.xs,
	fontWeight: vars.font.weight.medium,
	lineHeight: vars.font.lineHeight.normal,
	maxWidth: "280px",
	zIndex: vars.zIndex.tooltip,
	boxShadow: vars.shadow.sm,
	animationName: fadeIn,
	animationDuration: vars.motion.duration.fast,
	animationTimingFunction: vars.motion.easing.default,
	userSelect: "none"
});
const tooltipArrow = style({ fill: vars.color.text });

//#endregion
//#region src/components/Tooltip/Tooltip.tsx
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 6, showArrow = true, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(TooltipPrimitive.Content, {
	ref,
	sideOffset,
	className: [tooltipContent, className].filter(Boolean).join(" "),
	...props,
	children: [props.children, showArrow && /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: tooltipArrow })]
}) }));
TooltipContent.displayName = "TooltipContent";

//#endregion
//#region src/components/Typography/Typography.css.ts
const h1 = style({
	fontSize: vars.font.size["4xl"],
	fontWeight: vars.font.weight.bold,
	lineHeight: vars.font.lineHeight.tight,
	letterSpacing: vars.font.letterSpacing.tight,
	color: vars.color.text
});
const h2 = style({
	fontSize: vars.font.size["3xl"],
	fontWeight: vars.font.weight.semibold,
	lineHeight: vars.font.lineHeight.tight,
	letterSpacing: vars.font.letterSpacing.tight,
	color: vars.color.text
});
const h3 = style({
	fontSize: vars.font.size["2xl"],
	fontWeight: vars.font.weight.semibold,
	lineHeight: vars.font.lineHeight.tight,
	letterSpacing: vars.font.letterSpacing.tight,
	color: vars.color.text
});
const h4 = style({
	fontSize: vars.font.size.xl,
	fontWeight: vars.font.weight.semibold,
	lineHeight: vars.font.lineHeight.tight,
	letterSpacing: vars.font.letterSpacing.tight,
	color: vars.color.text
});
const p = style({
	fontSize: vars.font.size.md,
	lineHeight: vars.font.lineHeight.relaxed,
	color: vars.color.text
});
const lead = style({
	fontSize: vars.font.size.xl,
	lineHeight: vars.font.lineHeight.relaxed,
	color: vars.color.textMuted
});
const large = style({
	fontSize: vars.font.size.lg,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.text
});
const small = style({
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	lineHeight: vars.font.lineHeight.normal,
	color: vars.color.text
});
const muted = style({
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	lineHeight: vars.font.lineHeight.relaxed
});
const inlineCode = style({
	position: "relative",
	fontFamily: vars.font.family.mono,
	fontSize: "0.875em",
	fontWeight: vars.font.weight.medium,
	backgroundColor: vars.color.secondary,
	borderRadius: vars.radii.sm,
	padding: `${vars.space["0_5"]} ${vars.space["1_5"]}`,
	color: vars.color.text
});
const blockquote = style({
	borderLeft: `3px solid ${vars.color.border}`,
	paddingLeft: vars.space["4"],
	fontStyle: "italic",
	color: vars.color.textMuted,
	lineHeight: vars.font.lineHeight.relaxed
});
const ul = style({
	listStyleType: "disc",
	paddingLeft: vars.space["6"],
	lineHeight: vars.font.lineHeight.relaxed,
	color: vars.color.text
});
const ol = style({
	listStyleType: "decimal",
	paddingLeft: vars.space["6"],
	lineHeight: vars.font.lineHeight.relaxed,
	color: vars.color.text
});
const hr = style({
	border: "none",
	borderTop: `1px solid ${vars.color.border}`,
	margin: `${vars.space["6"]} 0`
});

//#endregion
//#region src/components/Typography/Typography.tsx
function createTypographyComponent(tag, styleClass, displayName) {
	const Component = React.forwardRef(({ className, ...props }, ref) => React.createElement(tag, {
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
* - Monospace font with 1px letter-spacing (forensic/editorial density)
* - Icon is +6px taller than label (xs:14, sm:15, md:17, lg:19)
* - Icon nudged up 2px (translateY(-2px)) for optical alignment
* - lineHeight:0 on both spans, alignItems:center on container
* - Inline-flex so it flows naturally in text or table cells
*/
const flagTagRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		fontFamily: vars.font.family.mono,
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
			destructive: { color: vars.color.destructive },
			warning: { color: vars.color.warning },
			success: { color: vars.color.success },
			primary: { color: vars.color.primary },
			muted: { color: vars.color.textMuted }
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
const flagTagIcon = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	lineHeight: 0,
	transform: "translateY(-2px)",
	selectors: {
		"[data-flag-size=\"xs\"] &": { fontSize: "14px" },
		"[data-flag-size=\"sm\"] &": { fontSize: "15px" },
		"[data-flag-size=\"md\"] &": { fontSize: "17px" },
		"[data-flag-size=\"lg\"] &": { fontSize: "19px" }
	}
});
const flagTagLabel = style({ lineHeight: 0 });

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
const FlagTag = React.forwardRef(({ variant = "destructive", size = "sm", icon = "⚠", label = "FLAG", marginLeft = "8px", className, style, ...props }, ref) => /* @__PURE__ */ jsxs("span", {
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
	children: [/* @__PURE__ */ jsx("span", {
		className: flagTagIcon,
		children: icon
	}), /* @__PURE__ */ jsx("span", {
		className: flagTagLabel,
		children: label
	})]
}));
FlagTag.displayName = "FlagTag";

//#endregion
//#region src/components/SegmentedRatingBar/SegmentedRatingBar.css.ts
/**
* SegmentedRatingBar — Segmented bar graph component
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
const segmentedRatingBarRecipe = recipe({
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
const segmentBase = style({
	display: "block",
	flexShrink: 0,
	borderRadius: "1px"
});
globalStyle(`[data-rating-size="xs"] .${segmentBase}`, {
	width: "4px",
	height: "6px"
});
globalStyle(`[data-rating-size="sm"] .${segmentBase}`, {
	width: "5px",
	height: "8px"
});
globalStyle(`[data-rating-size="md"] .${segmentBase}`, {
	width: "6px",
	height: "10px"
});
globalStyle(`[data-rating-size="lg"] .${segmentBase}`, {
	width: "8px",
	height: "12px"
});
const colorMap = {
	primary: vars.color.primary,
	chart1: vars.color.chart1,
	chart2: vars.color.chart2,
	chart3: vars.color.chart3,
	chart4: vars.color.chart4,
	chart5: vars.color.chart5,
	destructive: vars.color.destructive,
	success: vars.color.success,
	warning: vars.color.warning
};
for (const [name, token] of Object.entries(colorMap)) {
	globalStyle(`[data-rating-color="${name}"] .${segmentBase}[data-lit="true"]`, {
		backgroundColor: token,
		opacity: .85
	});
	globalStyle(`[data-rating-color="${name}"] .${segmentBase}[data-lit="false"]`, {
		backgroundColor: token,
		opacity: .12
	});
}

//#endregion
//#region src/components/SegmentedRatingBar/SegmentedRatingBar.tsx
/**
* SegmentedRatingBar — A segmented bar graph showing coverage across data sources.
*
* Each segment is either "lit" (present in source) or "dim" (absent).
* Segments are flush with no gaps, forming a continuous bar.
*
* @example
* ```tsx
* // Boolean array mode (explicit control per segment)
* <SegmentedRatingBar sources={[true, true, false, true, false, false, true, false, false, false]} />
*
* // Numeric mode (auto-fill left-to-right)
* <SegmentedRatingBar value={4} total={10} />
*
* // Custom color + size
* <SegmentedRatingBar sources={data} color="primary" size="md" />
* ```
*/
const SegmentedRatingBar = React.forwardRef(({ sources, value, total = 10, size = "sm", color = "chart2", className, ...props }, ref) => {
	const segments = sources ?? Array.from({ length: total }, (_, i) => i < (value ?? 0));
	return /* @__PURE__ */ jsx("div", {
		ref,
		role: "meter",
		"aria-label": "Source coverage",
		"aria-valuenow": segments.filter(Boolean).length,
		"aria-valuemin": 0,
		"aria-valuemax": segments.length,
		"data-rating-size": size,
		"data-rating-color": color,
		className: [segmentedRatingBarRecipe({
			size,
			color
		}), className].filter(Boolean).join(" "),
		...props,
		children: segments.map((lit, i) => /* @__PURE__ */ jsx("span", {
			className: segmentBase,
			"data-lit": String(lit)
		}, i))
	});
});
SegmentedRatingBar.displayName = "SegmentedRatingBar";

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
	const [tableRef] = React.useState(() => ({ current: createDataGrid({
		...options,
		state: {},
		onStateChange: () => {}
	}) }));
	const [state, setState] = React.useState(() => tableRef.current.initialState);
	return React.useMemo(() => {
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
const gridContainer = style({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.lg,
	backgroundColor: vars.color.surface,
	overflow: "hidden",
	fontSize: vars.font.size.sm,
	fontFamily: vars.font.family.sans,
	color: vars.color.text,
	selectors: {
		"&[data-borderless]": {
			border: "none",
			borderRadius: 0
		},
		"&[data-transparent]": { backgroundColor: "transparent" },
		"&[data-density=\"compact\"]": { fontSize: vars.font.size.xs },
		"&[data-density=\"editorial\"]": { fontSize: "13px" }
	}
});
const toolbar = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"],
	padding: `${vars.space["2"]} ${vars.space["3"]}`,
	borderBottom: `1px solid ${vars.color.border}`,
	flexWrap: "wrap"
});
const toolbarLeft = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"],
	flex: 1,
	minWidth: 0
});
const toolbarRight = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"]
});
const searchInput = style({
	height: "32px",
	minWidth: "180px",
	maxWidth: "300px",
	padding: `0 ${vars.space["3"]}`,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	backgroundColor: vars.color.input,
	color: vars.color.text,
	fontSize: vars.font.size.sm,
	outline: "none",
	transition: `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	"::placeholder": { color: vars.color.placeholder },
	":focus": {
		borderColor: vars.color.focusRing,
		boxShadow: `0 0 0 1px ${vars.color.focusRing}`
	}
});
const toolbarButton = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: vars.space["1"],
	height: "32px",
	padding: `0 ${vars.space["2_5"]}`,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	backgroundColor: "transparent",
	color: vars.color.text,
	fontSize: vars.font.size.sm,
	fontFamily: vars.font.family.sans,
	cursor: "pointer",
	whiteSpace: "nowrap",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	":hover": { backgroundColor: vars.color.ghostHover },
	":active": { transform: "scale(0.97)" }
});
const selectionInfo = style({
	fontSize: vars.font.size.xs,
	color: vars.color.textMuted,
	whiteSpace: "nowrap"
});
const tableScrollArea = style({
	overflow: "auto",
	position: "relative"
});
const table = style({
	width: "100%",
	borderCollapse: "collapse",
	tableLayout: "fixed"
});
const thead = style({
	position: "sticky",
	top: 0,
	zIndex: 2,
	backgroundColor: vars.color.surface
});
const headerRow = style({ borderBottom: `1px solid ${vars.color.border}` });
const headerCell = style({
	position: "relative",
	height: "40px",
	padding: `0 ${vars.space["3"]}`,
	textAlign: "left",
	verticalAlign: "middle",
	fontWeight: vars.font.weight.medium,
	color: vars.color.text,
	fontSize: vars.font.size.sm,
	whiteSpace: "nowrap",
	userSelect: "none",
	overflow: "hidden",
	textOverflow: "ellipsis",
	backgroundColor: vars.color.surface
});
const headerCellSortable = style({
	cursor: "pointer",
	":hover": { backgroundColor: vars.color.ghostHover }
});
const headerCellContent = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["1"],
	overflow: "hidden"
});
const headerCellText = style({
	overflow: "hidden",
	textOverflow: "ellipsis",
	flex: 1
});
const sortIcon = style({
	flexShrink: 0,
	opacity: .5,
	transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`
});
const sortIconActive = style({
	opacity: 1,
	color: vars.color.primary
});
const sortIndex = style({
	fontSize: "10px",
	color: vars.color.textMuted,
	marginLeft: "-2px"
});
const resizeHandle = style({
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
		backgroundColor: vars.color.border,
		transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`
	},
	":hover::after": { backgroundColor: vars.color.primary },
	selectors: { "&[data-resizing=\"true\"]::after": { backgroundColor: vars.color.primary } }
});
const columnFilterRow = style({ borderBottom: `1px solid ${vars.color.border}` });
const columnFilterCell = style({ padding: `${vars.space["1"]} ${vars.space["2"]}` });
const columnFilterInput = style({
	width: "100%",
	height: "28px",
	padding: `0 ${vars.space["2"]}`,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.sm,
	backgroundColor: vars.color.input,
	color: vars.color.text,
	fontSize: vars.font.size.xs,
	outline: "none",
	"::placeholder": { color: vars.color.placeholder },
	":focus": { borderColor: vars.color.focusRing }
});
const tbody = style({});
const bodyRow = style({
	borderBottom: `1px solid ${vars.color.borderSubtle}`,
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	":hover": { backgroundColor: vars.color.ghostHover },
	selectors: {
		"&[data-selected=\"true\"]": { backgroundColor: `color-mix(in srgb, ${vars.color.primary} 8%, transparent)` },
		"&[data-selected=\"true\"]:hover": { backgroundColor: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)` },
		"&:last-child": { borderBottom: "none" }
	}
});
const bodyCell = style({
	padding: `${vars.space["2"]} ${vars.space["3"]}`,
	verticalAlign: "middle",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap"
});
const bodyCellEditing = style({ padding: `${vars.space["1"]} ${vars.space["2"]}` });
const cellAlignLeft = style({ textAlign: "left" });
const cellAlignCenter = style({ textAlign: "center" });
const cellAlignRight = style({ textAlign: "right" });
const checkboxCell = style({
	width: "40px",
	maxWidth: "40px",
	padding: `0 ${vars.space["2"]}`,
	textAlign: "center"
});
const checkbox = style({
	width: "16px",
	height: "16px",
	appearance: "none",
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.sm,
	backgroundColor: "transparent",
	cursor: "pointer",
	position: "relative",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	":checked": {
		backgroundColor: vars.color.primary,
		borderColor: vars.color.primary
	},
	":focus-visible": {
		outline: `2px solid ${vars.color.focusRing}`,
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
			border: `solid ${vars.color.primaryForeground}`,
			borderWidth: "0 2px 2px 0",
			transform: "rotate(45deg)"
		},
		"&[data-indeterminate=\"true\"]": {
			backgroundColor: vars.color.primary,
			borderColor: vars.color.primary
		},
		"&[data-indeterminate=\"true\"]::after": {
			content: "\"\"",
			position: "absolute",
			left: "3px",
			top: "6px",
			width: "8px",
			height: "2px",
			backgroundColor: vars.color.primaryForeground
		}
	}
});
const expanderButton = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "20px",
	height: "20px",
	border: "none",
	borderRadius: vars.radii.sm,
	backgroundColor: "transparent",
	color: vars.color.textMuted,
	cursor: "pointer",
	padding: 0,
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	":hover": {
		backgroundColor: vars.color.ghostHover,
		color: vars.color.text
	}
});
const expanderIcon = style({
	transition: `transform ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: { "&[data-expanded=\"true\"]": { transform: "rotate(90deg)" } }
});
const pinnedLeft = style({
	position: "sticky",
	left: 0,
	zIndex: 1,
	backgroundColor: vars.color.surface,
	"::after": {
		content: "\"\"",
		position: "absolute",
		top: 0,
		right: "-4px",
		width: "4px",
		height: "100%",
		background: `linear-gradient(to right, ${vars.color.border}, transparent)`
	}
});
const pinnedRight = style({
	position: "sticky",
	right: 0,
	zIndex: 1,
	backgroundColor: vars.color.surface,
	"::before": {
		content: "\"\"",
		position: "absolute",
		top: 0,
		left: "-4px",
		width: "4px",
		height: "100%",
		background: `linear-gradient(to left, ${vars.color.border}, transparent)`
	}
});
const emptyState = style({
	padding: `${vars.space["12"]} ${vars.space["4"]}`,
	textAlign: "center",
	color: vars.color.textMuted,
	fontSize: vars.font.size.sm
});
const shimmer = keyframes({
	"0%": { backgroundPosition: "-200% 0" },
	"100%": { backgroundPosition: "200% 0" }
});
const loadingRow = style({
	height: "41px",
	borderBottom: `1px solid ${vars.color.borderSubtle}`
});
const loadingCell = style({ padding: `${vars.space["2"]} ${vars.space["3"]}` });
const loadingSkeleton = style({
	height: "16px",
	borderRadius: vars.radii.sm,
	background: `linear-gradient(90deg, ${vars.color.ghostHover} 25%, color-mix(in srgb, ${vars.color.ghostHover} 50%, transparent) 50%, ${vars.color.ghostHover} 75%)`,
	backgroundSize: "200% 100%",
	animation: `${shimmer} 1.5s infinite`
});
const footer = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: `${vars.space["2"]} ${vars.space["3"]}`,
	borderTop: `1px solid ${vars.color.border}`,
	gap: vars.space["3"],
	flexWrap: "wrap"
});
const footerLeft = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"],
	fontSize: vars.font.size.xs,
	color: vars.color.textMuted
});
const footerRight = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["1"]
});
const paginationButton = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "32px",
	height: "32px",
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	backgroundColor: "transparent",
	color: vars.color.text,
	cursor: "pointer",
	fontSize: vars.font.size.sm,
	fontFamily: vars.font.family.sans,
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	":hover": { backgroundColor: vars.color.ghostHover },
	":disabled": {
		opacity: .5,
		cursor: "not-allowed",
		pointerEvents: "none"
	},
	selectors: { "&[data-active=\"true\"]": {
		backgroundColor: vars.color.primary,
		color: vars.color.primaryForeground,
		borderColor: vars.color.primary
	} }
});
const pageSizeSelect = style({
	height: "32px",
	width: "auto",
	minWidth: "64px",
	fontSize: vars.font.size.sm
});
const paginationInfo = style({
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	whiteSpace: "nowrap",
	padding: `0 ${vars.space["2"]}`
});
const editInput = style({
	width: "100%",
	height: "28px",
	padding: `0 ${vars.space["2"]}`,
	border: `1px solid ${vars.color.focusRing}`,
	borderRadius: vars.radii.sm,
	backgroundColor: vars.color.input,
	color: vars.color.text,
	fontSize: vars.font.size.sm,
	outline: "none",
	boxShadow: `0 0 0 1px ${vars.color.focusRing}`
});
const visibilityPanel = style({
	position: "absolute",
	top: "100%",
	right: 0,
	zIndex: 10,
	minWidth: "180px",
	padding: vars.space["2"],
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.lg,
	backgroundColor: vars.color.surfaceElevated,
	boxShadow: vars.shadow.lg,
	marginTop: vars.space["1"]
});
const visibilityItem = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["2"],
	padding: `${vars.space["1_5"]} ${vars.space["2"]}`,
	borderRadius: vars.radii.sm,
	fontSize: vars.font.size.sm,
	cursor: "pointer",
	":hover": { backgroundColor: vars.color.ghostHover }
});
const groupedRow = style({
	fontWeight: vars.font.weight.medium,
	backgroundColor: `color-mix(in srgb, ${vars.color.secondary} 30%, transparent)`
});
const depthIndent = style({ display: "inline-block" });
const statusBar = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["4"],
	padding: `${vars.space["1_5"]} ${vars.space["3"]}`,
	borderTop: `1px solid ${vars.color.border}`,
	fontSize: vars.font.size.xs,
	color: vars.color.textMuted,
	backgroundColor: `color-mix(in srgb, ${vars.color.secondary} 20%, transparent)`
});
const statusBarItem = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["1"]
});
const statusBarLabel = style({ fontWeight: vars.font.weight.medium });
globalStyle(`${gridContainer}[data-header-border="thick"] ${headerRow}`, {
	borderBottomWidth: "2px",
	borderBottomColor: `color-mix(in srgb, ${vars.color.primary} 25%, transparent)`
});
globalStyle(`${gridContainer}[data-header-border="none"] ${headerRow}`, { borderBottom: "none" });
globalStyle(`${gridContainer}[data-row-separator="subtle"] ${bodyRow}`, { borderBottomColor: "rgba(255,255,255,0.04)" });
globalStyle(`${gridContainer}[data-row-separator="none"] ${bodyRow}`, { borderBottom: "none" });
globalStyle(`${gridContainer}[data-no-row-hover] ${bodyRow}:hover`, { backgroundColor: "transparent" });
globalStyle(`${gridContainer}[data-transparent] ${thead}`, { backgroundColor: "transparent" });
globalStyle(`${gridContainer}[data-transparent] ${headerCell}`, { backgroundColor: "transparent" });
globalStyle(`${gridContainer}[data-borderless] ${toolbar}`, { borderBottom: "none" });
globalStyle(`${gridContainer}[data-borderless] ${footer}`, { borderTop: `1px solid ${vars.color.borderSubtle}` });
globalStyle(`${gridContainer}[data-borderless] ${statusBar}`, {
	borderTop: `1px solid ${vars.color.borderSubtle}`,
	backgroundColor: "transparent"
});
globalStyle(`${gridContainer}[data-density="compact"] ${headerCell}`, {
	height: "32px",
	padding: `0 ${vars.space["2"]}`,
	fontSize: vars.font.size.xs
});
globalStyle(`${gridContainer}[data-density="compact"] ${bodyCell}`, { padding: `${vars.space["1"]} ${vars.space["2"]}` });
globalStyle(`${gridContainer}[data-density="compact"] ${checkboxCell}`, {
	width: "32px",
	maxWidth: "32px"
});
globalStyle(`${gridContainer}[data-density="editorial"] ${headerCell}`, {
	height: "32px",
	padding: `0 ${vars.space["3"]}`,
	fontFamily: vars.font.family.mono,
	fontSize: "10px",
	letterSpacing: "1px",
	textTransform: "uppercase",
	color: vars.color.chart2,
	fontWeight: vars.font.weight.normal
});
globalStyle(`${gridContainer}[data-density="editorial"] ${bodyCell}`, {
	padding: `6px ${vars.space["3"]}`,
	fontSize: "13px",
	color: vars.color.textMuted
});
globalStyle(`${gridContainer}[data-density="editorial"] ${bodyRow}`, { borderBottomColor: "rgba(255,255,255,0.04)" });
globalStyle(`${gridContainer}[data-density="editorial"] ${bodyRow}:hover`, { backgroundColor: "rgba(59,130,246,0.04)" });
globalStyle(`${gridContainer}[data-density="editorial"] ${footer}`, { fontSize: vars.font.size.xs });
globalStyle(`${gridContainer}[data-density="editorial"] ${paginationButton}`, {
	width: "28px",
	height: "28px",
	fontSize: vars.font.size.xs
});
globalStyle(`${gridContainer}[data-density="editorial"] ${pageSizeSelect}`, {
	height: "28px",
	fontSize: vars.font.size.xs
});
globalStyle(`${gridContainer}[data-density="editorial"] ${paginationInfo}`, { fontSize: vars.font.size.xs });
globalStyle(`${gridContainer}[data-density="editorial"] ${searchInput}`, {
	height: "28px",
	fontSize: vars.font.size.xs
});
globalStyle(`${gridContainer}[data-density="editorial"] ${toolbarButton}`, {
	height: "28px",
	fontSize: vars.font.size.xs
});
globalStyle(`${gridContainer}[data-density="editorial"] ${checkbox}`, {
	width: "14px",
	height: "14px"
});
globalStyle(`${gridContainer}[data-density="editorial"] ${checkboxCell}`, {
	width: "32px",
	maxWidth: "32px"
});

//#endregion
//#region src/components/DataGrid/DataGrid.tsx
function SortIndicator({ direction, index, showIndex }) {
	if (!direction) return /* @__PURE__ */ jsxs("svg", {
		className: sortIcon,
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		children: [/* @__PURE__ */ jsx("path", {
			d: "M7 3L10 6.5H4L7 3Z",
			fill: "currentColor",
			opacity: "0.4"
		}), /* @__PURE__ */ jsx("path", {
			d: "M7 11L4 7.5H10L7 11Z",
			fill: "currentColor",
			opacity: "0.4"
		})]
	});
	return /* @__PURE__ */ jsxs("span", {
		style: {
			display: "inline-flex",
			alignItems: "center"
		},
		children: [/* @__PURE__ */ jsx("svg", {
			className: `${sortIcon} ${sortIconActive}`,
			width: "14",
			height: "14",
			viewBox: "0 0 14 14",
			fill: "none",
			children: direction === "asc" ? /* @__PURE__ */ jsx("path", {
				d: "M7 3L10 7.5H4L7 3Z",
				fill: "currentColor"
			}) : /* @__PURE__ */ jsx("path", {
				d: "M7 11L4 6.5H10L7 11Z",
				fill: "currentColor"
			})
		}), showIndex && index >= 0 && /* @__PURE__ */ jsx("span", {
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
	return /* @__PURE__ */ jsx("div", {
		className: resizeHandle,
		"data-resizing": isResizing,
		onMouseDown
	});
}
function SelectAllCheckbox({ table }) {
	const isAll = table.getIsAllPageRowsSelected();
	const isSome = table.getIsSomePageRowsSelected();
	return /* @__PURE__ */ jsx("input", {
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
	return /* @__PURE__ */ jsx("input", {
		type: "checkbox",
		className: checkbox,
		checked: row.getIsSelected(),
		onChange: () => row.toggleSelected(),
		"aria-label": `Select row ${row.id}`
	});
}
function ColumnVisibilityToggle({ table }) {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef(null);
	React.useEffect(() => {
		if (!open) return;
		const handler = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		style: { position: "relative" },
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: toolbarButton,
			onClick: () => setOpen(!open),
			"aria-label": "Toggle column visibility",
			children: [/* @__PURE__ */ jsx("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				children: /* @__PURE__ */ jsx("path", {
					d: "M1 3.5h12M1 7h12M1 10.5h12",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})
			}), "Columns"]
		}), open && /* @__PURE__ */ jsx("div", {
			className: visibilityPanel,
			children: table.getAllLeafColumns().map((col) => /* @__PURE__ */ jsxs("label", {
				className: visibilityItem,
				children: [/* @__PURE__ */ jsx("input", {
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
	return /* @__PURE__ */ jsxs("th", {
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
		children: [/* @__PURE__ */ jsxs("div", {
			className: headerCellContent,
			children: [/* @__PURE__ */ jsx("span", {
				className: headerCellText,
				children: headerContent
			}), canSort && /* @__PURE__ */ jsx(SortIndicator, {
				direction: isSorted,
				index: column.getSortIndex(),
				showIndex: showMultiSortIndex
			})]
		}), canResize && /* @__PURE__ */ jsx(ResizeHandle, {
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
	else content = /* @__PURE__ */ jsx(DefaultCellEditor, {
		value,
		onSave: (newValue) => {
			table.options.onCellEdit?.(row.id, column.id, newValue);
			table.stopEditing();
		},
		onCancel: () => table.stopEditing()
	});
	else if (column.cell) content = column.cell(cellCtx);
	else content = row.renderValue(column.id)?.toString() ?? "";
	return /* @__PURE__ */ jsx("td", {
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
	const [editValue, setEditValue] = React.useState(String(value ?? ""));
	const inputRef = React.useRef(null);
	React.useEffect(() => {
		inputRef.current?.focus();
		inputRef.current?.select();
	}, []);
	return /* @__PURE__ */ jsx("input", {
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
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: expanderButton,
		onClick: (e) => {
			e.stopPropagation();
			row.toggleExpanded();
		},
		"aria-label": row.getIsExpanded() ? "Collapse row" : "Expand row",
		children: /* @__PURE__ */ jsx("svg", {
			className: expanderIcon,
			"data-expanded": row.getIsExpanded(),
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			children: /* @__PURE__ */ jsx("path", {
				d: "M4 2L8 6L4 10",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		})
	});
}
function LoadingRows({ columnCount, rowCount }) {
	return /* @__PURE__ */ jsx(Fragment, { children: Array.from({ length: rowCount }).map((_, rowIdx) => /* @__PURE__ */ jsx("tr", {
		className: loadingRow,
		children: Array.from({ length: columnCount }).map((_, colIdx) => /* @__PURE__ */ jsx("td", {
			className: loadingCell,
			children: /* @__PURE__ */ jsx("div", {
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
	return /* @__PURE__ */ jsxs("div", {
		className: statusBar,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ jsx("span", {
						className: statusBarLabel,
						children: "Rows:"
					}),
					" ",
					total
				]
			}),
			filtered !== total && /* @__PURE__ */ jsxs("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ jsx("span", {
						className: statusBarLabel,
						children: "Filtered:"
					}),
					" ",
					filtered
				]
			}),
			selected > 0 && /* @__PURE__ */ jsxs("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ jsx("span", {
						className: statusBarLabel,
						children: "Selected:"
					}),
					" ",
					selected
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: statusBarItem,
				children: [
					/* @__PURE__ */ jsx("span", {
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
	return /* @__PURE__ */ jsxs("div", {
		className: footer,
		children: [/* @__PURE__ */ jsxs("div", {
			className: footerLeft,
			children: [selected > 0 && /* @__PURE__ */ jsxs("span", { children: [
				selected,
				" of ",
				totalRows,
				" row(s) selected"
			] }), selected === 0 && /* @__PURE__ */ jsxs("span", { children: [totalRows, " row(s)"] })]
		}), /* @__PURE__ */ jsxs("div", {
			className: footerRight,
			children: [
				/* @__PURE__ */ jsx("span", {
					className: paginationInfo,
					children: "Rows per page:"
				}),
				/* @__PURE__ */ jsxs(Select, {
					value: String(pageSize),
					onValueChange: (val) => table.setPageSize(() => Number(val)),
					children: [/* @__PURE__ */ jsx(SelectTrigger, {
						className: pageSizeSelect,
						children: /* @__PURE__ */ jsx(SelectValue, {})
					}), /* @__PURE__ */ jsx(SelectContent, { children: pageSizeOptions.map((size) => /* @__PURE__ */ jsx(SelectItem, {
						value: String(size),
						children: size
					}, size)) })]
				}),
				/* @__PURE__ */ jsxs("span", {
					className: paginationInfo,
					children: [
						"Page ",
						pageIndex + 1,
						" of ",
						pageCount
					]
				}),
				/* @__PURE__ */ jsx("button", {
					className: paginationButton,
					onClick: () => table.firstPage(),
					disabled: !table.getCanPreviousPage(),
					"aria-label": "First page",
					children: "⟨⟨"
				}),
				/* @__PURE__ */ jsx("button", {
					className: paginationButton,
					onClick: () => table.previousPage(),
					disabled: !table.getCanPreviousPage(),
					"aria-label": "Previous page",
					children: "⟨"
				}),
				Array.from({ length: endPage - startPage }).map((_, i) => {
					const page = startPage + i;
					return /* @__PURE__ */ jsx("button", {
						className: paginationButton,
						"data-active": page === pageIndex,
						onClick: () => table.setPageIndex(() => page),
						children: page + 1
					}, page);
				}),
				/* @__PURE__ */ jsx("button", {
					className: paginationButton,
					onClick: () => table.nextPage(),
					disabled: !table.getCanNextPage(),
					"aria-label": "Next page",
					children: "⟩"
				}),
				/* @__PURE__ */ jsx("button", {
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
	return /* @__PURE__ */ jsxs("div", {
		className: [gridContainer, className].filter(Boolean).join(" "),
		style: containerStyle,
		"data-borderless": borderless || void 0,
		"data-density": density !== "default" ? density : void 0,
		"data-header-border": headerBorder !== "thin" ? headerBorder : void 0,
		"data-row-separator": rowSeparator !== "full" ? rowSeparator : void 0,
		"data-transparent": transparent || void 0,
		"data-no-row-hover": noRowHover || void 0,
		children: [
			showToolbar && /* @__PURE__ */ jsxs("div", {
				className: toolbar,
				children: [/* @__PURE__ */ jsxs("div", {
					className: toolbarLeft,
					children: [
						customToolbarLeft,
						enableGlobalFilter && /* @__PURE__ */ jsx("input", {
							className: searchInput,
							placeholder: "Search all columns…",
							value: table$2.getState().globalFilter ?? "",
							onChange: (e) => table$2.setGlobalFilter(e.target.value)
						}),
						enableSelection && Object.keys(table$2.getState().rowSelection).length > 0 && /* @__PURE__ */ jsxs("span", {
							className: selectionInfo,
							children: [Object.keys(table$2.getState().rowSelection).length, " selected"]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: toolbarRight,
					children: [customToolbarRight, enableColumnVisibility && /* @__PURE__ */ jsx(ColumnVisibilityToggle, { table: table$2 })]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: tableScrollArea,
				style: height ? { maxHeight: height } : void 0,
				children: /* @__PURE__ */ jsxs("table", {
					className: table,
					role: "grid",
					children: [/* @__PURE__ */ jsxs("thead", {
						className: thead,
						children: [headerGroups.map((headerGroup) => /* @__PURE__ */ jsxs("tr", {
							className: headerRow,
							children: [enableSelection && /* @__PURE__ */ jsx("th", {
								className: `${headerCell} ${checkboxCell}`,
								children: /* @__PURE__ */ jsx(SelectAllCheckbox, { table: table$2 })
							}), headerGroup.headers.filter((col) => col.getIsVisible()).map((column) => /* @__PURE__ */ jsx(HeaderCell, {
								column,
								table: table$2,
								showMultiSortIndex: hasMultiSort
							}, column.id))]
						}, headerGroup.id)), showColumnFilters && /* @__PURE__ */ jsxs("tr", {
							className: columnFilterRow,
							children: [enableSelection && /* @__PURE__ */ jsx("th", { className: checkboxCell }), visibleColumns.map((column) => /* @__PURE__ */ jsx("th", {
								className: columnFilterCell,
								children: column.getCanFilter() ? /* @__PURE__ */ jsx("input", {
									className: columnFilterInput,
									placeholder: `Filter ${typeof column.header === "string" ? column.header : column.id}…`,
									value: String(column.getFilterValue() ?? ""),
									onChange: (e) => column.setFilterValue(e.target.value || void 0)
								}) : null
							}, column.id))]
						})]
					}), /* @__PURE__ */ jsx("tbody", {
						className: tbody,
						children: loading ? /* @__PURE__ */ jsx(LoadingRows, {
							columnCount: totalColumnCount,
							rowCount: loadingRowCount
						}) : rowModel.rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							className: emptyState,
							colSpan: totalColumnCount,
							children: emptyMessage
						}) }) : /* @__PURE__ */ jsx(RenderRows, {
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
			showStatusBar && /* @__PURE__ */ jsx(StatusBar, { table: table$2 }),
			showPaginationFooter && /* @__PURE__ */ jsx(PaginationFooter, { table: table$2 })
		]
	});
}
function RenderRows({ rows, visibleColumns, table, enableSelection, enableExpanding, onRowClick, onRowDoubleClick, depth = 0 }) {
	return /* @__PURE__ */ jsx(Fragment, { children: rows.map((row) => /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsxs("tr", {
		className: bodyRow,
		"data-selected": row.getIsSelected(),
		onClick: onRowClick ? () => onRowClick(row) : void 0,
		onDoubleClick: onRowDoubleClick ? () => onRowDoubleClick(row) : void 0,
		style: onRowClick || onRowDoubleClick ? { cursor: "pointer" } : void 0,
		children: [enableSelection && /* @__PURE__ */ jsx("td", {
			className: `${bodyCell} ${checkboxCell}`,
			children: /* @__PURE__ */ jsx(RowCheckbox, { row })
		}), visibleColumns.map((column, colIdx) => {
			if (colIdx === 0 && enableExpanding) return /* @__PURE__ */ jsx("td", {
				className: [bodyCell, column.cellClassName ?? ""].filter(Boolean).join(" "),
				style: { width: column.getSize() },
				children: /* @__PURE__ */ jsxs("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "4px"
					},
					children: [
						/* @__PURE__ */ jsx("span", {
							className: depthIndent,
							style: { width: depth * 20 }
						}),
						/* @__PURE__ */ jsx(ExpanderCell, { row }),
						/* @__PURE__ */ jsx("span", {
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
			return /* @__PURE__ */ jsx(BodyCell, {
				row,
				column,
				table
			}, column.id);
		})]
	}), enableExpanding && row.getIsExpanded() && row.subRows.length > 0 && /* @__PURE__ */ jsx(RenderRows, {
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
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AlertTitle, AspectRatio, Avatar, AvatarFallback, AvatarImage, Badge, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, DataGrid, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, FieldMessage, FlagTag, HoverCard, HoverCardContent, HoverCardTrigger, Icons, Input, InputGroup, InputGroupAddon, InputGroupToolbar, Kbd, Label, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, ScrollArea, ScrollBar, SegmentedRatingBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Skeleton, Slider, Spinner, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableWrapper, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toggle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TypographyBlockquote, TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyHr, TypographyInlineCode, TypographyLarge, TypographyLead, TypographyMuted, TypographyOl, TypographyP, TypographySmall, TypographyUl, createDataGrid, inputGroupInput as inputGroupInputClass, useDataGrid };
//# sourceMappingURL=index.mjs.map