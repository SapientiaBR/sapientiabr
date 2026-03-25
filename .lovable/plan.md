

## Plan: Move title inside icon container in Services section

Same pattern as Pain Points — merge the icon and title into a single gradient banner.

### Change: `src/components/ServicesSection.tsx` (lines 78-81)

Replace the separate icon div and h3 with a single flex container:

```tsx
// Before:
<div className={`p-4 rounded-full bg-gradient-to-br ${service.color} inline-block mb-4`}>
  {service.icon}
</div>
<h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>

// After:
<div className={`mb-4 bg-gradient-to-br ${service.color} flex items-center gap-3 p-3 rounded-lg`}>
  {service.icon}
  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
</div>
```

One file, 4 lines changed.

