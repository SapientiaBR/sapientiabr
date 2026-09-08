
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				heading: ['Switzer', 'system-ui', 'sans-serif'],
				display: ['Switzer', 'system-ui', 'sans-serif'],
				body: ['Switzer', 'system-ui', 'sans-serif'],
				sans: ['Switzer', 'system-ui', 'sans-serif'],
				label: ['Switzer', 'system-ui', 'sans-serif'],
				mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				/**
				 * Brand Guide v2. Os componentes existentes usam sapient-purple /
				 * sapient-blue / sapient-dark; os nomes continuam, os valores agora
				 * saem do guide. Isso permite migrar seção por seção sem quebrar tudo.
				 */
				sapient: {
					purple: 'rgb(var(--purple-400-rgb) / <alpha-value>)',
					blue: 'rgb(var(--cyan-400-rgb) / <alpha-value>)',
					dark: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
					secondary: 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
					deep: 'rgb(var(--bg-deep-rgb) / <alpha-value>)',
					surface: 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
					card: 'rgb(var(--bg-card-rgb) / <alpha-value>)',
					elevated: 'rgb(var(--bg-elevated-rgb) / <alpha-value>)'
				},
				purple: {
					50: 'rgb(var(--purple-50-rgb) / <alpha-value>)',
					100: 'rgb(var(--purple-100-rgb) / <alpha-value>)',
					200: 'rgb(var(--purple-200-rgb) / <alpha-value>)',
					300: 'rgb(var(--purple-300-rgb) / <alpha-value>)',
					400: 'rgb(var(--purple-400-rgb) / <alpha-value>)',
					500: 'rgb(var(--purple-500-rgb) / <alpha-value>)',
					600: 'rgb(var(--purple-600-rgb) / <alpha-value>)',
					700: 'rgb(var(--purple-700-rgb) / <alpha-value>)',
					800: 'rgb(var(--purple-800-rgb) / <alpha-value>)',
					900: 'rgb(var(--purple-900-rgb) / <alpha-value>)'
				},
				cyan: {
					50: 'rgb(var(--cyan-50-rgb) / <alpha-value>)',
					100: 'rgb(var(--cyan-100-rgb) / <alpha-value>)',
					200: 'rgb(var(--cyan-200-rgb) / <alpha-value>)',
					300: 'rgb(var(--cyan-300-rgb) / <alpha-value>)',
					400: 'rgb(var(--cyan-400-rgb) / <alpha-value>)',
					500: 'rgb(var(--cyan-500-rgb) / <alpha-value>)',
					600: 'rgb(var(--cyan-600-rgb) / <alpha-value>)',
					700: 'rgb(var(--cyan-700-rgb) / <alpha-value>)',
					800: 'rgb(var(--cyan-800-rgb) / <alpha-value>)',
					900: 'rgb(var(--cyan-900-rgb) / <alpha-value>)'
				},
				brand: {
					coral: 'rgb(var(--accent-coral-rgb) / <alpha-value>)',
					rose: 'rgb(var(--accent-rose-rgb) / <alpha-value>)',
					pink: 'rgb(var(--accent-pink-rgb) / <alpha-value>)',
					amber: 'rgb(var(--accent-amber-rgb) / <alpha-value>)',
					lime: 'rgb(var(--accent-lime-rgb) / <alpha-value>)',
					emerald: 'rgb(var(--accent-emerald-rgb) / <alpha-value>)',
					sky: 'rgb(var(--accent-sky-rgb) / <alpha-value>)',
					indigo: 'rgb(var(--accent-indigo-rgb) / <alpha-value>)'
				},
				/**
				 * Texto e tudo que herda o contraste do tema.
				 *
				 * `ink-primary` ocupa o lugar que `text-white` tinha: no escuro e
				 * quase branco, no claro e quase preto. Como esta em canais, serve
				 * tambem para os filetes e veus (`border-ink-primary/10`,
				 * `bg-ink-primary/5`), que antes eram branco fixo e sumiam no claro.
				 *
				 * `on-brand` e o oposto: branco nos dois temas. E a cor do texto por
				 * cima do gradiente da marca, que nao muda de fundo quando o tema vira.
				 */
				ink: {
					primary: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
					secondary: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
					muted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
					hint: 'rgb(var(--text-hint-rgb) / <alpha-value>)',
					'on-brand': '#ffffff'
				}
			},
			borderRadius: {
				lg: 'rgb(var(--radius-rgb) / <alpha-value>)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'rgb(var(--radix-accordion-content-height-rgb) / <alpha-value>)'
					}
				},
				'accordion-up': {
					from: {
						height: 'rgb(var(--radix-accordion-content-height-rgb) / <alpha-value>)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'spotlight': {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%, -40%) scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'spotlight': 'spotlight 2s ease .75s 1 forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-radial': 'rgb(var(--gradient-radial-hero-rgb) / <alpha-value>)',
				'card-purple': 'rgb(var(--gradient-card-purple-rgb) / <alpha-value>)',
				'card-cyan': 'rgb(var(--gradient-card-cyan-rgb) / <alpha-value>)'
			},
			textColor: {
				'gradient-sapient': 'linear-gradient(90deg, #9b87f5 0%, #33C3F0 100%)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.text-gradient-sapient': {
					background: 'rgb(var(--gradient-text-rgb) / <alpha-value>)',
					'-webkit-background-clip': 'text',
					'background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'color': 'transparent'
				},
				'.bg-gradient-sapient': {
					background: 'rgb(var(--gradient-brand-rgb) / <alpha-value>)'
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
