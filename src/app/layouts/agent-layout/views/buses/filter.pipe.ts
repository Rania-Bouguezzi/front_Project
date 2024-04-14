import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Mettez ici la logique de filtrage en fonction de vos besoins
      return (
        item.marque.toLowerCase().includes(searchText) ||
        item.puissance.toLowerCase().includes(searchText) ||
        item.nbrePlaces.toString().includes(searchText) ||
        item.status.toLowerCase().includes(searchText)
      );
    });
  }
}
