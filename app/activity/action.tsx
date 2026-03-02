'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import z from 'zod';

const activitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export async function createActivity(prevState: any, formData: FormData) {
  console.log('Create activity server action start');
  const title = String(formData.get('title') ?? '');
  const description = String(formData.get('description') ?? '');
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  let res: Response;

  const validatedFields = activitySchema.safeParse({ title, description });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
      data: { title, description },
      ok: false,
    };
  }

  try {
    res = await fetch(`${process.env.API_URL}/api/activities`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch (e) {
    throw new Error(`Network error while logout : ${String(e)}`);
  }

  if (!res.ok) {
    throw new Error(`error : ${res.status}`);
  }

  revalidatePath('/activity', 'layout');

  return {
    errors: {},
    message: 'New activity was created successfully',
    data: {},
    ok: true,
  };
}
