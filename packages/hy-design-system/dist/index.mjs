import React, { forwardRef, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { recipe } from "@vanilla-extract/recipes";
import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@hydrotik/tokens";
import { jsx, jsxs } from "react/jsx-runtime";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as ToastPrimitive from "@radix-ui/react-toast";

//#region src/components/Button/Button.css.ts
const spin = keyframes({ to: { transform: "rotate(360deg)" } });
const spinner = style({
	display: "inline-block",
	width: "1em",
	height: "1em",
	border: `2px solid currentColor`,
	borderTopColor: "transparent",
	borderRadius: vars.radii.full,
	animation: `${spin} 0.6s linear infinite`,
	flexShrink: 0
});
const buttonRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: vars.space["2"],
		fontFamily: vars.font.family.sans,
		fontWeight: vars.font.weight.medium,
		letterSpacing: vars.font.letterSpacing.wide,
		borderRadius: vars.radii.md,
		border: "1px solid transparent",
		cursor: "pointer",
		textDecoration: "none",
		whiteSpace: "nowrap",
		flexShrink: 0,
		transition: [
			`background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
			`opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`
		].join(", "),
		selectors: {
			"&:focus-visible": {
				outline: `2px solid ${vars.color.focusRing}`,
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
				backgroundColor: vars.color.primary,
				color: vars.color.primaryForeground,
				borderColor: vars.color.primary,
				boxShadow: `0 1px 2px rgba(0,0,0,0.3)`,
				selectors: {
					"&:hover:not(:disabled)": { filter: "brightness(1.1)" },
					"&:active:not(:disabled)": { filter: "brightness(0.95)" }
				}
			},
			secondary: {
				backgroundColor: vars.color.secondary,
				color: vars.color.secondaryForeground,
				borderColor: vars.color.border,
				selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.color.surfaceElevated } }
			},
			outline: {
				backgroundColor: "transparent",
				color: vars.color.text,
				borderColor: vars.color.border,
				selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.color.ghostHover } }
			},
			ghost: {
				backgroundColor: "transparent",
				color: vars.color.text,
				borderColor: "transparent",
				selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.color.ghostHover } }
			},
			destructive: {
				backgroundColor: vars.color.destructive,
				color: vars.color.destructiveForeground,
				borderColor: vars.color.destructive,
				selectors: { "&:hover:not(:disabled)": { filter: "brightness(1.1)" } }
			}
		},
		size: {
			sm: {
				height: vars.space["8"],
				paddingLeft: vars.space["3"],
				paddingRight: vars.space["3"],
				fontSize: vars.font.size.sm
			},
			md: {
				height: vars.space["10"],
				paddingLeft: vars.space["4"],
				paddingRight: vars.space["4"],
				fontSize: vars.font.size.sm
			},
			lg: {
				height: vars.space["12"],
				paddingLeft: vars.space["6"],
				paddingRight: vars.space["6"],
				fontSize: vars.font.size.md
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
const Button = forwardRef(({ variant = "primary", size = "md", loading = false, fullWidth = false, asChild = false, className, children, disabled, ...props }, ref) => {
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
//#region src/components/FieldMessage/FieldMessage.css.ts
const fieldMessageRecipe = recipe({
	base: {
		display: "flex",
		alignItems: "center",
		gap: vars.space["1"],
		fontSize: vars.font.size.xs,
		lineHeight: vars.font.lineHeight.normal
	},
	variants: { intent: {
		error: { color: vars.color.destructive },
		help: { color: vars.color.textMuted },
		success: { color: vars.color.success }
	} },
	defaultVariants: { intent: "help" }
});

//#endregion
//#region src/components/FieldMessage/FieldMessage.tsx
const FieldMessage = React.forwardRef(({ intent = "help", className, children, ...props }, ref) => /* @__PURE__ */ jsx("p", {
	ref,
	className: [fieldMessageRecipe({ intent }), className].filter(Boolean).join(" "),
	role: intent === "error" ? "alert" : void 0,
	...props,
	children
}));
FieldMessage.displayName = "FieldMessage";

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
const inputRecipe = recipe({
	base: {
		width: "100%",
		backgroundColor: vars.color.input,
		color: vars.color.text,
		border: `1px solid ${vars.color.border}`,
		borderRadius: vars.radii.md,
		fontFamily: vars.font.family.sans,
		fontSize: vars.font.size.sm,
		lineHeight: vars.font.lineHeight.normal,
		transition: [`border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`, `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`].join(", "),
		selectors: {
			"&::placeholder": { color: vars.color.placeholder },
			"&:hover:not(:disabled):not([aria-invalid=\"true\"])": { borderColor: vars.color.textMuted },
			"&:focus-visible": {
				outline: "none",
				borderColor: vars.color.focusRing,
				boxShadow: `0 0 0 2px ${vars.color.focusRing}30`
			},
			"&:disabled": {
				opacity: "0.5",
				cursor: "not-allowed",
				backgroundColor: vars.color.surface
			},
			"&[aria-invalid=\"true\"]": {
				borderColor: vars.color.destructive,
				boxShadow: `0 0 0 2px ${vars.color.destructive}30`
			}
		}
	},
	variants: { size: {
		sm: {
			height: vars.space["8"],
			paddingLeft: vars.space["3"],
			paddingRight: vars.space["3"],
			fontSize: vars.font.size.xs
		},
		md: {
			height: vars.space["10"],
			paddingLeft: vars.space["3"],
			paddingRight: vars.space["3"],
			fontSize: vars.font.size.sm
		},
		lg: {
			height: vars.space["12"],
			paddingLeft: vars.space["4"],
			paddingRight: vars.space["4"],
			fontSize: vars.font.size.md
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
//#region src/components/Textarea/Textarea.css.ts
const textarea = style({
	width: "100%",
	minHeight: "100px",
	padding: `${vars.space["3"]} ${vars.space["3"]}`,
	backgroundColor: vars.color.input,
	color: vars.color.text,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	fontFamily: vars.font.family.sans,
	fontSize: vars.font.size.sm,
	lineHeight: vars.font.lineHeight.relaxed,
	resize: "vertical",
	transition: `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&::placeholder": { color: vars.color.placeholder },
		"&:hover:not(:disabled)": { borderColor: vars.color.textMuted },
		"&:focus-visible": {
			outline: "none",
			borderColor: vars.color.focusRing,
			boxShadow: `0 0 0 2px ${vars.color.focusRing}30`
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		},
		"&[aria-invalid=\"true\"]": {
			borderColor: vars.color.destructive,
			boxShadow: `0 0 0 2px ${vars.color.destructive}30`
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
//#region src/components/Card/Card.css.ts
const cardRecipe = recipe({
	base: {
		backgroundColor: vars.color.surface,
		border: `1px solid ${vars.color.border}`,
		borderRadius: vars.radii.lg,
		overflow: "hidden"
	},
	variants: {
		elevation: {
			flat: {},
			raised: { boxShadow: vars.shadow.sm },
			elevated: {
				backgroundColor: vars.color.surfaceElevated,
				boxShadow: vars.shadow.md
			}
		},
		padding: {
			none: {},
			sm: { padding: vars.space["4"] },
			md: { padding: vars.space["6"] },
			lg: { padding: vars.space["8"] }
		}
	},
	defaultVariants: {
		elevation: "raised",
		padding: "md"
	}
});
const cardHeader = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.space["1_5"],
	paddingBottom: vars.space["4"],
	borderBottom: `1px solid ${vars.color.borderSubtle}`,
	marginBottom: vars.space["4"]
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
const cardFooter = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space["3"],
	paddingTop: vars.space["4"],
	borderTop: `1px solid ${vars.color.borderSubtle}`,
	marginTop: vars.space["4"]
});

//#endregion
//#region src/components/Card/Card.tsx
const Card = React.forwardRef(({ elevation = "raised", padding = "md", className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [cardRecipe({
		elevation,
		padding
	}), className].filter(Boolean).join(" "),
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
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: [cardFooter, className].filter(Boolean).join(" "),
	...props
}));
CardFooter.displayName = "CardFooter";
const CardContent = React.forwardRef((props, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	...props
}));
CardContent.displayName = "CardContent";

//#endregion
//#region src/components/Badge/Badge.css.ts
const badgeRecipe = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		borderRadius: vars.radii.full,
		fontWeight: vars.font.weight.medium,
		fontFamily: vars.font.family.sans,
		whiteSpace: "nowrap",
		lineHeight: "1",
		border: "1px solid transparent"
	},
	variants: {
		variant: {
			default: {
				backgroundColor: vars.color.secondary,
				color: vars.color.secondaryForeground,
				borderColor: vars.color.border
			},
			primary: {
				backgroundColor: `${vars.color.primary}20`,
				color: vars.color.primary,
				borderColor: `${vars.color.primary}40`
			},
			destructive: {
				backgroundColor: `${vars.color.destructive}20`,
				color: vars.color.destructive,
				borderColor: `${vars.color.destructive}40`
			},
			success: {
				backgroundColor: `${vars.color.success}20`,
				color: vars.color.success,
				borderColor: `${vars.color.success}40`
			},
			warning: {
				backgroundColor: `${vars.color.warning}20`,
				color: vars.color.warning,
				borderColor: `${vars.color.warning}40`
			},
			outline: {
				backgroundColor: "transparent",
				color: vars.color.text,
				borderColor: vars.color.border
			}
		},
		size: {
			sm: {
				fontSize: vars.font.size.xs,
				padding: `2px ${vars.space["2"]}`
			},
			md: {
				fontSize: vars.font.size.xs,
				padding: `${vars.space["0_5"]} ${vars.space["2_5"]}`
			},
			lg: {
				fontSize: vars.font.size.sm,
				padding: `${vars.space["1"]} ${vars.space["3"]}`
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
const Badge = React.forwardRef(({ variant = "default", size = "md", className, ...props }, ref) => /* @__PURE__ */ jsx("span", {
	ref,
	className: [badgeRecipe({
		variant,
		size
	}), className].filter(Boolean).join(" "),
	...props
}));
Badge.displayName = "Badge";

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
//#region src/components/Tabs/Tabs.css.ts
const tabsList = style({
	display: "inline-flex",
	alignItems: "center",
	backgroundColor: vars.color.secondary,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	padding: vars.space["1"],
	gap: vars.space["0_5"]
});
const tabsTrigger = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	paddingTop: vars.space["1_5"],
	paddingBottom: vars.space["1_5"],
	paddingLeft: vars.space["4"],
	paddingRight: vars.space["4"],
	borderRadius: vars.radii.sm,
	fontSize: vars.font.size.sm,
	fontWeight: vars.font.weight.medium,
	color: vars.color.textMuted,
	cursor: "pointer",
	border: "none",
	backgroundColor: "transparent",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": {
			color: vars.color.text,
			backgroundColor: vars.color.ghostHover
		},
		"&[data-state=\"active\"]": {
			color: vars.color.text,
			backgroundColor: vars.color.surfaceElevated,
			boxShadow: vars.shadow.sm
		},
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "2px"
		},
		"&:disabled": {
			opacity: "0.4",
			cursor: "not-allowed"
		}
	}
});
const tabsContent = style({
	marginTop: vars.space["4"],
	selectors: { "&:focus-visible": {
		outline: `2px solid ${vars.color.focusRing}`,
		outlineOffset: "2px",
		borderRadius: vars.radii.sm
	} }
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
//#region src/components/Dialog/Dialog.css.ts
const overlayShow = keyframes({
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
const dialogOverlay = style({
	backgroundColor: vars.color.overlay,
	position: "fixed",
	inset: 0,
	zIndex: vars.zIndex.overlay,
	animation: `${overlayShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
	selectors: { "&[data-state=\"closed\"]": { animationDirection: "reverse" } }
});
const dialogContent = style({
	backgroundColor: vars.color.surfaceOverlay,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.xl,
	boxShadow: vars.shadow.xl,
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90vw",
	maxWidth: "560px",
	maxHeight: "85vh",
	overflowY: "auto",
	padding: vars.space["6"],
	zIndex: vars.zIndex.modal,
	animation: `${contentShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
	selectors: { "&:focus-visible": { outline: "none" } }
});
const dialogHeader = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.space["1_5"],
	marginBottom: vars.space["5"]
});
const dialogFooter = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: vars.space["3"],
	marginTop: vars.space["6"],
	paddingTop: vars.space["4"],
	borderTop: `1px solid ${vars.color.borderSubtle}`
});
const dialogTitle = style({
	fontSize: vars.font.size.xl,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.text,
	lineHeight: vars.font.lineHeight.tight,
	margin: 0
});
const dialogDescription = style({
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	lineHeight: vars.font.lineHeight.normal,
	margin: 0
});
const dialogClose = style({
	position: "absolute",
	top: vars.space["4"],
	right: vars.space["4"],
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: vars.space["8"],
	height: vars.space["8"],
	borderRadius: vars.radii.sm,
	color: vars.color.textMuted,
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&:hover": {
			color: vars.color.text,
			backgroundColor: vars.color.ghostHover
		},
		"&:focus-visible": {
			outline: `2px solid ${vars.color.focusRing}`,
			outlineOffset: "2px"
		}
	}
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
const DialogContent = React.forwardRef(({ className, children, showClose = true, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: [dialogContent, className].filter(Boolean).join(" "),
	...props,
	children: [children, showClose && /* @__PURE__ */ jsx(DialogPrimitive.Close, {
		className: dialogClose,
		"aria-label": "Close dialog",
		children: /* @__PURE__ */ jsx("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 15 15",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("path", {
				d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
				fill: "currentColor"
			})
		})
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
//#region src/components/Select/Select.css.ts
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
const selectTrigger = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: vars.space[2],
		width: "100%",
		borderRadius: vars.radii.md,
		border: `1px solid ${vars.color.border}`,
		backgroundColor: vars.color.surface,
		color: vars.color.text,
		fontFamily: vars.font.family.sans,
		fontSize: vars.font.size.sm,
		lineHeight: vars.font.lineHeight.normal,
		cursor: "default",
		outline: "none",
		transition: `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
		selectors: {
			"&:hover": { borderColor: vars.color.primary },
			"&:focus": {
				borderColor: vars.color.primary,
				boxShadow: `0 0 0 3px ${vars.color.ghostHover}`
			},
			"&[data-placeholder]": { color: vars.color.textMuted },
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
				padding: `0 ${vars.space[2]}`,
				fontSize: vars.font.size.xs
			},
			md: {
				height: "40px",
				padding: `0 ${vars.space[3]}`
			},
			lg: {
				height: "48px",
				padding: `0 ${vars.space[4]}`,
				fontSize: vars.font.size.md
			}
		},
		isError: { true: {
			borderColor: vars.color.destructive,
			selectors: { "&:focus": {
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
	backgroundColor: vars.color.surface,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	boxShadow: vars.shadow.lg,
	zIndex: vars.zIndex.dropdown,
	minWidth: "var(--radix-select-trigger-width)",
	maxHeight: "var(--radix-select-content-available-height)",
	animationDuration: vars.motion.duration.normal,
	animationTimingFunction: vars.motion.easing.default,
	selectors: {
		"&[data-state=\"open\"][data-side=\"bottom\"]": { animationName: slideDownAndFade$1 },
		"&[data-state=\"open\"][data-side=\"top\"]": { animationName: slideUpAndFade$1 }
	}
});
const selectViewport = style({ padding: vars.space[1] });
const selectItem = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space[2],
	padding: `${vars.space[2]} ${vars.space[3]}`,
	borderRadius: vars.radii.sm,
	fontSize: vars.font.size.sm,
	color: vars.color.text,
	cursor: "default",
	userSelect: "none",
	position: "relative",
	outline: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": {
			backgroundColor: vars.color.ghostHover,
			color: vars.color.primary
		},
		"&[data-disabled]": {
			opacity: .5,
			pointerEvents: "none"
		},
		"&[data-state=\"checked\"]": { fontWeight: vars.font.weight.medium }
	}
});
const selectItemIndicator = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: vars.space[4],
	flexShrink: 0,
	color: vars.color.primary
});
const selectLabel = style({
	padding: `${vars.space[1]} ${vars.space[3]}`,
	fontSize: vars.font.size.xs,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.textMuted,
	textTransform: "uppercase",
	letterSpacing: vars.font.letterSpacing.wide
});
const selectSeparator = style({
	height: "1px",
	backgroundColor: vars.color.border,
	margin: `${vars.space[1]} 0`
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
	flexShrink: 0
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
		children: /* @__PURE__ */ jsx("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("path", {
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
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", {
			d: "M2.5 7.5L6 4L9.5 7.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	})
}));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: [selectScrollButton, className].filter(Boolean).join(" "),
	...props,
	children: /* @__PURE__ */ jsx("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", {
			d: "M2.5 4.5L6 8L9.5 4.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	})
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
	children: [/* @__PURE__ */ jsx(SelectItemIndicator, {}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = "SelectItem";
const SelectItemIndicator = () => /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, {
	className: selectItemIndicator,
	children: /* @__PURE__ */ jsx("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", {
			d: "M2 6L5 9L10 3",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	})
});
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: [selectSeparator, className].filter(Boolean).join(" "),
	...props
}));
SelectSeparator.displayName = "SelectSeparator";

//#endregion
//#region src/components/DropdownMenu/DropdownMenu.css.ts
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
const dropdownContent = style({
	minWidth: "180px",
	backgroundColor: vars.color.surface,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	boxShadow: vars.shadow.lg,
	padding: vars.space[1],
	zIndex: vars.zIndex.dropdown,
	animationDuration: vars.motion.duration.normal,
	animationTimingFunction: vars.motion.easing.default,
	selectors: {
		"&[data-side=\"top\"]": { animationName: slideUpAndFade },
		"&[data-side=\"bottom\"]": { animationName: slideDownAndFade },
		"&[data-side=\"left\"]": { animationName: slideLeftAndFade },
		"&[data-side=\"right\"]": { animationName: slideRightAndFade }
	}
});
const dropdownItem = style({
	display: "flex",
	alignItems: "center",
	gap: vars.space[2],
	padding: `${vars.space[2]} ${vars.space[3]}`,
	borderRadius: vars.radii.sm,
	fontSize: vars.font.size.sm,
	color: vars.color.text,
	cursor: "default",
	userSelect: "none",
	outline: "none",
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-highlighted]": {
			backgroundColor: vars.color.ghostHover,
			color: vars.color.primary
		},
		"&[data-disabled]": {
			opacity: .5,
			pointerEvents: "none"
		}
	}
});
const dropdownDestructiveItem = style([dropdownItem, { selectors: { "&[data-highlighted]": {
	backgroundColor: vars.color.ghostHover,
	color: vars.color.destructive
} } }]);
const dropdownLabel = style({
	padding: `${vars.space[1]} ${vars.space[3]}`,
	fontSize: vars.font.size.xs,
	fontWeight: vars.font.weight.semibold,
	color: vars.color.textMuted,
	textTransform: "uppercase",
	letterSpacing: vars.font.letterSpacing.wide
});
const dropdownSeparator = style({
	height: "1px",
	backgroundColor: vars.color.border,
	margin: `${vars.space[1]} 0`
});
const dropdownItemIndicator = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: vars.space[4],
	flexShrink: 0,
	color: vars.color.primary
});
const dropdownCheckboxItem = style([dropdownItem, {
	paddingLeft: vars.space[8],
	position: "relative"
}]);
const dropdownRadioItem = style([dropdownCheckboxItem]);
const dropdownSubTrigger = style([dropdownItem, { selectors: { "&[data-state=\"open\"]": {
	backgroundColor: vars.color.ghostHover,
	color: vars.color.primary
} } }]);
const dropdownSubContent = style([dropdownContent]);
const dropdownShortcut = style({
	marginLeft: "auto",
	fontSize: vars.font.size.xs,
	color: vars.color.textMuted,
	letterSpacing: vars.font.letterSpacing.wide
});

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
	children: [children, /* @__PURE__ */ jsx("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": true,
		style: { marginLeft: "auto" },
		children: /* @__PURE__ */ jsx("path", {
			d: "M4.5 2.5L8 6L4.5 9.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
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
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
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
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("path", {
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
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: [dropdownRadioItem, className].filter(Boolean).join(" "),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: dropdownItemIndicator,
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx("svg", {
			width: "8",
			height: "8",
			viewBox: "0 0 8 8",
			fill: "currentColor",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("circle", {
				cx: "4",
				cy: "4",
				r: "4"
			})
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
	backgroundColor: vars.color.surface,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radii.md,
	boxShadow: vars.shadow.lg,
	padding: vars.space[4],
	zIndex: vars.zIndex.dropdown,
	maxWidth: "320px",
	width: "var(--radix-popover-trigger-width, auto)",
	animationName: fadeIn$1,
	animationDuration: vars.motion.duration.normal,
	animationTimingFunction: vars.motion.easing.default,
	outline: "none"
});
const popoverArrow = style({
	fill: vars.color.surface,
	filter: `drop-shadow(0 1px 0 ${vars.color.border})`
});
const popoverClose = style({
	position: "absolute",
	top: vars.space[2],
	right: vars.space[2],
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
			outline: `2px solid ${vars.color.primary}`,
			outlineOffset: "1px"
		}
	}
});

//#endregion
//#region src/components/Popover/Popover.tsx
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 6, showArrow = false, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxs(PopoverPrimitive.Content, {
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
	children: children ?? /* @__PURE__ */ jsx("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 15 15",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", {
			d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
			fill: "currentColor"
		})
	})
}));
PopoverClose.displayName = "PopoverClose";

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
	padding: vars.space[6],
	maxWidth: "420px",
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
		gap: `${vars.space[2]} ${vars.space[3]}`,
		padding: vars.space[4],
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
const toastIcon = style({
	gridRow: "1 / -1",
	marginTop: "1px"
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
	children: /* @__PURE__ */ jsx("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 15 15",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", {
			d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
			fill: "currentColor"
		})
	})
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
//#region src/components/Table/Table.css.ts
const tableWrapper = style({
	position: "relative",
	width: "100%",
	overflowX: "auto",
	borderRadius: vars.radii.md,
	border: `1px solid ${vars.color.border}`
});
const table = style({
	width: "100%",
	borderCollapse: "collapse",
	captionSide: "bottom",
	fontSize: vars.font.size.sm,
	color: vars.color.text
});
const tableCaption = style({
	marginTop: vars.space[3],
	fontSize: vars.font.size.sm,
	color: vars.color.textMuted,
	textAlign: "center"
});
const tableHeader = style({ borderBottom: `1px solid ${vars.color.border}` });
const tableBody = style({ selectors: { "& tr:last-child": { borderBottom: "none" } } });
const tableFooter = style({
	borderTop: `1px solid ${vars.color.border}`,
	backgroundColor: `color-mix(in srgb, ${vars.color.surface} 50%, transparent)`,
	fontWeight: vars.font.weight.medium,
	selectors: { "& tr:last-child": { borderBottom: "none" } }
});
const tableRow = style({
	borderBottom: `1px solid ${vars.color.border}`,
	transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
	selectors: {
		"&[data-state=\"selected\"]": { backgroundColor: vars.color.ghostHover },
		"&:hover": { backgroundColor: vars.color.ghostHover }
	}
});
const tableHead = style({
	padding: `${vars.space[3]} ${vars.space[4]}`,
	textAlign: "left",
	verticalAlign: "middle",
	fontWeight: vars.font.weight.semibold,
	color: vars.color.textMuted,
	fontSize: vars.font.size.xs,
	textTransform: "uppercase",
	letterSpacing: vars.font.letterSpacing.wide,
	whiteSpace: "nowrap",
	selectors: {
		"&:has([role=checkbox])": { paddingRight: 0 },
		"&[data-align=\"right\"]": { textAlign: "right" },
		"&[data-align=\"center\"]": { textAlign: "center" }
	}
});
const tableCell = style({
	padding: `${vars.space[3]} ${vars.space[4]}`,
	verticalAlign: "middle",
	selectors: {
		"&:has([role=checkbox])": { paddingRight: 0 },
		"&[data-align=\"right\"]": { textAlign: "right" },
		"&[data-align=\"center\"]": { textAlign: "center" }
	}
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
	className: [table, className].filter(Boolean).join(" "),
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
export { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, FieldMessage, Input, Label, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableWrapper, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
//# sourceMappingURL=index.mjs.map