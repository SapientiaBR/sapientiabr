
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
				heading: ['Sora', 'system-ui', 'sans-serif'],
				display: ['Sora', 'system-ui', 'sans-serif'],
				body: ['DM Sans', 'system-ui', 'sans-serif'],
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
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
					purple: 'var(--purple-400)',
					blue: 'var(--cyan-400)',
					dark: 'var(--bg-primary)',
					secondary: 'var(--bg-secondary)',
					deep: 'var(--bg-deep)',
					surface: 'var(--bg-surface)',
					card: 'var(--bg-card)',
					elevated: 'var(--bg-elevated)'
				},
				purple: {
					50: 'var(--purple-50)',
					100: 'var(--purple-100)',
					200: 'var(--purple-200)',
					300: 'var(--purple-300)',
					400: 'var(--purple-400)',
					500: 'var(--purple-500)',
					600: 'var(--purple-600)',
					700: 'var(--purple-700)',
					800: 'var(--purple-800)',
					900: 'var(--purple-900)'
				},
				cyan: {
					50: 'var(--cyan-50)',
					100: 'var(--cyan-100)',
					200: 'var(--cyan-200)',
					300: 'var(--cyan-300)',
					400: 'var(--cyan-400)',
					500: 'var(--cyan-500)',
					600: 'var(--cyan-600)',
					700: 'var(--cyan-700)',
					800: 'var(--cyan-800)',
					900: 'var(--cyan-900)'
				},
				brand: {
					coral: 'var(--accent-coral)',
					rose: 'var(--accent-rose)',
					pink: 'var(--accent-pink)',
					amber: 'var(--accent-amber)',
					lime: 'var(--accent-lime)',
					emerald: 'var(--accent-emerald)',
					sky: 'var(--accent-sky)',
					indigo: 'var(--accent-indigo)'
				},
				ink: {
					primary: 'var(--text-primary)',
					secondary: 'var(--text-secondary)',
					muted: 'var(--text-muted)',
					hint: 'var(--text-hint)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
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
				'hero-radial': 'var(--gradient-radial-hero)',
				'card-purple': 'var(--gradient-card-purple)',
				'card-cyan': 'var(--gradient-card-cyan)'
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
					background: 'var(--gradient-text)',
					'-webkit-background-clip': 'text',
					'background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'color': 'transparent'
				},
				'.bg-gradient-sapient': {
					background: 'var(--gradient-brand)'
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
