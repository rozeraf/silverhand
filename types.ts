import React from 'react';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}