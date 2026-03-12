'use server';

import { cookies } from 'next/headers';

export async function sendMessage(prevState: any, formData: FormData) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  const body = formData.get('message') as string;
  const roomId = formData.get('roomId') as string;

  console.log(body, roomId);

  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}/api/rooms/${roomId}/messages`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({ body, roomId }),
    });
  } catch (e) {
    throw new Error(`Network error while sending message : ${String(e)}`);
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

  return {
    errors: {},
    message: 'Message was sent successfully',
    data: {},
    ok: true,
  };
}
