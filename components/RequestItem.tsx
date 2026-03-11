import { CheckIcon, XIcon } from 'lucide-react';
import { SubmitButton } from './buttons/SubmitButton';
import { Avatar } from './Avatar';
import { User } from '@/types/api/user';
import { useUser } from '@/contexts/UserProvider';
import { useActionState } from 'react';
import { acceptFriendRequest, rejectFriendRequest } from '@/app/friend/action';

export const RequestItem = ({ requestSender }: { requestSender: User }) => {
  const { user: currentUser } = useUser();
  const request = requestSender.friend_requests_sent.find(
    (request) =>
      request.status === 'pending' &&
      request.sender_id === requestSender.id &&
      request.receiver_id === currentUser?.id,
  );

  return (
    <li className="flex cursor-pointer items-center justify-between gap-5 rounded-sm p-2 hover:bg-gray-50">
      <div className="flex items-center gap-5">
        <Avatar size="small" user={requestSender} />
        <div>{requestSender.name}</div>
      </div>
      <RequestItemButton requestId={request?.id.toString() ?? ''} />
    </li>
  );
};

const initialState = {
  message: '',
  error: '',
  ok: false,
  data: {},
};

export const RequestItemButton = ({ requestId }: { requestId: string }) => {
  const [acceptState, acceptAction] = useActionState(acceptFriendRequest, initialState);
  const [rejectState, rejectAction] = useActionState(rejectFriendRequest, initialState);

  const isAlreadyResponded = acceptState.ok || rejectState.ok;

  if (isAlreadyResponded) {
    return <div className="text-xs text-gray-500">Responded</div>;
  }
  return (
    <div className="flex items-center gap-2">
      {/* accept request form */}
      <form action={acceptAction}>
        <input type="hidden" name="request_id" id="request_id" value={requestId} />
        <SubmitButton className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
          <CheckIcon />
        </SubmitButton>
        {acceptState.message && <div className="text-xs text-gray-500">{acceptState.message}</div>}
        {acceptState.error && <div className="text-xs text-red-500">{acceptState.error}</div>}
        {acceptState.ok && <div className="text-xs text-green-500">{acceptState.message}</div>}
      </form>
      {/* reject request form */}
      <form action={rejectAction}>
        <input type="hidden" name="request_id" id="request_id" value={requestId} />
        <SubmitButton className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
          <XIcon />
        </SubmitButton>
      </form>
    </div>
  );
};
