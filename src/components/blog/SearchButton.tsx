'use client';

import React from 'react';
import { SearchDialog } from './SearchDialog';

export function SearchButton() {
  return (
    <SearchDialog
      onSearch={() => {}}
      onTagSelect={() => {}}
      selectedTag={null}
    />
  );
}
