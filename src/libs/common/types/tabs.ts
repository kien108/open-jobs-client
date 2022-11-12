import React from 'react';

export interface TabsNavContentType {
  id: number;
  title: string;
  icon?: React.ReactNode;
  path: string;
  disable?: boolean;
}

export interface TabsCommonContentType {
  id: number;
  title: string;
  icon?: React.ReactNode;
  disable?: boolean;
}
