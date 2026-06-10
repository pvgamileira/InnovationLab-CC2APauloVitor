## Architecture

- **Page**: `app/dashboard/page.jsx`
- **Scope**: Rebuilding the DOM tree for the Insignias `<Link>` container.

## DOM Structure Replacement

The entire block starting from `<Link href="/dashboard/perfil">` up to `</Link>` will be swapped out with this robust structure:

```jsx
<Link href="/dashboard/perfil" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer">
  <span className="text-xs font-bold text-gray-400 hidden xl:inline-block tracking-wider">INSÍGNIAS</span>
  <div className="flex items-center gap-2">
    <div className="bg-purple-500/20 p-1.5 rounded-full flex-shrink-0">
      <Moon className="w-4 h-4 text-purple-400" />
    </div>
    <div className="bg-emerald-500/20 p-1.5 rounded-full flex-shrink-0">
      <Target className="w-4 h-4 text-emerald-400" />
    </div>
    <div className="bg-orange-500/20 p-1.5 rounded-full flex-shrink-0">
      <Flame className="w-4 h-4 text-orange-400" />
    </div>
  </div>
</Link>
```

### Key Differences
1. **Removed Relative Overlaps**: We drop the complex `-ml-3`, `z-index`, and absolute positioning hacks.
2. **Padding over Fixed Sizes**: The icons now sit in a container dictated by `p-1.5`, allowing the inner SVG's `w-4 h-4` to enforce the perfect circle seamlessly.
3. **Responsive Hide**: The text label is hidden below `xl` screens to ensure the flex parent doesn't squish the icons on smaller laptops or tablets.
4. **Link Level Shrink Protection**: `flex-shrink-0` added to the `<Link>` itself.

## Constraints

- Pure JS/JSX. NO TypeScript.
- Ensure `Moon`, `Target`, and `Flame` are imported from `lucide-react`.
- Do not alter the surrounding header elements or `useUserContext` dependencies.
