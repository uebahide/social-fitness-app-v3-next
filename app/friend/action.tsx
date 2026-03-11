'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function sendFriendRequest(prevState: any, formData: FormData) {
  const friendId = formData.get('friendId');
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!friendId || !token) {
    return {
      message: '',
      error: 'Friend ID and token are required',
      ok: false,
      data: {},
    };
  }

  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/friend-requests/send/${friendId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(`Network error while logout : ${String(e)}`);
  }

  if (!res.ok) {
    const resJson = await res.json();
    throw new Error(`Failed to send friend request : ${resJson.message}`);
  }

  return {
    message: 'Friend request sent successfully',
    error: '',
    ok: true,
    data: {},
  };
}

export async function acceptFriendRequest(prevState: any, formData: FormData) {
  const requestId = formData.get('request_id');
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!requestId || !token) {
    return {
      message: '',
      error: 'Request ID and token are required',
      ok: false,
      data: {},
    };
  }

  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/friend-requests/${requestId as string}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(`Network error while accept friend request : ${String(e)}`);
  }

  if (!res.ok) {
    const resJson = await res.json();
    throw new Error(`Failed to accept friend request : ${resJson.message}`);
  }

  return {
    message: 'Friend request accepted successfully',
    error: '',
    ok: true,
    data: {},
  };
}

export async function rejectFriendRequest(prevState: any, formData: FormData) {
  const requestId = formData.get('request_id');
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!requestId || !token) {
    return {
      message: '',
      error: 'Request ID and token are required',
      ok: false,
      data: {},
    };
  }

  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/friend-requests/${requestId as string}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(`Network error while reject friend request : ${String(e)}`);
  }

  if (!res.ok) {
    const resJson = await res.json();
    throw new Error(`Failed to reject friend request : ${resJson.message}`);
  }

  return {
    message: 'Friend request rejected successfully',
    error: '',
    ok: true,
    data: {},
  };
}
