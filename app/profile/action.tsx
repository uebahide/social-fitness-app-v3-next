'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function updateImage(prevState: any, formData: FormData) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/user/image/update`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch (e) {
    throw new Error(`Network error while logout : ${String(e)}`);
  }

  console.log(res);

  revalidatePath('/profile', 'layout');
  redirect('/profile');
}
