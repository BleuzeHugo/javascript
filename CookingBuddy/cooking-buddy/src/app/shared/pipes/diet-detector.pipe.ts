import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dietDetector',
  standalone: true
})
export class DietDetectorPipe implements PipeTransform {
  transform(ingredients: string[]): string {
    if (!ingredients || ingredients.length === 0) return 'Classic';
    const lower = ingredients.map(i => i.toLowerCase());
    const meat = ['chicken', 'beef', 'pork', 'lamb', 'fish', 'shrimp', 'bacon', 'duck', 'veal', 'turkey', 'ham', 'sausage', 'anchovy', 'salmon', 'tuna', 'crab', 'lobster', 'octopus', 'clam', 'mussels'];
    const dairy = ['egg', 'milk', 'cheese', 'butter', 'cream', 'yogurt', 'honey'];
    const hasMeat = lower.some(ing => meat.some(m => ing.includes(m)));
    const hasDairy = lower.some(ing => dairy.some(d => ing.includes(d)));
    if (!hasMeat && !hasDairy) return 'Vegan';
    if (!hasMeat && hasDairy) return 'Vegetarian';
    return 'Classic';
  }
}
