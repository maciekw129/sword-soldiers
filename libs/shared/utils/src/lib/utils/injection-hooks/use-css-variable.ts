import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export function useCssVariable(name: string): string | undefined {
  const document = inject(DOCUMENT);

  return document.body.computedStyleMap().get(name)?.toString();
}
