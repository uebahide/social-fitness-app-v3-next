'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createActivity(prevState: any, formData: FormData) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  let res: Response;

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
    const resJson = await res.json();
    return {
      errors: resJson.errors,
      message: resJson.message,
      data: {},
      ok: false,
    };
  }

  revalidatePath('/activity', 'layout');

  return {
    errors: {},
    message: 'New activity was created successfully',
    data: {},
    ok: true,
  };
}

export async function deleteActivity(prevState: any, formData: FormData) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/activities/${formData.get('id')}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(`Network error while logout : ${String(e)}`);
  }

  if (!res.ok) {
    const resJson = await res.json();
    return {
      errors: resJson.errors,
      message: resJson.message,
      data: {},
    };
  }

  revalidatePath('/activity', 'layout');

  return {
    errors: {},
    message: 'Activity was deleted successfully',
    data: {},
    ok: true,
  };
}
