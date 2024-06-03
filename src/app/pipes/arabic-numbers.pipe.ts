import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicNumbers',
  standalone: true,
})
export class ArabicNumbersPipe implements PipeTransform {
  transform(value: number | string | null, ...args: unknown[]): string | null {
    if (value) {
      value = String(value);

      var id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return value.replace(/[0-9]/g, function (w: any) {
        return id[+w];
      });
    }

    return null;
  }
}
