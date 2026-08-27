import { Plus } from "lucide-react";

interface CategoriesGridProps {
  categories: string[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="prod-categories-grid">
      {categories.map((category) => (
        <div key={category} className="prod-category-card">
          <span className="prod-category-card__name">{category}</span>
        </div>
      ))}

      <button
        type="button"
        id="prod-add-category-card-btn"
        className="prod-add-category-card"
        aria-label="Add new category"
        disabled
      >
        <Plus size={18} strokeWidth={2} className="prod-add-category-card__icon" />
        <span className="prod-add-category-card__text">Add category</span>
      </button>
    </div>
  );
}
