'use client';

import { Input } from '@/components/form/Input';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { FriendList } from './FriendList';

export default function FriendPage() {
  return (
    <div className="grid grid-cols-[3fr_7fr] gap-4">
      <FriendList />
      <article>
        <div>Image</div>
        <div>Name</div>
      </article>
    </div>
  );
}
