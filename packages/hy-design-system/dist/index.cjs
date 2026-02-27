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
let _radix_ui_react_slot = require("@radix-ui/react-slot");
let _vanilla_extract_recipes = require("@vanilla-extract/recipes");
let _vanilla_extract_css = require("@vanilla-extract/css");
let _hydrotik_tokens = require("@hydrotik/tokens");
let react_jsx_runtime = require("react/jsx-runtime");
let _radix_ui_react_label = require("@radix-ui/react-label");
_radix_ui_react_label = __toESM(_radix_ui_react_label);
let _radix_ui_react_separator = require("@radix-ui/react-separator");
_radix_ui_react_separator = __toESM(_radix_ui_react_separator);
let _radix_ui_react_tabs = require("@radix-ui/react-tabs");
_radix_ui_react_tabs = __toESM(_radix_ui_react_tabs);
let _radix_ui_react_dialog = require("@radix-ui/react-dialog");
_radix_ui_react_dialog = __toESM(_radix_ui_react_dialog);
let _radix_ui_react_select = require("@radix-ui/react-select");
_radix_ui_react_select = __toESM(_radix_ui_react_select);
let _radix_ui_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
_radix_ui_react_dropdown_menu = __toESM(_radix_ui_react_dropdown_menu);
let _radix_ui_react_popover = require("@radix-ui/react-popover");
_radix_ui_react_popover = __toESM(_radix_ui_react_popover);
let _radix_ui_react_tooltip = require("@radix-ui/react-tooltip");
_radix_ui_react_tooltip = __toESM(_radix_ui_react_tooltip);
let _radix_ui_react_toast = require("@radix-ui/react-toast");
_radix_ui_react_toast = __toESM(_radix_ui_react_toast);

//#region src/components/Button/Button.css.ts
const spin = (0, _vanilla_extract_css.keyframes)({ to: { transform: "rotate(360deg)" } });
const spinner = (0, _vanilla_extract_css.style)({
	display: "inline-block",
	width: "1em",
	height: "1em",
	border: `2px solid currentColor`,
	borderTopColor: "transparent",
	borderRadius: _hydrotik_tokens.vars.radii.full,
	animation: `${spin} 0.6s linear infinite`,
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
//#region src/components/Dialog/Dialog.css.ts
const overlayShow = (0, _vanilla_extract_css.keyframes)({
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
	animation: `${overlayShow} ${_hydrotik_tokens.vars.motion.duration.normal} ${_hydrotik_tokens.vars.motion.easing.default}`,
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
//#region src/components/Select/Select.css.ts
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
		"&[data-state=\"open\"][data-side=\"bottom\"]": { animationName: slideDownAndFade$1 },
		"&[data-state=\"open\"][data-side=\"top\"]": { animationName: slideUpAndFade$1 }
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
//#region src/components/DropdownMenu/DropdownMenu.css.ts
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
		"&[data-side=\"top\"]": { animationName: slideUpAndFade },
		"&[data-side=\"bottom\"]": { animationName: slideDownAndFade },
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
const tableBody = (0, _vanilla_extract_css.style)({ selectors: { "& tr:last-child": { borderBottom: "none" } } });
const tableFooter = (0, _vanilla_extract_css.style)({
	borderTop: `1px solid ${_hydrotik_tokens.vars.color.border}`,
	backgroundColor: `color-mix(in srgb, ${_hydrotik_tokens.vars.color.surface} 50%, transparent)`,
	fontWeight: _hydrotik_tokens.vars.font.weight.medium,
	selectors: { "& tr:last-child": { borderBottom: "none" } }
});
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
exports.Badge = Badge;
exports.Button = Button;
exports.Card = Card;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
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
exports.Input = Input;
exports.Label = Label;
exports.Popover = Popover;
exports.PopoverAnchor = PopoverAnchor;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
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
exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
//# sourceMappingURL=index.cjs.map