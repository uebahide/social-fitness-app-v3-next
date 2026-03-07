'use client';

import { ActivityType } from '@/types/api/activity';
import { Avatar } from './Avatar';
import { getTimeOfDay, getUnit, uppercaseFirstLetter } from '@/lib/utils';
import { CategoryIcon } from './CategoryIcon';
import { DropdownMenuBasic, DropdownMenuItem } from './DropdownMenuBasic';
import { Pencil, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { DeleteActivityDialogForm } from './DeleteActivityDialogForm';

export default function ActivityCard({ activity }: { activity: ActivityType }) {
  const created_user = activity.user;
  const details = activity.details;
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <article className="bg-card relative rounded-lg border border-gray-300 p-7 shadow-sm hover:shadow-md">
      {/*  menu button (delete, edit) */}
      <div className="absolute top-3 right-7">
        <DropdownMenuBasic buttonText="...">
          <DropdownMenuItem className="space-x-1">
            <Pencil className="h-4 w-4" />
            <p>Edit</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="space-x-1"
            onSelect={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setDeleteOpen(true);
            }}
          >
            <div className="flex flex-row items-center gap-1">
              <Trash2Icon className="h-4 w-4" />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuBasic>
      </div>

      <DeleteActivityDialogForm
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        activityId={activity.id}
      />

      <main className="r mb-10 grid grid-cols-[50px_auto] grid-rows-[1fr_auto] space-y-4 gap-x-6">
        <span className="flex justify-center">
          <Avatar user={created_user} size="xsmall" />
        </span>
        <header>
          <p className="text-sm font-medium">{created_user.name}</p>
          <p className="text-xs text-gray-400">{activity.created_at}</p>
        </header>
        <span className="flex justify-center">
          <CategoryIcon category={activity.category} />
        </span>

        <section className="space-y-2">
          <h2 className="text-2xl font-medium">
            {activity.title
              ? activity.title
              : getTimeOfDay(activity.created_at) + ' ' + uppercaseFirstLetter(activity.category)}
          </h2>
          <ul className="flex gap-2">
            {details &&
              Object.entries(details).map(([key, value]) => (
                <li
                  className="flex flex-col border-r border-gray-100 px-3 first:pl-0 last:border-r-0"
                  key={key}
                >
                  <span className="text-sm text-gray-500">{uppercaseFirstLetter(key)}</span>
                  <p className="flex items-end gap-1 text-xl font-medium">
                    {value !== null ? (
                      <>
                        <span>{value.toString()}</span>
                        <span className="text-sm text-gray-500">
                          {getUnit(key as 'duration' | 'distance')}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg text-gray-400">—</span>
                    )}
                  </p>
                </li>
              ))}
          </ul>
        </section>
      </main>
      <hr />
      <footer className="mt-5 flex flex-col gap-2">
        <span className="text-sm text-gray-500">Description</span>
        <span className="">{activity.description}</span>
      </footer>
    </article>
  );
}
